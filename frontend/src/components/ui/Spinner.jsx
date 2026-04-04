import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[300px]" role="status">
      <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}
