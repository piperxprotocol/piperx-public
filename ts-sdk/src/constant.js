"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piperv3QuoterAddress = exports.v2RouterAddress = exports.v2FactoryAddress = exports.WIP_ADDRESS = exports.defaultTokens = exports.signer = exports.provider = void 0;
var ethers_1 = require("ethers");
var privateKey = "52d045318ba4d29e39918d8c14b7f734f20da97b293f34317fd0ed8c2b180c2f";
var URL = 'https://odyssey.storyrpc.io/';
exports.provider = new ethers_1.ethers.providers.JsonRpcProvider(URL);
// export const walletAddress = accounts[0]    // first account in MetaMask
exports.signer = new ethers_1.ethers.Wallet(privateKey, exports.provider);
exports.defaultTokens = [
    '0x6e990040Fd9b06F98eFb62A147201696941680b5',
    '0x6b2141D7b2bFD794C2c30e48A77cBC12ac1b4572',
    '0x8812d810EA7CC4e1c3FB45cef19D6a7ECBf2D85D',
    '0x700722D24f9256Be288f56449E8AB1D27C4a70ca'
];
exports.WIP_ADDRESS = "0x6e990040Fd9b06F98eFb62A147201696941680b5";
exports.v2FactoryAddress = "0x02F75bdBb4732cc6419aC15EeBeE6BCee66e826f";
exports.v2RouterAddress = "0x56300f2dB653393e78C7b5edE9c8f74237B76F47";
exports.piperv3QuoterAddress = "0x82C210d4aA5948f68E46Af355C0399c2E921e8e4";
