import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../helpers/formatters';
import orderService from '../../services/orderService';

export default function AccountPage() {
  const { user, isAuth, loading, logout } = useAuth();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isAuth) orderService.getMyOrders({ page: 0, size: 20 }).then(({ data }) => setOrders(data?.content || [])).catch(() => {});
  }, [isAuth]);

  if (loading) return null;
  if (!isAuth) return <Navigate to="/login" replace />;

  const STATUSES = { NEW: 'Yangi', CONFIRMED: 'Tasdiqlangan', PROCESSING: 'Tayyorlanmoqda', SHIPPED: 'Yuborildi', DELIVERED: 'Yetkazildi', CANCELLED: 'Bekor' };
  const STATUS_CLS = { NEW: 'bg-blue-100 text-blue-700', CONFIRMED: 'bg-yellow-100 text-yellow-700', DELIVERED: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700' };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <SEO title="Shaxsiy kabinet" />
      <h1 className="font-display text-2xl font-extrabold mb-5">Shaxsiy kabinet</h1>
      <div className="grid lg:grid-cols-[240px_1fr] gap-5">
        <aside className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 font-bold text-sm">{user.name?.charAt(0)}</div>
            <div><p className="text-sm font-bold">{user.name}</p><p className="text-[10px] text-gray-400">{user.email}</p></div>
          </div>
          <nav className="space-y-1" aria-label="Kabinet menyusi">
            <button onClick={() => setTab('orders')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === 'orders' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}><FiShoppingBag /> Buyurtmalarim</button>
            <button onClick={() => setTab('profile')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === 'profile' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}><FiUser /> Profilim</button>
            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"><FiLogOut /> Chiqish</button>
          </nav>
        </aside>
        <div>
          {tab === 'orders' && (
            <div>
              <h2 className="font-bold text-lg mb-3">Buyurtmalarim</h2>
              {orders.length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-gray-400"><p className="font-bold mb-2">Buyurtmalar yo'q</p><Link to="/catalog" className="text-primary-500 text-sm font-bold">Xarid qilish</Link></div>
              : <div className="space-y-3">{orders.map((o) => (
                <div key={o.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">#{o.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_CLS[o.status] || 'bg-gray-100 text-gray-600'}`}>{STATUSES[o.status] || o.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500"><span>{formatDate(o.createdAt)}</span><span className="font-bold text-dark">{formatPrice(o.totalAmount)}</span></div>
                  {o.items && <div className="mt-2 pt-2 border-t border-gray-50">{o.items.map((it,i) => <p key={i} className="text-[10px] text-gray-500">{it.productName} x{it.quantity}</p>)}</div>}
                </div>
              ))}</div>}
            </div>
          )}
          {tab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-bold text-lg mb-4">Profil ma'lumotlari</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><p className="text-[10px] text-gray-400 mb-0.5">Ism</p><p className="text-sm font-semibold">{user.name}</p></div>
                <div><p className="text-[10px] text-gray-400 mb-0.5">Email</p><p className="text-sm font-semibold">{user.email}</p></div>
                <div><p className="text-[10px] text-gray-400 mb-0.5">Telefon</p><p className="text-sm font-semibold">{user.phone || '—'}</p></div>
                <div><p className="text-[10px] text-gray-400 mb-0.5">Rol</p><p className="text-sm font-semibold">{user.role}</p></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
