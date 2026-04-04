import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { formatPrice } from '../../helpers/formatters';

const PARTS = [
  { key: 'cpu', label: 'Protsessor', options: [{ name: 'Intel Core i5-13400F', price: 2800000 }, { name: 'AMD Ryzen 5 5600X', price: 2500000 }, { name: 'Intel Core i7-13700K', price: 5200000 }, { name: 'AMD Ryzen 7 7800X3D', price: 6100000 }] },
  { key: 'gpu', label: 'Videokarta', options: [{ name: 'NVIDIA RTX 4060 8GB', price: 5690000 }, { name: 'NVIDIA RTX 4070 12GB', price: 8500000 }, { name: 'AMD RX 7600 8GB', price: 4200000 }] },
  { key: 'ram', label: 'RAM', options: [{ name: '16GB DDR4 3200MHz', price: 680000 }, { name: '32GB DDR4 3200MHz', price: 1300000 }, { name: '32GB DDR5 5600MHz', price: 1800000 }] },
  { key: 'ssd', label: 'SSD', options: [{ name: '512GB NVMe', price: 550000 }, { name: '1TB NVMe', price: 950000 }, { name: '2TB NVMe', price: 1800000 }] },
  { key: 'psu', label: 'Blok pitaniya', options: [{ name: '550W 80+ Bronze', price: 650000 }, { name: '750W 80+ Gold', price: 1100000 }] },
  { key: 'case', label: 'Korpus', options: [{ name: 'ATX Mesh (oddiy)', price: 450000 }, { name: 'ATX RGB Gaming', price: 850000 }] },
];

export default function PcBuilderPage() {
  const [selected, setSelected] = useState({});
  const total = Object.values(selected).reduce((s, v) => s + (v?.price || 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <SEO title="Kompyuter konstruktori" description="O'zingiz kompyuter yig'ing — komponentlarni tanlang" />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'PK konstruktor' }]} />
      <h1 className="font-display text-2xl font-extrabold mb-5">🖥 Kompyuter konstruktori</h1>
      <div className="space-y-3 mb-5">
        {PARTS.map((part) => (
          <div key={part.key} className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-xs font-bold text-gray-600 mb-2">{part.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {part.options.map((opt) => (
                <button key={opt.name} onClick={() => setSelected({ ...selected, [part.key]: opt })}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${selected[part.key]?.name === opt.name ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                  <p className="font-semibold">{opt.name}</p>
                  <p className="font-bold text-primary-500 mt-0.5">{formatPrice(opt.price)}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 sticky bottom-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div><p className="text-xs text-gray-500">Tanlangan: {Object.keys(selected).length}/{PARTS.length}</p><p className="font-display text-xl font-extrabold">{formatPrice(total)}</p></div>
          <Link to="/cart" className="px-6 py-3 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 transition-colors">Buyurtma berish</Link>
        </div>
      </div>
    </div>
  );
}
