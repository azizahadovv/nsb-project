import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';
import blogService from '../../services/blogService';
import { formatDate } from '../../helpers/formatters';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    blogService.getAll({ page, size: 9 }).then(({ data }) => {
      setPosts(data?.content || []); setTotalPages(data?.totalPages || 0);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <SEO title="Blog" description="NSB.uz blog — texnologiya va quyosh energiyasi yangiliklari" />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Blog' }]} />
      <h1 className="font-display text-2xl font-extrabold mb-6">Blog va yangiliklar</h1>
      {loading ? <Spinner /> : posts.length === 0 ? (
        <p className="text-center text-gray-400 py-16">Hali maqola yo'q</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="h-40 bg-gray-100 flex items-center justify-center">{p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" /> : <span className="text-3xl text-gray-300">📝</span>}</div>
              <div className="p-4">
                <time className="text-[10px] text-gray-400">{formatDate(p.createdAt)}</time>
                <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-primary-500">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
