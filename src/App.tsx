// src/App.tsx
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  return (
    <div className="app-container">
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
        }}
      >
        <ConnectButton />
      </header>

    </div>
  );
}

export default App;
