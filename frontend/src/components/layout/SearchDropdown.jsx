import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../helpers/formatters';

export default function SearchDropdown({ results, onClose }) {
  if (!results.length) return null;
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 max-h-72 overflow-y-auto z-50">
      {results.slice(0, 6).map((item) => (
        <Link key={item.id} to={`/product/${item.slug || item.id}`} onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
          <div className="w-9 h-9 bg-gray-50 rounded flex items-center justify-center text-sm shrink-0">
            {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain rounded" /> : '📦'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
            <p className="text-[10px] font-bold text-primary-500">{formatPrice(item.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
