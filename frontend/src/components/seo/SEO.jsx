import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image, type = 'website' }) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} — NSB.uz` : 'NSB.uz — Kompyuter texnikasi va quyosh panellari';
  const canonical = `https://nsb.uz${pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'NSB.uz — IT yechimlar va quyosh energetikasi'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
