import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import SEO from '../../components/seo/SEO';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuth, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAuth) return <Navigate to={isAdmin ? '/admin' : '/'} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Xush kelibsiz, ${user.name}!`);
      navigate(user.role === 'ADMIN' ? '/admin' : '/', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Email yoki parol xato';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10";

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16">
      <SEO title="Kirish" />
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h1 className="font-display text-xl font-extrabold mb-1 text-center">Tizimga kirish</h1>
        <p className="text-xs text-gray-400 text-center mb-5">Admin: admin@nsb.uz / admin123</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@nsb.uz" required autoComplete="email" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Parol</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parolingiz" required autoComplete="current-password" className={inp} />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 disabled:opacity-50">
            {loading ? 'Yuklanmoqda...' : 'Kirish'}
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-3">
          {"Akkauntingiz yo'qmi? "}<Link to="/register" className="text-primary-500 font-bold">{"Ro'yxatdan o'tish"}</Link>
        </p>
      </div>
    </div>
  );
}
