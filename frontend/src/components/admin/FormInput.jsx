import React from 'react';

export default function FormInput({ label, type = 'text', value, onChange, required, placeholder, rows }) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500";
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {rows ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} required={required} className={cls + " resize-none"} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={cls} />
      )}
    </div>
  );
}
