// src/components/WagmiInterface.tsx
import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseEther, formatEther } from 'viem';
import { ERC20_ABI, TOKEN_CONTRACT_ADDRESS } from '../shared/constants';

export function WagmiInterface() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Wallet state
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  // Read token metadata
  const { data: name } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'symbol',
  });

  // Read balance of connected address
  const {
    data: balance,
    refetch: refetchBalance,
  } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Write / send tokens
  const {
    writeContract,
    data: txHash,
    isPending: isSending,
    error,
  } = useWriteContract();

  // Track confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  // Connect wallet (Rabby / MetaMask / etc.)
  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleTransfer = () => {
    if (!recipient || !amount) return;
    writeContract({
      address: TOKEN_CONTRACT_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [recipient, parseEther(amount)],
    });
  };

  // After confirmation, clean up & refresh balance
  if (isConfirmed) {
    refetchBalance();
    if (recipient || amount) {
      setRecipient('');
      setAmount('');
    }
  }

  if (!isConnected) {
    return (
      <div className="card">
        <h2>Amulet AI – Wagmi dApp</h2>
        <button onClick={handleConnect}>Connect Wallet (Rabby, MetaMask…)</button>
      </div>
    );
  }

  const shortAddr =
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="card">
      <h2>Amulet AI – Wagmi dApp</h2>
      <h3>
        {(name as string) ?? 'Loading'} ({(symbol as string) ?? '...'})
      </h3>

      <p>Connected: {shortAddr}</p>
      <p>
        Balance:{' '}
        {balance ? `${formatEther(balance as bigint)} ${symbol as string}` : '…'}
      </p>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Recipient address (0x...)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{ width: 320, marginBottom: 8 }}
        />
        <br />
        <input
          type="number"
          placeholder="Amount (AMULET)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: 320, marginBottom: 8 }}
        />
        <br />
        <button
          onClick={handleTransfer}
          disabled={isSending || isConfirming}
        >
          {isSending
            ? 'Sending…'
            : isConfirming
            ? 'Waiting for confirmation…'
            : 'Send AMULET'}
        </button>

        {txHash && (
          <p style={{ marginTop: 8 }}>
            Tx:{' '}
            <a
              href={`https://testnet.seiscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Seiscan
            </a>
          </p>
        )}

        {error && (
          <p style={{ color: 'red', marginTop: 8 }}>
            Error: {(error as Error).message}
          </p>
        )}
      </div>
    </div>
  );
}
