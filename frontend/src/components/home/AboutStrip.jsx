import React from 'react';
import { FiUsers, FiSun, FiAward, FiClock } from 'react-icons/fi';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const STATS = [
  { n: 5000, s: '+', label: 'Mijozlar', color: 'text-primary-500', icon: <FiUsers /> },
  { n: 200, s: '+', label: 'Quyosh loyiha', color: 'text-solar-600', icon: <FiSun /> },
  { n: 50, s: '+', label: 'Brendlar', color: 'text-primary-500', icon: <FiAward /> },
  { n: 7, s: '', label: 'Yil tajriba', color: 'text-primary-500', icon: <FiClock /> },
];

export default function AboutStrip() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <section className="py-10 bg-white" ref={ref} aria-label="Biz haqimizda">
      <div className="max-w-[1280px] mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-2xl font-extrabold mb-3">NSB Corporation</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {"O'zbekistondagi yetakchi IT va quyosh energetikasi kompaniyasi. 2018 yildan beri 5000+ mijozlarga xizmat."}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {STATS.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className={`flex items-center justify-center gap-1 ${s.color}`}>
                  {s.icon}
                  <span className="font-display text-2xl font-extrabold">
                    {inView ? <CountUp end={s.n} duration={2.5} /> : 0}{s.s}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 aspect-[4/3] flex items-center justify-center">
          <div className="text-center">
            <FiAward className="mx-auto text-primary-300" size={64} />
            <p className="text-sm text-gray-400 mt-2 font-semibold">Kompaniya rasmi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
