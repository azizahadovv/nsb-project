import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../../components/seo/SEO';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const { register, isAuth } = useAuth();
  const navigate = useNavigate();
  if (isAuth) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await register(form); toast.success('Muvaffaqiyatli!'); navigate('/'); }
    catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
    finally { setLoading(false); }
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10";

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16">
      <SEO title="Ro'yxatdan o'tish" />
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h1 className="font-display text-xl font-extrabold mb-5 text-center">Ro'yxatdan o'tish</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ismingiz *" required className={inp} />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inp} />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon" className={inp} />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Parol (6+ belgi) *" required minLength={6} className={inp} />
          <button disabled={loading} className="w-full py-2.5 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 disabled:opacity-50">{loading ? '...' : "Ro'yxatdan o'tish"}</button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-3">Akkauntingiz bormi? <Link to="/login" className="text-primary-500 font-bold">Kirish</Link></p>
      </div>
    </div>
  );
}
