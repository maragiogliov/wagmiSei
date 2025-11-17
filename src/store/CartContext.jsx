import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || state;
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      const id = String(product.id);
      const prev = state.items[id];
      const nextQty = (prev?.qty || 0) + qty;
      const nextItems = {
        ...state.items,
        [id]: { id, product, qty: nextQty, lineTotal: nextQty * (product.price || 0) },
      };
      const { count, total } = summarize(nextItems);
      return { items: nextItems, count, total };
    }
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return state;
      if (!state.items[id]) return state;
      const nextItems = {
        ...state.items,
        [id]: {
          ...state.items[id],
          qty,
          lineTotal: qty * (state.items[id].product.price || 0),
        },
      };
      const { count, total } = summarize(nextItems);
      return { items: nextItems, count, total };
    }
    case "REMOVE": {
      const nextItems = { ...state.items };
      delete nextItems[action.payload.id];
      const { count, total } = summarize(nextItems);
      return { items: nextItems, count, total };
    }
    case "CLEAR":
      return { items: {}, count: 0, total: 0 };
    default:
      return state;
  }
}

function summarize(items) {
  let count = 0;
  let total = 0;
  for (const k in items) {
    count += items[k].qty;
    total += items[k].lineTotal;
  }
  return { count, total };
}

const INITIAL = { items: {}, count: 0, total: 0 };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(() => ({
    items: state.items,
    count: state.count,
    total: state.total,
    addItem: (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } }),
    updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id: String(id), qty } }),
    removeItem: (id) => dispatch({ type: "REMOVE", payload: { id: String(id) } }),
    clear: () => dispatch({ type: "CLEAR" }),
  }), [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};

export const useCartCount = () => useCart().count;
export const useCartTotal = () => useCart().total;
