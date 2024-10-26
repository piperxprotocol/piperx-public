import { defineChain } from 'viem'
import { createConfig, http } from "@wagmi/core"

export const Storytestnet = defineChain({
    id: 1513,
    name: 'Iliad',
    nativeCurrency: { name: 'IP', symbol: 'IP', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://testnet.storyrpc.io'] },
    },
    blockExplorers: {
      default: { name: 'blockscout', url: 'https://testnet.storyscan.xyz' },
    },
    contracts: {
      multicall3: {
          address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      }
    }
  })

export const wagmi_config = createConfig({
    chains: [Storytestnet],
    transports: {
      [Storytestnet.id]: http('https://testnet.storyrpc.io')
    },
    ssr: false
})

export const defaultTokens = [
  '0x6e990040Fd9b06F98eFb62A147201696941680b5',
  '0x6b2141D7b2bFD794C2c30e48A77cBC12ac1b4572',
  '0x8812d810EA7CC4e1c3FB45cef19D6a7ECBf2D85D',
  '0x700722D24f9256Be288f56449E8AB1D27C4a70ca'
]

export const WIP_ADDRESS = "0x6e990040Fd9b06F98eFb62A147201696941680b5"

export const v2FactoryAddress = "0x02F75bdBb4732cc6419aC15EeBeE6BCee66e826f"

export const v2RouterAddress = "0x56300f2dB653393e78C7b5edE9c8f74237B76F47"