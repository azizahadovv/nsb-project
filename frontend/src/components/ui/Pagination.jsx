import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i);

  return (
    <nav className="flex justify-center gap-1.5 mt-8" aria-label="Sahifalar">
      <button onClick={() => onPageChange(Math.max(0, page - 1))} disabled={page === 0}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30" aria-label="Oldingi">
        <FiChevronLeft size={14} />
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${p === page ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400'}`}>
          {p + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30" aria-label="Keyingi">
        <FiChevronRight size={14} />
      </button>
    </nav>
  );
}
