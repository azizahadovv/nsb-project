import React from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiFeather, FiShield, FiTrendingUp, FiSun } from 'react-icons/fi';
import { BsCalculator } from 'react-icons/bs';
import SectionHeader from '../ui/SectionHeader';

const FEATS = [
  { icon: <FiDollarSign />, title: '70% tejash', desc: 'Elektr xarajatlarini kamaytiring' },
  { icon: <FiFeather />, title: 'Ekologik', desc: 'CO2 chiqindilarini kamaytiring' },
  { icon: <FiShield />, title: '25 yil kafolat', desc: 'IEC/TUV sertifikat' },
  { icon: <FiTrendingUp />, title: 'Yashil tarif', desc: "Davlat qo'llab-quvvatlashi" },
];

export default function SolarSection() {
  return (
    <section className="py-10 bg-gradient-to-b from-[#FFFBF0] to-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        
        <SectionHeader 
          icon={<FiSun />} 
          iconBg="bg-solar-50 text-solar-600" 
          title="Quyosh energiyasiga o'ting" 
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {FEATS.map((f, i) => (
            <div 
              key={i}
              className="bg-white border border-solar-100 rounded-xl p-4 text-center hover:border-solar-400 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-solar-50 text-solar-600 flex items-center justify-center text-lg mx-auto mb-2">
                {f.icon}
              </div>

              <h4 className="text-sm font-bold">
                {f.title}
              </h4>

              <p className="text-xs text-gray-500">
                {f.desc}
              </p>

            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-col sm:flex-row">

          <Link 
            to="/solar-calculator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-solar-500 text-dark rounded-lg font-bold text-sm hover:bg-solar-600 transition"
          >
            <BsCalculator />
            Hisoblang
          </Link>

          <Link 
            to="/solar-request"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 transition"
          >
            Bepul o'lchov
          </Link>

        </div>

      </div>
    </section>
  );
}