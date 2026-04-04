import React from 'react';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AboutStrip from '../../components/home/AboutStrip';

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4 pt-6"><SEO title="Biz haqimizda" /><Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Biz haqimizda' }]} /></div>
      <AboutStrip />
    </div>
  );
}
