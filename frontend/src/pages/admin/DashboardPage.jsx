import React, { useState, useEffect } from 'react';
import { FiBox, FiShoppingCart, FiUsers, FiDollarSign } from 'react-icons/fi';
import adminService from '../../services/adminService';
import { formatPrice } from '../../helpers/formatters';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService.dashboard()
      .then(({ data }) => setStats(data))
      .catch(() => {});
  }, []);

  if (!stats) return <div className="text-center py-20 text-gray-400 text-sm">Yuklanmoqda...</div>;

  const cards = [
    { icon: <FiBox />, label: 'Mahsulotlar', value: stats.totalProducts, color: 'text-primary-500 bg-primary-50' },
    { icon: <FiShoppingCart />, label: 'Buyurtmalar', value: stats.totalOrders, color: 'text-accent-500 bg-accent-50' },
    { icon: <FiUsers />, label: 'Foydalanuvchilar', value: stats.totalUsers, color: 'text-green-600 bg-green-50' },
    { icon: <FiDollarSign />, label: 'Daromad', value: formatPrice(stats.totalRevenue || 0), color: 'text-solar-600 bg-solar-50' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 ${c.color}`}>{c.icon}</div>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="font-display text-xl font-extrabold mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
