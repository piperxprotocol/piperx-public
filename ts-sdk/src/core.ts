import { useWriteContract } from 'wagmi'
import { abi, v2_factory_abi, v2_router_abi} from './abi.js'
import { WIP_ADDRESS, v2RouterAddress } from './constant.js'

export const v2Swap = async(
    amount1: bigint,
    amount2Min: bigint,
    path: string[], 
    currentAccountAddress: string,
    expirationTimestamp: bigint
) => {
    const { writeContractAsync: swapWriter } = useWriteContract();

    try {
        let hash = "0x"
        if (path[0] == WIP_ADDRESS) { // swap Exact ETH for tokens
            hash = await swapWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'swapExactETHForTokens',
                args: [amount2Min, path.map(token => token as `0x${string}`), currentAccountAddress as `0x${string}`, expirationTimestamp],
                value: amount1
            })
        } else if (path[path.length - 1] == WIP_ADDRESS) { // swap Exact tokens for ETH
            hash = await swapWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'swapExactTokensForETH',
                args: [amount1, amount2Min, path.map(token => token as `0x${string}`), currentAccountAddress as `0x${string}`, expirationTimestamp]
            })
        } else {
            hash = await swapWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'swapExactTokensForTokens',
                args: [amount1, amount2Min, path.map(token => token as `0x${string}`), currentAccountAddress as `0x${string}`, expirationTimestamp]
            })
        }
    } catch (error) {
        console.error("Error in swap:", error);
    }
}

export const v2AddLiquidity = async(
    token1: string,
    token2: string,
    amount1: bigint,
    amount2: bigint,
    amount1Min: bigint,
    amount2Min: bigint,
    currentAccountAddress: string,
    expirationTimestamp: bigint
) => {
    const { writeContractAsync: addLiquidityWriter } = useWriteContract();

    try {        
        let hash = "0x"
        if (token1 == WIP_ADDRESS) {
            hash = await addLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'addLiquidityETH',
                args: [token2 as `0x${string}`, amount2, amount2Min, amount1Min, currentAccountAddress as `0x${string}`, expirationTimestamp],
                value: amount1
            })
        } else if (token2 == WIP_ADDRESS) {
            hash = await addLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'addLiquidityETH',
                args: [token1 as `0x${string}`, amount1, amount1Min, amount2Min, currentAccountAddress as `0x${string}` , expirationTimestamp],
                value: amount2
            })
        } else {
            hash = await addLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'addLiquidity',
                args: [token1 as `0x${string}`, token2 as `0x${string}`, amount1, amount2, amount1Min, amount2Min, currentAccountAddress as `0x${string}`, expirationTimestamp]
            })
        }
    } catch (error) {
        console.error("Error in addLiquidity:", error);
    }
}

export const v2RemoveLiquidity = async(
    token1: string,
    token2: string,
    liquidity: bigint,
    amount1Min: bigint,
    amount2Min: bigint,
    currentAccountAddress: string,
    expirationTimestamp: bigint
) => {
    const { writeContractAsync: removeLiquidityWriter } = useWriteContract();

    try {
        let hash = "0x"
        if (token1 == WIP_ADDRESS) { //remove liquidity for IP native token
            hash = await removeLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'removeLiquidityETH',
                args: [token2 as `0x${string}`, liquidity, amount2Min, amount1Min, currentAccountAddress as `0x${string}`       , expirationTimestamp]
            })
        } else if (token2 == WIP_ADDRESS) {
            hash = await removeLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'removeLiquidityETH',
                args: [token1 as `0x${string}`, liquidity, amount1Min, amount2Min, currentAccountAddress as `0x${string}`, expirationTimestamp]
            })
        } else {
            hash = await removeLiquidityWriter({
                abi: v2_router_abi,
                address: v2RouterAddress,
                functionName: 'removeLiquidity',
                args: [token1 as `0x${string}`, token2 as `0x${string}`, liquidity, amount1Min, amount2Min, currentAccountAddress as `0x${string}`, expirationTimestamp]
            })
        }
    } catch (error) {
        console.error("Error in removeLiquidity:", error);
    }
}

export const v2RouterTokenApproval = async(
    token: string,
    amount: bigint
) => {
    const { writeContractAsync: approvalWriter } = useWriteContract();
    const hash = await approvalWriter({
        abi: abi,
        address: v2RouterAddress,
        functionName: 'approve',
        args: [token as `0x${string}`, amount]
    })
}

export const swap = async(
    tokenIn: string,
    tokenOut: string,
    amountIn: bigint,
    amountOutMin: bigint,
    currentAccountAddress: string,
    expirationTimestamp: bigint
) => {
    v2Swap(amount1, amount2Min, path, currentAccountAddress, expirationTimestamp)
}