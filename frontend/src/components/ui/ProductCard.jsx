import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiSun, FiPackage } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../helpers/formatters';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggle, isWished } = useWishlist();
  const { id, name, slug, price, oldPrice, rating, reviewCount, badge, isSolar } = product;
  const wished = isWished(id);

  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:border-primary-500 hover:shadow-lg hover:-translate-y-1 group relative" aria-label={name}>
      {badge && <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-extrabold text-white ${badge === 'HIT' ? 'bg-red-500' : badge === 'YANGI' ? 'bg-primary-500' : 'bg-accent-500'}`}>{badge}</span>}
      <button onClick={() => toggle(product)} className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-primary-500 ${wished ? 'bg-red-50 border-red-300 text-red-500' : 'bg-white border-gray-200 text-gray-400'}`} aria-label={wished ? 'Olib tashlash' : 'Sevimlilarga'} tabIndex={0}>
        <FiHeart className={`text-xs ${wished ? 'fill-current' : ''}`} />
      </button>
      <Link to={`/product/${slug || id}`} aria-label={`${name} - ${formatPrice(price)}`}>
        <div className={`h-40 flex items-center justify-center p-4 ${isSolar ? 'bg-solar-50' : 'bg-gray-50'}`}>
          {product.imageUrl ? <img src={product.imageUrl} alt={name} loading="lazy" className="max-h-full object-contain" /> : isSolar ? <FiSun className="text-solar-300" size={40} /> : <FiPackage className="text-gray-300" size={40} />}
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1" aria-label={`Reyting: ${rating || 0}`}>
          {[...Array(5)].map((_, i) => <FaStar key={i} className={`text-[10px] ${i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`} />)}
          <span className="text-[10px] text-gray-400 ml-1">({reviewCount || 0})</span>
        </div>
        <Link to={`/product/${slug || id}`}><h3 className="text-xs font-semibold text-gray-700 leading-snug mb-2 line-clamp-2 min-h-[32px] hover:text-primary-500">{name}</h3></Link>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-display text-sm font-extrabold">{formatPrice(price)}</span>
          {oldPrice && <span className="text-[10px] text-gray-400 line-through">{formatPrice(oldPrice)}</span>}
        </div>
        <button onClick={() => addToCart(product)} disabled={isInCart(id)} tabIndex={0}
          className={`w-full py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${isInCart(id) ? 'bg-green-100 text-green-700' : isSolar ? 'bg-solar-500 text-white' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
          aria-label={isInCart(id) ? 'Savatda' : 'Savatga'}>
          <FiShoppingCart className="text-xs" /> {isInCart(id) ? 'Savatda' : 'Savatga'}
        </button>
      </div>
    </article>
  );
}
