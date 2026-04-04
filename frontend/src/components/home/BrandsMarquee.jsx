import React from 'react';

const BRANDS = ['ASUS','HP','DELL','Lenovo','LONGi','Hikvision','Huawei','JA Solar','Growatt','NVIDIA','AMD','Intel'];

export default function BrandsMarquee() {
  return (
    <section className="py-6 bg-white border-t border-gray-100" aria-label="Brendlar">
      <div className="max-w-[1280px] mx-auto px-4 mb-3"><h3 className="text-sm font-bold text-gray-400">Brendlar</h3></div>
      <div className="marquee-mask overflow-hidden">
        <div className="flex gap-10 items-center animate-marquee">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="text-lg font-extrabold text-gray-300 whitespace-nowrap shrink-0 hover:text-gray-500 transition-colors select-none">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
