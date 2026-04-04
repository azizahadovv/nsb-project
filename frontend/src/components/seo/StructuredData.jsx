import React from 'react';
import { Helmet } from 'react-helmet-async';

export function ProductSchema({ product }) {
  if (!product) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image: product.imageUrl,
    sku: product.slug,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "UZS",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    } : undefined,
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export function ArticleSchema({ article }) {
  if (!article) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.shortDescription,
    image: article.imageUrl,
    author: { "@type": "Person", name: article.author || "NSB Team" },
    datePublished: article.createdAt,
    publisher: { "@type": "Organization", name: "NSB.uz" },
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}
