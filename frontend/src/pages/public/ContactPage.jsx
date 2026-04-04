import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <SEO title="Aloqa" />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Aloqa' }]} />
      <h1 className="font-display text-2xl font-extrabold mb-6">Aloqa</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-3"><FiPhone className="text-primary-500 shrink-0" /><div><p className="text-[10px] text-gray-400">Telefon</p><a href="tel:+998901234567" className="font-bold text-sm">+998 90 123 45 67</a></div></div>
          <div className="flex items-center gap-3"><FiMail className="text-primary-500 shrink-0" /><div><p className="text-[10px] text-gray-400">Email</p><a href="mailto:info@nsb.uz" className="font-bold text-sm">info@nsb.uz</a></div></div>
          <div className="flex items-center gap-3"><FiMapPin className="text-primary-500 shrink-0" /><div><p className="text-[10px] text-gray-400">Manzil</p><p className="font-bold text-sm">Toshkent, Chilonzor 9</p></div></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-bold text-sm mb-3">Xabar yuborish</h3>
          <form className="space-y-3">
            <input placeholder="Ism *" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500" />
            <input placeholder="Telefon *" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500" />
            <textarea placeholder="Xabar" rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-primary-500" />
            <button className="w-full py-2.5 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600">Yuborish</button>
          </form>
        </div>
      </div>
    </div>
  );
}
