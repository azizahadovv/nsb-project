import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiSun, FiPackage } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import SEO from '../../components/seo/SEO';
import { ProductSchema } from '../../components/seo/StructuredData';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductCard from '../../components/ui/ProductCard';
import Spinner from '../../components/ui/Spinner';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import productService from '../../services/productService';
import { formatPrice } from '../../helpers/formatters';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart, isInCart } = useCart();
  const { toggle, isWished } = useWishlist();

  useEffect(() => {
    setLoading(true);
    productService.getBySlug(slug).then(({ data }) => {
      setProduct(data);
      if (data?.categoryId) {
        const catSlug = data.categoryName?.toLowerCase()?.replace(/\s+/g, '-') || '';
        productService.getByCategory(catSlug, { page: 0, size: 5 })
          .then(({ data: r }) => setRelated((r?.content || []).filter((p) => p.id !== data.id).slice(0, 4)))
          .catch(() => {});
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner />;
  if (!product) return <div className="max-w-[1280px] mx-auto px-4 py-20 text-center text-gray-400"><FiPackage className="mx-auto mb-3" size={48} /><p className="font-bold">Mahsulot topilmadi</p></div>;

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-5" id="main-content">
      <SEO title={product.seoTitle || product.name} description={product.seoDescription || product.description} />
      <ProductSchema product={product} />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: product.categoryName || 'Katalog', to: '/catalog' }, { label: product.name }]} />
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-50 rounded-xl flex items-center justify-center min-h-[280px] p-8">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="max-h-72 object-contain" /> : product.isSolar ? <FiSun className="text-solar-300" size={80} /> : <FiPackage className="text-gray-300" size={80} />}
        </div>
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-extrabold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <FaStar key={i} className={`text-xs ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`} />)}</div>
            <span className="text-xs text-gray-400">({product.reviewCount} sharh)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-1"><span className="font-display text-2xl font-extrabold">{formatPrice(product.price)}</span>{product.oldPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}</div>
          {product.installmentPrice && <p className="text-sm text-primary-500 font-semibold mb-3">Muddatli: {formatPrice(product.installmentPrice)}/oy</p>}
          <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.description}</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center text-gray-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Kamaytirish"><FiMinus size={14} /></button>
              <span className="w-10 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center text-gray-500 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Oshirish"><FiPlus size={14} /></button>
            </div>
            <span className="text-xs text-gray-400">{product.stock > 0 ? `${product.stock} ta mavjud` : 'Buyurtma asosida'}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }} disabled={isInCart(product.id)} className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${isInCart(product.id) ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600'}`}><FiShoppingCart /> {isInCart(product.id) ? 'Savatda' : "Savatga"}</button>
            <button onClick={() => toggle(product)} className={`w-12 h-12 border rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 ${isWished(product.id) ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400'}`} aria-label="Sevimlilarga"><FiHeart className={isWished(product.id) ? 'fill-current' : ''} /></button>
          </div>
        </div>
      </div>
      {related.length > 0 && <section><h2 className="font-display text-lg font-extrabold mb-4">O'xshash mahsulotlar</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
    </div>
  );
}
