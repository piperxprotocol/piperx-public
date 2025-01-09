"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2RoutingExactInput = exports.v3RoutingExactOutputSingle = exports.fee2TickSpace = exports.v2Router = void 0;
// import { readContract, getBalance, getBlock, writeContract, multicall } from '@wagmi/core'
var abi_1 = require("./abi");
var constant_1 = require("./constant");
var ethers_1 = require("ethers");
exports.v2Router = new ethers_1.ethers.Contract(constant_1.v2RouterAddress, abi_1.v2_router_abi, constant_1.provider);
var piperv3QuoterContract = new ethers_1.ethers.Contract(constant_1.piperv3QuoterAddress, abi_1.piperv3Quoter_abi, constant_1.signer);
exports.fee2TickSpace = { "500": 10, "3000": 60, "10000": 200 };
// export const fee2TickSpace = {"500": 10}
var tokenOutAmount = ethers_1.ethers.utils.parseUnits("1", 18);
var PIPAddr = "0x6e990040Fd9b06F98eFb62A147201696941680b5";
var wipAddr = '0xe8CabF9d1FFB6CE23cF0a86641849543ec7BD7d5';
var multicallAddress = "0xcA11bde05977b3631167028862bE2a173976CA11";
var v3RoutingExactOutputSingle = function (tokenIn, tokenOut, tokenOutAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var quoteExactOutputSingleParams, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                quoteExactOutputSingleParams = {
                    tokenIn: tokenIn,
                    tokenOut: tokenOut,
                    amount: tokenOutAmount,
                    fee: 500,
                    sqrtPriceLimitX96: BigInt(0)
                };
                return [4 /*yield*/, piperv3QuoterContract.callStatic.quoteExactOutputSingle(quoteExactOutputSingleParams, { gasLimit: 5000000 })];
            case 1:
                result = _a.sent();
                // console.log("result: ", result.amountIn.toString());
                return [2 /*return*/, result.amountIn.toString()];
        }
    });
}); };
exports.v3RoutingExactOutputSingle = v3RoutingExactOutputSingle;
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
var v2RoutingExactInput = function (tokenIn, tokenOut, tokenInAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var bestRoute, maxAmountOut, tx, receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bestRoute = [];
                maxAmountOut = BigInt(0);
                return [4 /*yield*/, exports.v2Router.getAmountsOut(tokenInAmount, [tokenIn, tokenOut])];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, tx.wait()];
            case 2:
                receipt = _a.sent();
                console.log(receipt);
                return [2 /*return*/];
        }
    });
}); };
exports.v2RoutingExactInput = v2RoutingExactInput;
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
