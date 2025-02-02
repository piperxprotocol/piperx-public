// import { readContract, getBalance, getBlock, writeContract, multicall } from '@wagmi/core'
import { v2_factory_abi, v2_router_abi, piperv3Quoter_abi, multicall_abi} from './abi';
import { provider, signer, v2RouterAddress, v2FactoryAddress, defaultTokens, piperv3QuoterAddress } from './constant';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { BigNumber, ethers} from 'ethers';

export const v2Router = new ethers.Contract(
    v2RouterAddress,
    v2_router_abi,
    provider
);


const piperv3QuoterContract = new ethers.Contract(
    piperv3QuoterAddress, 
    piperv3Quoter_abi, 
    signer
);

export const fee2TickSpace = {"500": 10, "3000": 60, "10000": 200}
// export const fee2TickSpace = {"500": 10}
let tokenOutAmount =  ethers.utils.parseUnits("1", 18);

const PIPAddr = "0x6e990040Fd9b06F98eFb62A147201696941680b5";
const wipAddr = '0xe8CabF9d1FFB6CE23cF0a86641849543ec7BD7d5';
const multicallAddress = "0xcA11bde05977b3631167028862bE2a173976CA11"



export const v3RoutingExactOutputSingle = async(
    tokenIn: string, 
    tokenOut: string, 
    tokenOutAmount: bigint
) => {
    const quoteExactOutputSingleParams = {
        tokenIn,
        tokenOut,
        amount: tokenOutAmount,
        fee: 500,
        sqrtPriceLimitX96: BigInt(0)
      }
    let result = await piperv3QuoterContract.callStatic.quoteExactOutputSingle(
        quoteExactOutputSingleParams,
        {gasLimit: 5000000}
    );
    // console.log("result: ", result.amountIn.toString());
    return result.amountIn.toString()
}



// export async function executeMulticall(
//     tokenIn: string, 
//     tokenOut: string, 
//     tokenOutAmount: bigint
// ) {
//     // Create interface for the contract you want to call
//     const quoterInterface = new ethers.utils.Interface(piperv3Quoter_abi);
    
//     // Prepare the calls
//     const calls = Object.keys(fee2TickSpace).map(feeTier => ({
//         target: piperv3QuoterAddress,
//         callData: quoterInterface.encodeFunctionData(
//             'quoteExactOutputSingle',
//             [{
//                 tokenIn: tokenIn,
//                 tokenOut: tokenOut,
//                 amount: tokenOutAmount,
//                 fee: feeTier,
//                 sqrtPriceLimitX96: BigInt(0)
//             }]
//         )
//     }));
//     // console.log("calls: ", calls);

//     // Execute multicall
//     const multicallContract = new ethers.Contract(
//         multicallAddress,  // You'll need to define this
//         multicall_abi,      // You'll need to define this
//         provider
//     );
    
//     const tx  = await multicallContract.connect(signer).aggregate(calls);
//     const receipt = await tx.wait();
//     console.log("receipt: ", receipt);
//     // console.log("blockNumber: ", blockNumber);
//     // const decodedResults = returnData.map((data: string) => 
//     //     quoterInterface.decodeFunctionResult('quoteExactOutputSingle', data)
//     // );

//     // return decodedResults;
// }


// export const v3RoutingExactOutput = async(
//     tokenIn: string, 
//     tokenOut: string, 
//     tokenOutAmount: bigint
// ) => {
//     let bestRoute: string[] = []
//     let minAmountIn = BigInt(2) ** BigInt(256) - BigInt(1) // Max uint256 value
//     let contracts = <any>[];

//     for (const feeTier of Object.keys(fee2TickSpace)) {
//         contracts.push({
//             address: piperv3QuoterAddress,
//             abi: piperv3Quoter_abi,
//             functionName: 'quoteExactOutputSingle',
//             args: [{
//                 tokenIn: tokenIn as `0x${string}`,
//                 tokenOut: tokenOut as `0x${string}`,
//                 amount: tokenOutAmount,
//                 fee: feeTier,
//                 sqrtPriceLimitX96: BigInt(0)
//             }]
//         });
//     }

//     const results = await multicall(wagmi_config, { contracts });

//     for (let i = 0; i < results.length; i++) {
//         const result = results[i];
//         if (result && result.status === "success" && result.result) {
//             logger("test evil v3RoutingExactOutput result", result);
//             const amountIn = result.result[0];
//             if (amountIn < minAmountIn) {
//                 minAmountIn = amountIn;
//                 bestRoute = [tokenIn, tokenOut, Object.keys(fee2TickSpace)[i]];
//             }
//         } else {
//             logger("Warning: Unexpected result structure", result);
//         }
//     }
//     return { bestRoute, minAmountIn }
// }










