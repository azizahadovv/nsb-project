import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiHeart } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../helpers/formatters';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <SEO title="Sevimlilar" />
      <h1 className="font-display text-2xl font-extrabold mb-6">Sevimlilar ({items.length})</h1>
      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center"><FiHeart className="text-4xl text-gray-300 mx-auto mb-3" /><p className="font-bold text-gray-500 mb-3">Sevimlilar bo'sh</p><Link to="/catalog" className="inline-flex px-5 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold">Xarid qilish</Link></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-3">
              <Link to={`/product/${p.slug || p.id}`} className="block h-32 bg-gray-50 rounded flex items-center justify-center mb-2"><span className="text-3xl text-gray-300">📦</span></Link>
              <h3 className="text-xs font-bold line-clamp-2 mb-1">{p.name}</h3>
              <p className="text-sm font-extrabold mb-2">{formatPrice(p.price)}</p>
              <div className="flex gap-1.5">
                <button onClick={() => addToCart(p)} className="flex-1 py-1.5 bg-primary-500 text-white rounded text-xs font-bold">Savatga</button>
                <button onClick={() => toggle(p)} className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-red-400"><FiTrash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
