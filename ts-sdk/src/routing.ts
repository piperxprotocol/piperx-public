import { readContract, getBalance, getBlock, writeContract, multicall } from '@wagmi/core'
import { v2_factory_abi, v2_router_abi} from './abi.js'
import { wagmi_config, v2RouterAddress, v2FactoryAddress, defaultTokens } from './constant.js'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'

export const v2RoutingExactInput = async(
    tokenIn: string, 
    tokenOut: string, 
    tokenInAmount: bigint
) => {    
    let bestRoute: string[] = []
    let maxAmountOut = BigInt(0)

    // Direct route
    try {
        const directResult = await readContract(wagmi_config, {
            address: v2RouterAddress,
            abi: v2_router_abi,
            functionName: 'getAmountsOut',
            args: [tokenInAmount, [tokenIn as `0x${string}`, tokenOut as `0x${string}`]]
        })
        maxAmountOut = directResult[1]
        bestRoute = [tokenIn, tokenOut]
    } catch (error) {
        console.error("Error in direct route calculation:", error);
        // If the pool doesn't exist, set directResult to an array with max uint256 value
    }   
   

    let contracts = <any>[]
    // Check routes with one intermediate token
    for (const intermediateToken of defaultTokens) {
        if (intermediateToken !== tokenIn && intermediateToken !== tokenOut) {
            contracts.push({
                address: v2RouterAddress,
                abi: v2_router_abi,
                functionName: 'getAmountsOut',
                args: [tokenInAmount, [tokenIn as `0x${string}`, intermediateToken as `0x${string}`, tokenOut as `0x${string}`]]
            })
        }
    }
    const results = await multicall(wagmi_config, {contracts})
    for (let i = 0; i < results.length; i++) {
        if (results[i].status === "success" && results[i].result) {
            const amountOut = results[i].result as bigint[]
            if (amountOut[amountOut.length - 1] > maxAmountOut) {
                maxAmountOut = amountOut[amountOut.length - 1]
                bestRoute = [tokenIn, defaultTokens[i], tokenOut]
            }
        }
    }
    return { bestRoute, maxAmountOut }

}

export const v2ComputeAddress = (token0: string, token1: string) => {
    const [token0Sorted, token1Sorted] = token0.toLowerCase() < token1.toLowerCase()
        ? [token0, token1]
        : [token1, token0]

    const salt = keccak256(['bytes'], [pack(['address', 'address'], [token0Sorted, token1Sorted])])
    const initCodeHash = '0x9ac843134bd02f87ccefa1b6ef876991ae932ca19d3e130f9e12e95befc92136' // Uniswap V2 init code hash

    return getCreate2Address(v2FactoryAddress, salt, initCodeHash) as `0x${string}`
}

export const v2RoutingExactOutput = async(
    tokenIn: string, 
    tokenOut: string, 
    tokenOutAmount: bigint
) => {
    let bestRoute: string[] = []
    let minAmountIn = BigInt(2) ** BigInt(256) - BigInt(1) // Max uint256 value

    // Calculate for routes with 0 hop
    // Direct route
    try {
        let directResult = await readContract(wagmi_config, {
            address: v2RouterAddress,
            abi: v2_router_abi,
            functionName: 'getAmountsIn',
            args: [tokenOutAmount, [tokenIn as `0x${string}`, tokenOut as `0x${string}`]]
        });
        minAmountIn = directResult[0]
        bestRoute = [tokenIn, tokenOut]
    } catch (error) {
        console.error("Error in direct route calculation:", error);
        // If the pool doesn't exist, set directResult to an array with max uint256 value
    }

    let contracts = <any>[]
    // Check routes with one intermediate token
    for (const intermediateToken of defaultTokens) {
        if (intermediateToken !== tokenIn && intermediateToken !== tokenOut) {
            contracts.push({
                address: v2RouterAddress,
                abi: v2_router_abi,
                functionName: 'getAmountsIn',
                args: [tokenOutAmount, [tokenIn as `0x${string}`, intermediateToken as `0x${string}`, tokenOut as `0x${string}`]]
            })
        }
    }
    const results = await multicall(wagmi_config, {contracts})
    for (let i = 0; i < results.length; i++) {
        if (results[i].status === "success" && results[i].result) {
            const amountOut = results[i].result as bigint[]
            if (amountOut[amountOut.length - 1] < minAmountIn) {
                minAmountIn = amountOut[0]
                bestRoute = [tokenIn, defaultTokens[i], tokenOut]
            }
        }
    }
    return { bestRoute, minAmountIn }
}
