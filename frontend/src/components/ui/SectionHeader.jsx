import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function SectionHeader({ icon, iconBg, title, link, linkText = "Barchasi" }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-display text-xl sm:text-2xl font-extrabold flex items-center gap-3">
        {icon && (
          <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${iconBg || 'bg-primary-100 text-primary-500'}`}>
            {icon}
          </span>
        )}
        {title}
      </h2>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-primary-500 text-sm font-bold hover:gap-2 transition-all">
          {linkText} <FiChevronRight />
        </Link>
      )}
    </div>
  );
}
