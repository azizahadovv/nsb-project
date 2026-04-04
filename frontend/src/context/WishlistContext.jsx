import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);
const KEY = 'nsb_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const toggle = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) { toast.success("Olib tashlandi"); return prev.filter((i) => i.id !== product.id); }
      toast.success("Sevimlilarga qo'shildi"); return [...prev, product];
    });
  };

  const isWished = (id) => items.some((i) => i.id === id);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggle, isWished, count }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
