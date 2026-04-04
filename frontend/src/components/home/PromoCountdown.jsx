import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';
import useCountdown from '../../hooks/useCountdown';

export default function PromoCountdown() {
  const target = new Date(Date.now() + 2 * 86400000 + 14 * 3600000).toISOString();
  const { days, hours, minutes, seconds } = useCountdown(target);
  const blocks = [{ v: days, l: 'Kun' }, { v: hours, l: 'Soat' }, { v: minutes, l: 'Daq' }, { v: seconds, l: 'Son' }];

  return (
    <section className="py-6" aria-label="Aksiya">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="bg-gradient-to-r from-accent-500 to-[#FF3D00] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="text-center md:text-left z-10">
            <h3 className="font-display text-lg sm:text-xl font-extrabold flex items-center gap-2 justify-center md:justify-start">
              <FiZap /> Noutbuklarga 30% gacha!
            </h3>
            <p className="text-xs opacity-75">Aksiya tugashiga:</p>
          </div>
          <div className="flex gap-2 z-10" role="timer" aria-label="Aksiya taymeri">
            {blocks.map((b, i) => (
              <div key={i} className="text-center bg-white/15 px-3 py-2 rounded-lg min-w-[48px]">
                <span className="font-display text-lg font-extrabold block">{String(b.v).padStart(2, '0')}</span>
                <span className="text-[9px] opacity-70">{b.l}</span>
              </div>
            ))}
          </div>
          <Link to="/catalog?sort=sale" className="bg-white text-accent-500 px-6 py-2.5 rounded-lg font-extrabold text-sm hover:-translate-y-0.5 transition-all z-10">
            Ko'rish
          </Link>
        </div>
      </div>
    </section>
  );
}
