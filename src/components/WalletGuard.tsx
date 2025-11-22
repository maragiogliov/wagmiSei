import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
// If you don't want SIWE at all anymore, you can delete this import:
// import { useAmuletAuthStatus } from "../providers/useAmuletAuthStatus";

export default function WalletGuard() {
  const { isConnected } = useAccount();
  const location = useLocation();

  // ❌ Not connected → can only stay on landing ("/")
  if (!isConnected) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // ✅ Wallet connected → allow access to protected routes
  return <Outlet />;
}
