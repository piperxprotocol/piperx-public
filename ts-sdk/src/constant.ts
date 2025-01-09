import { ethers } from 'ethers';

const privateKey = "52d045318ba4d29e39918d8c14b7f734f20da97b293f34317fd0ed8c2b180c2f" 
const URL = 'https://odyssey.storyrpc.io/'
export const provider = new ethers.providers.JsonRpcProvider(URL);
// export const walletAddress = accounts[0]    // first account in MetaMask
export const signer = new ethers.Wallet(privateKey, provider)


export const defaultTokens = [
  '0x6e990040Fd9b06F98eFb62A147201696941680b5',
  '0x6b2141D7b2bFD794C2c30e48A77cBC12ac1b4572',
  '0x8812d810EA7CC4e1c3FB45cef19D6a7ECBf2D85D',
  '0x700722D24f9256Be288f56449E8AB1D27C4a70ca'
]

export const WIP_ADDRESS = "0x6e990040Fd9b06F98eFb62A147201696941680b5"

export const v2FactoryAddress = "0x02F75bdBb4732cc6419aC15EeBeE6BCee66e826f"

export const v2RouterAddress = "0x56300f2dB653393e78C7b5edE9c8f74237B76F47"

export const piperv3QuoterAddress = "0x82C210d4aA5948f68E46Af355C0399c2E921e8e4"
