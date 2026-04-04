import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);
const KEY = 'nsb_cart';

function reducer(state, action) {
  let items;
  switch (action.type) {
    case 'LOAD': return { items: action.payload };
    case 'ADD': {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      items = idx >= 0
        ? state.items.map((it, i) => i === idx ? { ...it, quantity: it.quantity + 1 } : it)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items };
    }
    case 'REMOVE': return { items: state.items.filter(i => i.id !== action.payload) };
    case 'QTY': return { items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.qty) } : i) };
    case 'CLEAR': return { items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) }); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state.items)); }, [state.items]);

  const addToCart = (p) => { dispatch({ type: 'ADD', payload: p }); toast.success('Savatga qo\'shildi'); };
  const removeFromCart = (id) => { dispatch({ type: 'REMOVE', payload: id }); };
  const updateQty = (id, qty) => dispatch({ type: 'QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const isInCart = (id) => state.items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, totalPrice, addToCart, removeFromCart, updateQty, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
