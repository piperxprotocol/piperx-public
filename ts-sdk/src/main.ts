import { ethers } from 'ethers';
import {v3RoutingExactOutputSingle, executeMulticall} from './routing'
import {WIP_ADDRESS} from './constant'
// import {configs} from "./configs.json"
import {piperv3Quoter_abi} from "./abi"

const IPAddr = "0x6e990040Fd9b06F98eFb62A147201696941680b5"
const PIPAddr = "0x40fCa9cB1AB15eD9B5bDA19A52ac00A78AE08e1D"

async function main() {
    // // const result = await v2RoutingExactInput(
    // //     IPAddr,
    // //     PIPAddr,
    // //     ethers.utils.parseUnits("100", 18)
    // // );
    // const result = await v3RoutingExactInput();


    const PIPAddr = "0x6e990040Fd9b06F98eFb62A147201696941680b5";
    const wipAddr = '0xe8CabF9d1FFB6CE23cF0a86641849543ec7BD7d5';

    await v3RoutingExactOutputSingle(PIPAddr, wipAddr, ethers.utils.parseUnits("1", 18).toBigInt());
    // await executeMulticall(PIPAddr, wipAddr, ethers.utils.parseUnits("1", 18).toBigInt());


    // const provider = new ethers.providers.JsonRpcProvider("https://odyssey.storyrpc.io");
    // const privateKey = "be8a7298ad7a5bd7d7d8d4df00a8aca707ea2823ad0e4da2ffc05496687c9eb8" 
    // const acc1 = new ethers.Wallet(privateKey, provider);

    // const piperv3QuoterAddress = "0x82C210d4aA5948f68E46Af355C0399c2E921e8e4"
    // // const piperv3QuoterArtifact = await artifacts.readArtifact("QuoterV2");
    // const piperv3QuoterContract = new ethers.Contract(piperv3QuoterAddress, piperv3Quoter_abi, acc1);
    // const PIPAddr = "0x6e990040Fd9b06F98eFb62A147201696941680b5";
    // const wipAddr = '0xe8CabF9d1FFB6CE23cF0a86641849543ec7BD7d5';
    // let tokenOutAmount =  ethers.utils.parseUnits("1", 18);
    // const quoteExactOutputSingleParams = {
    //     tokenIn: PIPAddr,
    //     tokenOut: wipAddr,
    //     amount: tokenOutAmount,
    //     fee: 500,
    //     sqrtPriceLimitX96: BigInt(0)
    //   }
    //   console.log("quoteExactOutputSingleParams:");
    //   let tx = await piperv3QuoterContract.callStatic.quoteExactOutputSingle(
    //     quoteExactOutputSingleParams,
    //     {gasLimit: 5000000}
    //   );
    //   console.log("result: ", tx);

}


if (require.main === module) {
    main().then((resp) => console.log(resp));
}
