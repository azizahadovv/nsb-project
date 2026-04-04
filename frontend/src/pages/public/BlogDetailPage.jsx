import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { ArticleSchema } from '../../components/seo/StructuredData';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Spinner from '../../components/ui/Spinner';
import blogService from '../../services/blogService';
import { formatDate } from '../../helpers/formatters';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    blogService.getBySlug(slug).then(({ data }) => setPost(data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner />;
  if (!post) return <div className="max-w-[1280px] mx-auto px-4 py-20 text-center text-gray-400"><p className="font-bold">Maqola topilmadi</p></div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-6">
      <SEO title={post.seoTitle || post.title} description={post.seoDescription || post.shortDescription} />
      <ArticleSchema article={post} />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />
      <time className="text-xs text-gray-400">{formatDate(post.createdAt)}</time>
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold mt-1 mb-4">{post.title}</h1>
      {post.author && <p className="text-sm text-gray-500 mb-6">Muallif: {post.author}</p>}
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full rounded-xl mb-6 object-cover max-h-80" />}
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content || post.shortDescription }} />
    </article>
  );
}
