import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid } from 'react-icons/fi';
import publicService from '../../services/publicService';

export default function CatalogDropdown({ onClose }) {
  const [cats, setCats] = useState([]);
  useEffect(() => { publicService.getCategories().then(({ data }) => setCats(data || [])).catch(() => {}); }, []);

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 w-[280px] py-2 z-50">
      {cats.map((c) => (
        <Link key={c.id} to={`/catalog/${c.slug}`} onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
          <span className="text-base">{c.iconUrl || <FiGrid size={16} />}</span>
          {c.name}
        </Link>
      ))}
      {cats.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">Yuklanmoqda...</p>}
    </div>
  );
}
