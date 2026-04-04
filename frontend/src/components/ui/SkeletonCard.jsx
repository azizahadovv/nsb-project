import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="h-40 skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-3 skeleton w-20" />
        <div className="h-4 skeleton" />
        <div className="h-5 skeleton w-24" />
        <div className="h-7 skeleton rounded" />
      </div>
    </div>
  );
}
