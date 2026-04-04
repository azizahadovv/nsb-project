import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductCard from '../../components/ui/ProductCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import Pagination from '../../components/ui/Pagination';
import FilterSidebar from '../../components/product/FilterSidebar';
import productService from '../../services/productService';

const SORTS = [['popular','Ommabop'],['price_asc','Arzon→Qimmat'],['price_desc','Qimmat→Arzon'],['newest','Yangi'],['rating','Reyting']];

export default function CatalogPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const page = parseInt(searchParams.get('page') || '0', 10);
  const sort = searchParams.get('sort') || 'popular';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    const params = { page, size: 20, sort };
    const req = search ? productService.search(search, params) : slug ? productService.getByCategory(slug, params) : productService.getAll(params);
    req.then(({ data }) => { setProducts(data?.content || []); setTotalPages(data?.totalPages || 0); })
      .catch(() => setProducts([])).finally(() => setLoading(false));
  }, [slug, page, sort, search]);

  const setSort = (v) => { const p = new URLSearchParams(searchParams); p.set('sort', v); p.set('page', '0'); setSearchParams(p); };
  const setPage = (v) => { const p = new URLSearchParams(searchParams); p.set('page', String(v)); setSearchParams(p); };
  const title = search ? `"${search}" natijalari` : slug ? slug.replace(/-/g, ' ') : 'Barcha mahsulotlar';

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-5" id="main-content">
      <SEO title={title} description={`${title} — NSB.uz da eng arzon narxlarda`} />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: title }]} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold capitalize">{title}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilter(true)} className="lg:hidden flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg" aria-label="Filtrlar"><FiFilter /> Filtr</button>
          <div className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 pr-7 appearance-none bg-white focus:outline-none focus:border-primary-500" aria-label="Saralash">
              {SORTS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="hidden lg:block"><FilterSidebar filters={filters} onChange={setFilters} /></div>
        {showFilter && <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setShowFilter(false)} isMobile />}
        <div className="flex-1">
          {loading ? <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{[...Array(8)].map((_,i) => <SkeletonCard key={i} />)}</div>
          : products.length === 0 ? <div className="text-center py-16 text-gray-400"><p className="text-4xl mb-2">🔍</p><p className="font-bold">Mahsulot topilmadi</p></div>
          : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
