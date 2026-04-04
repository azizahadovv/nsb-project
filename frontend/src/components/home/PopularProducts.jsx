import React, { useState, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import ProductCard from '../ui/ProductCard';
import SkeletonCard from '../ui/SkeletonCard';
import productService from '../../services/productService';
import { DEMO_PRODUCTS } from '../../utils/constants';

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getPopular({ page: 0, size: 10 })
      .then(({ data }) => setProducts(data?.content?.length ? data.content : DEMO_PRODUCTS))
      .catch(() => setProducts(DEMO_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-4 pb-8" aria-label="Eng ko'p sotilganlar">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader icon={<FiTrendingUp />} iconBg="bg-red-100 text-red-500" title="Eng ko'p sotilganlar" link="/catalog?sort=popular" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {loading ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />) : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
