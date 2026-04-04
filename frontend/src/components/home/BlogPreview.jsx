import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import blogService from '../../services/blogService';
import { formatDate } from '../../helpers/formatters';

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { blogService.getAll({ page: 0, size: 3 }).then(({ data }) => setPosts(data?.content || [])).catch(() => {}); }, []);
  if (posts.length === 0) return null;

  return (
    <section className="py-8"><div className="max-w-[1280px] mx-auto px-4">
      <SectionHeader icon="📰" iconBg="bg-blue-100 text-blue-500" title="Blog va yangiliklar" link="/blog" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Link key={p.id} to={`/blog/${p.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="h-36 bg-gray-100 flex items-center justify-center text-3xl text-gray-300">📝</div>
            <div className="p-4">
              <time className="text-[10px] text-gray-400">{formatDate(p.createdAt)}</time>
              <h4 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-primary-500">{p.title}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div></section>
  );
}
