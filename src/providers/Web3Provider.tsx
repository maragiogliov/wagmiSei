// src/providers/Web3Provider.tsx
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";
// If you want an explicit initial chain later:
// import { seiTestnet } from "../wagmi";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Web3Provider: React.FC<Props> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* ✅ No chains prop in v2 when using getDefaultConfig */}
        <RainbowKitProvider
          // optional:
          // initialChain={seiTestnet}  // or seiTestnet.id
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
