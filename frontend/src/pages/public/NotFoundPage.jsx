import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';

export default function NotFoundPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
      <SEO title="404" />
      <h1 className="font-display text-8xl font-extrabold text-gray-200 mb-3">404</h1>
      <p className="text-lg font-bold text-gray-600 mb-2">Sahifa topilmadi</p>
      <Link to="/" className="inline-flex px-5 py-2 bg-primary-500 text-white rounded-lg font-bold text-sm mt-3">Bosh sahifa</Link>
    </div>
  );
}