export const v2RoutingExactInput = async(
    tokenIn: string, 
    tokenOut: string, 
    tokenInAmount: BigNumber
) => {    
    let bestRoute: string[] = []
    let maxAmountOut = BigInt(0)

    let tx = await v2Router.getAmountsOut(
        tokenInAmount, 
        [tokenIn as `0x${string}`, tokenOut as `0x${string}`]
    );
    let receipt = await tx.wait();
    console.log(receipt);

    // Direct route
    // try {
    //     let tx = await v2Router.getAmountsOut(
    //         tokenInAmount, 
    //         [tokenIn as `0x${string}`, tokenOut as `0x${string}`]
    //     );
    //     let receipt = await tx.wait();
    //     console.log(receipt);
    //     // maxAmountOut = directResult[1]
    //     // bestRoute = [tokenIn, tokenOut]
    // } catch (error) {
    //     console.error("Error in direct route calculation:", error);
    //     // If the pool doesn't exist, set directResult to an array with max uint256 value
    // }   
   

    // let contracts = <any>[]
    // // Check routes with one intermediate token
    // for (const intermediateToken of defaultTokens) {
    //     if (intermediateToken !== tokenIn && intermediateToken !== tokenOut) {
    //         contracts.push({
    //             address: v2RouterAddress,
    //             abi: v2_router_abi,
    //             functionName: 'getAmountsOut',
    //             args: [tokenInAmount, [tokenIn as `0x${string}`, intermediateToken as `0x${string}`, tokenOut as `0x${string}`]]
    //         })
    //     }
    // }
    // const results = await multicall(wagmi_config, {contracts})
    // for (let i = 0; i < results.length; i++) {
    //     if (results[i].status === "success" && results[i].result) {
    //         const amountOut = results[i].result as bigint[]
    //         if (amountOut[amountOut.length - 1] > maxAmountOut) {
    //             maxAmountOut = amountOut[amountOut.length - 1]
    //             bestRoute = [tokenIn, defaultTokens[i], tokenOut]
    //         }
    //     }
    // }
    // return { bestRoute, maxAmountOut }

}

// export const v2ComputeAddress = (token0: string, token1: string) => {
//     const [token0Sorted, token1Sorted] = token0.toLowerCase() < token1.toLowerCase()
//         ? [token0, token1]
//         : [token1, token0]

//     const salt = keccak256(['bytes'], [pack(['address', 'address'], [token0Sorted, token1Sorted])])
//     const initCodeHash = '0x9ac843134bd02f87ccefa1b6ef876991ae932ca19d3e130f9e12e95befc92136' // Uniswap V2 init code hash

//     return getCreate2Address(v2FactoryAddress, salt, initCodeHash) as `0x${string}`
// }

// export const v2RoutingExactOutput = async(
//     tokenIn: string, 
//     tokenOut: string, 
//     tokenOutAmount: bigint
// ) => {
//     let bestRoute: string[] = []
//     let minAmountIn = BigInt(2) ** BigInt(256) - BigInt(1) // Max uint256 value

//     // Calculate for routes with 0 hop
//     // Direct route
//     try {
//         let directResult = await readContract(wagmi_config, {
//             address: v2RouterAddress,
//             abi: v2_router_abi,
//             functionName: 'getAmountsIn',
//             args: [tokenOutAmount, [tokenIn as `0x${string}`, tokenOut as `0x${string}`]]
//         });
//         minAmountIn = directResult[0]
//         bestRoute = [tokenIn, tokenOut]
//     } catch (error) {
//         console.error("Error in direct route calculation:", error);
//         // If the pool doesn't exist, set directResult to an array with max uint256 value
//     }

//     let contracts = <any>[]
//     // Check routes with one intermediate token
//     for (const intermediateToken of defaultTokens) {
//         if (intermediateToken !== tokenIn && intermediateToken !== tokenOut) {
//             contracts.push({
//                 address: v2RouterAddress,
//                 abi: v2_router_abi,
//                 functionName: 'getAmountsIn',
//                 args: [tokenOutAmount, [tokenIn as `0x${string}`, intermediateToken as `0x${string}`, tokenOut as `0x${string}`]]
//             })
//         }
//     }
//     const results = await multicall(wagmi_config, {contracts})
//     for (let i = 0; i < results.length; i++) {
//         if (results[i].status === "success" && results[i].result) {
//             const amountOut = results[i].result as bigint[]
//             if (amountOut[amountOut.length - 1] < minAmountIn) {
//                 minAmountIn = amountOut[0]
//                 bestRoute = [tokenIn, defaultTokens[i], tokenOut]
//             }
//         }
//     }
//     return { bestRoute, minAmountIn }
// }
