import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaInstagram, FaFacebookF } from 'react-icons/fa';
import toast from 'react-hot-toast';
import publicService from '../../services/publicService';

const LINKS = [
  { title: 'Katalog', items: [['Noutbuklar','/catalog/laptops'],['Printerlar','/catalog/printers'],['CCTV','/catalog/cctv'],['Quyosh','/catalog/solar-panels']] },
  { title: "Ma'lumot", items: [['Biz haqimizda','/about'],['Yetkazish','/delivery'],['Kafolat','/warranty'],['Aloqa','/contact']] },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try { await publicService.subscribe(email); toast.success('Obuna muvaffaqiyatli!'); setEmail(''); }
    catch {}
  };

  return (
    <footer className="bg-dark text-gray-400 pt-10" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-display font-extrabold text-xl text-white block mb-2" aria-label="Bosh sahifa">NSB<span className="text-accent-500">.uz</span></Link>
            <p className="text-xs leading-relaxed mb-3">Kompyuter texnikasi va quyosh energetikasi. 2018 yildan beri.</p>
            <div className="flex gap-2">{[FaTelegramPlane,FaInstagram,FaFacebookF].map((Icon,i) => <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all" aria-label="Ijtimoiy tarmoq"><Icon /></a>)}</div>
          </div>
          {LINKS.map((col) => <div key={col.title}><h5 className="text-white font-bold text-sm mb-3">{col.title}</h5><ul className="space-y-1.5">{col.items.map(([n,to]) => <li key={to}><Link to={to} className="text-xs hover:text-white transition-colors">{n}</Link></li>)}</ul></div>)}
          <div>
            <h5 className="text-white font-bold text-sm mb-3">Yangiliklar</h5>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary-500" aria-label="Email uchun obuna" />
              <button className="w-full py-2 rounded-lg bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-colors">Obuna</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px]">
          <span>&copy; {new Date().getFullYear()} NSB.uz — Barcha huquqlar himoyalangan</span>
          <div className="flex gap-1.5">{['Click','Payme','Uzum','Visa'].map((p) => <span key={p} className="bg-white/5 px-2 py-0.5 rounded font-bold">{p}</span>)}</div>
        </div>
      </div>
    </footer>
  );
}
