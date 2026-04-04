import React from 'react';
import SEO from '../../components/seo/SEO';
import HeroSlider from '../../components/home/HeroSlider';
import CategoryGrid from '../../components/home/CategoryGrid';
import PopularProducts from '../../components/home/PopularProducts';
import PromoCountdown from '../../components/home/PromoCountdown';
import SolarSection from '../../components/home/SolarSection';
import ServicesPreview from '../../components/home/ServicesPreview';
import AboutStrip from '../../components/home/AboutStrip';
import BlogPreview from '../../components/home/BlogPreview';
import Newsletter from '../../components/home/Newsletter';
import BrandsMarquee from '../../components/home/BrandsMarquee';

export default function HomePage() {
  return (
    <>
      <SEO description="NSB.uz — kompyuter texnikasi va quyosh panellari" />
      <HeroSlider />
      <CategoryGrid />
      <PopularProducts />
      <PromoCountdown />
      <SolarSection />
      <ServicesPreview />
      <AboutStrip />
      <BlogPreview />
      <Newsletter />
      <BrandsMarquee />
    </>
  );
}
