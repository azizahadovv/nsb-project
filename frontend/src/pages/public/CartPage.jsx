import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiPackage } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../helpers/formatters';
import SEO from '../../components/seo/SEO';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQty, clearCart } = useCart();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <SEO title="Savatcha" />
      <h1 className="font-display text-2xl font-extrabold mb-6">Savatcha ({totalItems})</h1>
      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <FiShoppingBag className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-500 mb-3">Savat bo'sh</p>
          <Link to="/catalog" className="inline-flex px-5 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold">Xarid qilish</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-2">
            {items.map((it) => (
              <div key={it.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-50 rounded flex items-center justify-center">
                  {it.imageUrl ? <img src={it.imageUrl} alt={it.name} className="w-full h-full object-contain rounded" /> : <FiPackage className="text-gray-300" size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate">{it.name}</h3>
                  <p className="text-xs font-extrabold text-primary-500 mt-0.5">{formatPrice(it.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQty(it.id, it.quantity - 1)} className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500" aria-label="Kamaytirish"><FiMinus size={12} /></button>
                  <span className="w-6 text-center text-sm font-bold">{it.quantity}</span>
                  <button onClick={() => updateQty(it.id, it.quantity + 1)} className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500" aria-label="Oshirish"><FiPlus size={12} /></button>
                </div>
                <span className="text-sm font-extrabold w-28 text-right hidden sm:block">{formatPrice(it.price * it.quantity)}</span>
                <button onClick={() => removeFromCart(it.id)} className="text-gray-400 hover:text-red-500" aria-label="Olib tashlash"><FiTrash2 size={14} /></button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-5 h-fit sticky top-24">
            <h3 className="font-display text-lg font-extrabold mb-3">Buyurtma</h3>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Mahsulotlar</span><span className="font-bold">{formatPrice(totalPrice)}</span></div>
            <div className="flex justify-between text-sm mb-3"><span className="text-gray-500">Yetkazish</span><span className="font-bold text-green-600">Bepul</span></div>
            <hr className="mb-3" />
            <div className="flex justify-between"><span className="font-bold">Jami</span><span className="font-display font-extrabold text-primary-500">{formatPrice(totalPrice)}</span></div>
            <Link to="/checkout" className="block w-full mt-4 py-3 bg-primary-500 text-white rounded-lg font-bold text-sm text-center hover:bg-primary-600">Buyurtma berish</Link>
            <button onClick={clearCart} className="text-[10px] text-gray-400 hover:text-red-500 mt-2 block mx-auto">Tozalash</button>
          </div>
        </div>
      )}
    </div>
  );
}
