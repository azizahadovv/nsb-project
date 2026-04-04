import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import publicService from '../../services/publicService';

const FALLBACK = [
  { title: 'Gaming Kompyuterlar', subtitle: 'RTX 4070 + Ryzen 7 bilan', buttonText: 'Batafsil', linkUrl: '/catalog/gaming-pcs', bg: 'from-[#0a1628] to-[#0f2a52]' },
  { title: 'Quyosh Panellari', subtitle: '25 yil kafolat, bepul konsultatsiya', buttonText: 'Kalkulyator', linkUrl: '/solar-calculator', bg: 'from-[#1a3a0a] to-[#2d5a14]' },
  { title: 'Noutbuklar -30%', subtitle: "Muddatli to'lov mavjud", buttonText: 'Xarid', linkUrl: '/catalog/laptops', bg: 'from-[#1a1040] to-[#3b2080]' },
];

export default function HeroSlider() {
  const [banners, setBanners] = useState(FALLBACK);

  useEffect(() => {
    publicService.getBanners()
      .then(({ data }) => {
        if (data && data.length > 0) setBanners(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-4" aria-label="Asosiy banner">
      <div className="max-w-[1280px] mx-auto px-4">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop className="rounded-2xl overflow-hidden aspect-[16/7] min-h-[220px]">
          {banners.map((s, i) => (
            <SwiperSlide key={i}>
              <div className={`h-full flex items-center p-6 sm:p-10 ${s.imageUrl ? '' : `bg-gradient-to-br ${s.bg || 'from-[#0a1628] to-[#0f2a52]'}`}`}
                style={s.imageUrl ? { backgroundImage: `url(${s.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
                <div className="max-w-[60%] relative z-10">
                  <h2 className="font-display text-xl sm:text-3xl font-extrabold text-white mb-1">{s.title}</h2>
                  <p className="text-white/60 text-xs sm:text-sm mb-4">{s.subtitle}</p>
                  {s.linkUrl && (
                    <Link to={s.linkUrl} className="inline-flex px-5 py-2 bg-white text-dark rounded-lg font-bold text-sm hover:-translate-y-0.5 transition-all">
                      {s.buttonText || "Ko'rish"}
                    </Link>
                  )}
                </div>
                {s.imageUrl && <div className="absolute inset-0 bg-black/40 rounded-2xl" />}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
