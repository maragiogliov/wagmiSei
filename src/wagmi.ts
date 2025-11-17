// src/wagmi.ts
import { http } from 'wagmi';
import type { Chain } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// 1) Define Sei Testnet as a RainbowKit/Wagmi chain
export const seiTestnet: Chain = {
  id: 1328,
  name: 'Sei Testnet',
  nativeCurrency: {
    name: 'Sei',
    symbol: 'SEI',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc-testnet.sei-apis.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Seiscan',
      url: 'https://testnet.seiscan.io',
    },
  },
  // Optional, if you want an icon in the modal:
  iconBackground: '#000',
  // iconUrl: 'https://your-icon-url.png',
} as const;

// 2) Use RainbowKit’s helper to create the wagmi config
export const config = getDefaultConfig({
  appName: 'Amulet AI dApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
  chains: [seiTestnet],
  // You can still pass wagmi options like transports if you want:
  transports: {
    [seiTestnet.id]: http(),
  },
});
