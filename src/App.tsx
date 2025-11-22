// src/App.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="app-container">
      <header className="topbar">
        <div className="brand">
          <span className="brand-title">Amulet AI</span>
          <span className="brand-badge">Sei Testnet</span>
        </div>

        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openAccountModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            if (!connected) {
              return (
                <button className="amulet-connect" onClick={openConnectModal}>
                  🔮 Connect to Amulet
                </button>
              );
            }

            if (chain.unsupported) {
              return (
                <button className="amulet-warning" onClick={openChainModal}>
                  Wrong Network – Switch to Sei
                </button>
              );
            }

            return (
              <div className="amulet-connected">
                <button onClick={openAccountModal}>
                  {account.displayName}
                </button>
                <button onClick={openChainModal}>
                  {chain.name}
                </button>
              </div>
            );
          }}
        </ConnectButton.Custom>

      </header>

      <main className="main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
