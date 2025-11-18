// src/components/ConnectButtom.tsx
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

type ResponsiveValue<T> = T | { smallScreen?: T; largeScreen?: T };

export type ConnectButtonProps = {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
  label?: string;
};

export default function ConnectButtonCustom({ label = 'Connect Wallet' }: ConnectButtonProps) {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openConnectModal,
        openAccountModal,
        openChainModal,
      }) => {
        const connected = mounted && account && chain;

        // NOT CONNECTED → icon-only button
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              aria-label={label}
              style={{
                width: '100%',
                border: "none",
                borderRadius: "999px",
                padding: "6px 14px",
                fontFamily: "var(--body-sm-bold-font-family, 'Satoshi-Regular')",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
           
                background: "#1d7afc",
                color:'white',
                cursor: "pointer",
                whiteSpace: "nowrap",

              }}
            >
           Connect Wallet
            </button>
          );
        }

        // WRONG NETWORK
        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid #f97373',
                background: 'rgba(127, 29, 29, 0.7)',
                color: '#fee2e2',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Wrong network
            </button>
          );
        }

        // CONNECTED → show address / ENS
        return (
          <button
            onClick={openAccountModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 999,
              background: '#020617',
              border: '1px solid #334155',
              color: 'white',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
              }}
            />
            <span>{account?.displayName}</span>
          </button>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
