import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid } from 'react-icons/fi';
import publicService from '../../services/publicService';

export default function CategoryGrid() {
  const [cats, setCats] = useState([]);
  useEffect(() => { publicService.getCategories().then(({ data }) => setCats(data || [])).catch(() => {}); }, []);
  if (!cats.length) return null;

  return (
    <section className="py-5" aria-label="Kategoriyalar">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {cats.map((c) => (
            <Link key={c.id} to={`/catalog/${c.slug}`}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all hover:border-primary-400">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-primary-50 text-primary-500">
                {c.iconUrl || <FiGrid size={20} />}
              </div>
              <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
