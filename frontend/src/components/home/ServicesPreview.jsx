import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import publicService from '../../services/publicService';

const ICONS = { '🔧': 'bg-primary-50', '🖨': 'bg-accent-50', '📹': 'bg-purple-50', '☀️': 'bg-solar-50', '💼': 'bg-emerald-50' };

export default function ServicesPreview() {
  const [services, setServices] = useState([]);
  useEffect(() => { publicService.getServices().then(({ data }) => setServices(data || [])).catch(() => {}); }, []);
  if (services.length === 0) return null;

  return (
    <section className="py-8"><div className="max-w-[1280px] mx-auto px-4">
      <SectionHeader icon="⚙️" iconBg="bg-indigo-100 text-indigo-500" title="Bizning xizmatlar" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {services.slice(0, 5).map((s) => (
          <Link key={s.id} to={`/services/${s.slug}`} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto mb-2 ${ICONS[s.iconUrl] || 'bg-gray-50'}`}>{s.iconUrl || '⚙️'}</div>
            <h4 className="text-xs font-bold">{s.title}</h4>
          </Link>
        ))}
      </div>
    </div></section>
  );
}
