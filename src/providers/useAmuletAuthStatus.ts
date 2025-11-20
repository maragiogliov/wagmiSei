// src/providers/useAmuletAuthStatus.ts
import { useContext } from "react";
import { AuthStatusContext } from "./AuthStatusContext";

export function useAmuletAuthStatus() {
  return useContext(AuthStatusContext);
}
