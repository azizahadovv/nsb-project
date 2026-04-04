import React, { useState } from 'react';
import toast from 'react-hot-toast';
import publicService from '../../services/publicService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try { await publicService.subscribe(email); toast.success('Obuna muvaffaqiyatli!'); setEmail(''); }
    catch {} finally { setLoading(false); }
  };

  return (
    <section className="py-8"><div className="max-w-[1280px] mx-auto px-4">
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-5 text-white relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-60 h-60 bg-white/5 rounded-full" />
        <div className="z-10 text-center md:text-left"><h3 className="font-display text-lg font-extrabold mb-1">Yangiliklardan xabardor bo'ling</h3><p className="text-xs opacity-65">Aksiya va yangiliklar haqida birinchi biling</p></div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 z-10 w-full sm:w-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
            className="px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder:text-white/50 text-sm w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-white/30" aria-label="Email" />
          <button disabled={loading} className="px-5 py-2.5 rounded-lg bg-solar-500 text-dark font-bold text-sm hover:bg-solar-600 disabled:opacity-50">{loading ? '...' : "Obuna"}</button>
        </form>
      </div>
    </div></section>
  );
}
