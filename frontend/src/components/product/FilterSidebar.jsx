import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import publicService from '../../services/publicService';

export default function FilterSidebar({ filters, onChange, onClose, isMobile }) {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');

  useEffect(() => { publicService.getBrands().then(({ data }) => setBrands(data || [])).catch(() => {}); }, []);

  const toggleBrand = (brand) => {
    const cur = filters.brands || [];
    onChange({ ...filters, brands: cur.includes(brand) ? cur.filter((b) => b !== brand) : [...cur, brand] });
  };
  const applyPrice = () => onChange({ ...filters, priceMin, priceMax });
  const cls = isMobile ? 'fixed inset-0 z-50 bg-black/40' : '';

  return (
    <div className={cls}>
      <aside className={`bg-white ${isMobile ? 'absolute right-0 top-0 h-full w-[280px] shadow-xl p-4 overflow-y-auto' : 'space-y-4 w-56 shrink-0'}`}>
        {isMobile && <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-sm">{t('catalog.filters')}</h3><button onClick={onClose} aria-label={t('common.close')}><FiX /></button></div>}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <h4 className="text-xs font-bold mb-2">{t('catalog.price')}</h4>
          <div className="flex gap-2">
            <input type="number" placeholder={t('catalog.price_from')} value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:border-primary-500" />
            <input type="number" placeholder={t('catalog.price_to')} value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:border-primary-500" />
          </div>
          <button onClick={applyPrice} className="mt-2 w-full py-1.5 bg-primary-50 text-primary-600 rounded-md text-xs font-bold hover:bg-primary-100">{t('catalog.price_apply')}</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <h4 className="text-xs font-bold mb-2">{t('catalog.brand')}</h4>
          {brands.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-xs text-gray-600 mb-1.5 cursor-pointer">
              <input type="checkbox" checked={(filters.brands || []).includes(b.name)} onChange={() => toggleBrand(b.name)} className="w-3.5 h-3.5 rounded border-gray-300 text-primary-500" />
              {b.name}
            </label>
          ))}
          {brands.length === 0 && <p className="text-xs text-gray-400">Brendlar yuklanmoqda...</p>}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h4 className="text-xs font-bold mb-2">{t('catalog.rating')}</h4>
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 text-xs text-gray-600 mb-1.5 cursor-pointer">
              <input type="checkbox" checked={filters.minRating === r} onChange={() => onChange({ ...filters, minRating: filters.minRating === r ? null : r })} className="w-3.5 h-3.5 rounded border-gray-300 text-primary-500" />
              {r}+ {t('catalog.stars')}
            </label>
          ))}
        </div>
      </aside>
    </div>
  );
}
