import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import useScrollTop from '../../hooks/useScrollTop';
import useDebounce from '../../hooks/useDebounce';
import productService from '../../services/productService';
import publicService from '../../services/publicService';
import SearchDropdown from './SearchDropdown';
import CatalogDropdown from './CatalogDropdown';
import MobileMenu from './MobileMenu';
import LangSwitcher from '../ui/LangSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cats, setCats] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const searchRef = useRef(null);
  const catalogRef = useRef(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isAuth } = useAuth();
  const { count: wishCount } = useWishlist();
  const scrollY = useScrollTop();
  const debouncedQ = useDebounce(query, 300);

  useEffect(() => { publicService.getCategories().then(({ data }) => setCats(data || [])).catch(() => {}); }, []);
  useEffect(() => {
    if (debouncedQ.length < 2) { setResults([]); setShowSearch(false); return; }
    productService.search(debouncedQ, { page: 0, size: 6 }).then(({ data }) => { setResults(data?.content || []); setShowSearch(true); }).catch(() => setResults([]));
  }, [debouncedQ]);
  useEffect(() => {
    const h = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false); if (catalogRef.current && !catalogRef.current.contains(e.target)) setShowCatalog(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); if (query.trim()) { navigate(`/catalog?search=${encodeURIComponent(query)}`); setShowSearch(false); setQuery(''); } };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm">{t('nav.skip')}</a>
      <header className={`bg-white sticky top-0 z-50 transition-shadow ${scrollY > 50 ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-3 py-2.5">
          <button className="lg:hidden text-gray-600" onClick={() => setShowMobile(true)} aria-label="Menu"><FiMenu size={22} /></button>
          <Link to="/" className="font-display font-extrabold text-2xl text-primary-500 shrink-0">NSB<span className="text-accent-500">.uz</span></Link>
          <div ref={catalogRef} className="relative hidden lg:block">
            <button onClick={() => setShowCatalog(!showCatalog)} className="flex items-center gap-1.5 bg-primary-500 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-primary-600">{t('nav.catalog')} <FiChevronDown className={`text-[10px] transition-transform ${showCatalog ? 'rotate-180' : ''}`} /></button>
            {showCatalog && <CatalogDropdown onClose={() => setShowCatalog(false)} />}
          </div>
          <form ref={searchRef} onSubmit={handleSubmit} className="flex-1 relative hidden sm:block" role="search">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('nav.search')} autoComplete="off" className="w-full py-2 pl-4 pr-10 border-2 border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-primary-500" aria-label={t('common.search')} />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-500 text-white rounded-md flex items-center justify-center"><FiSearch size={14} /></button>
            {showSearch && <SearchDropdown results={results} onClose={() => { setShowSearch(false); setQuery(''); }} />}
          </form>
          <LangSwitcher />
          <nav className="flex gap-1 shrink-0">
            <Link to="/wishlist" className="relative flex flex-col items-center px-2 py-1 text-gray-500 hover:text-primary-500"><FiHeart size={18} /><span className="text-[9px] font-semibold hidden sm:block">{t('nav.wishlist')}</span>{wishCount > 0 && <span className="absolute -top-0.5 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{wishCount}</span>}</Link>
            <Link to="/cart" className="relative flex flex-col items-center px-2 py-1 text-gray-500 hover:text-primary-500"><FiShoppingBag size={18} /><span className="text-[9px] font-semibold hidden sm:block">{t('nav.cart')}</span>{totalItems > 0 && <span className="absolute -top-0.5 right-0 w-4 h-4 bg-accent-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}</Link>
            <Link to={isAuth ? '/account' : '/login'} className="flex flex-col items-center px-2 py-1 text-gray-500 hover:text-primary-500"><FiUser size={18} /><span className="text-[9px] font-semibold hidden sm:block">{isAuth ? t('nav.cabinet') : t('nav.login')}</span></Link>
          </nav>
        </div>
        {cats.length > 0 && <nav className="max-w-[1280px] mx-auto px-4 overflow-x-auto hide-scrollbar hidden lg:flex gap-0 border-t border-gray-50">{cats.map((c) => <Link key={c.id} to={`/catalog/${c.slug}`} className="flex items-center gap-1 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 border-transparent hover:border-primary-500 text-gray-600">{c.iconUrl && <span className="text-sm">{c.iconUrl}</span>} {c.name}</Link>)}</nav>}
      </header>
      {showMobile && <MobileMenu query={query} setQuery={setQuery} cats={cats} onClose={() => setShowMobile(false)} />}
    </>
  );
}
