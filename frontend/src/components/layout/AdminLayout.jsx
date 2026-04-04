import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiFileText, FiGrid, FiTag, FiTool, FiBriefcase, FiImage, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

const NAV = [
  { to: '/admin', icon: <FiHome />, label: 'Dashboard' },
  { to: '/admin/products', icon: <FiBox />, label: 'Mahsulotlar' },
  { to: '/admin/orders', icon: <FiShoppingCart />, label: 'Buyurtmalar' },
  { to: '/admin/categories', icon: <FiGrid />, label: 'Kategoriyalar' },
  { to: '/admin/brands', icon: <FiTag />, label: 'Brendlar' },
  { to: '/admin/users', icon: <FiUsers />, label: 'Foydalanuvchilar' },
  { to: '/admin/blogs', icon: <FiFileText />, label: 'Blog' },
  { to: '/admin/services', icon: <FiTool />, label: 'Xizmatlar' },
  { to: '/admin/portfolio', icon: <FiBriefcase />, label: 'Portfolio' },
  { to: '/admin/banners', icon: <FiImage />, label: 'Bannerlar' },
];

function isActive(to, path) { return to === '/admin' ? path === '/admin' : path.startsWith(to); }

export default function AdminLayout() {
  const { user, isAdmin, loading, logout } = useAuth();
  const { pathname } = useLocation();
  if (loading) return <Spinner />;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-52 bg-dark text-gray-400 p-3 flex flex-col shrink-0" role="navigation">
        <Link to="/admin" className="font-display font-extrabold text-base text-white mb-5 px-2">NSB <span className="text-accent-500">Admin</span></Link>
        <nav className="flex-1 space-y-0.5">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive(n.to, pathname) ? 'bg-primary-500 text-white' : 'hover:bg-white/5 hover:text-white'}`}>{n.icon}{n.label}</Link>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-2 mt-2">
          <p className="text-[10px] text-gray-500 px-2 mb-1 truncate">{user.name}</p>
          <button onClick={logout} className="flex items-center gap-2 px-2.5 py-2 text-xs text-gray-500 hover:text-red-400 w-full"><FiLogOut /> Chiqish</button>
        </div>
      </aside>
      <main className="flex-1 p-5 overflow-auto"><Outlet /></main>
    </div>
  );
}
