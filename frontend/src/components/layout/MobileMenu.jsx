import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';

export default function MobileMenu({ query, setQuery, cats, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/catalog?search=${encodeURIComponent(query)}`); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-[260px] bg-white shadow-2xl overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="font-display font-extrabold text-lg text-primary-500">NSB.uz</span>
          <button onClick={onClose} aria-label={t('common.close')}><FiX /></button>
        </div>
        <form onSubmit={handleSearch} className="p-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('nav.search')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </form>
        <nav className="p-2">
          <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase">{t('nav.categories')}</p>
          {(cats || []).map((c) => (
            <Link key={c.id} to={`/catalog/${c.slug}`} onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded">
              {c.iconUrl && <span>{c.iconUrl}</span>} {c.name}
            </Link>
          ))}
          <hr className="my-2 border-gray-100" />
          {[[t('nav.about'),'/about'],[t('nav.blog'),'/blog'],[t('nav.contact'),'/contact'],[t('nav.wishlist'),'/wishlist']].map(([n,to]) => (
            <Link key={to} to={to} onClick={onClose} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded">{n}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
