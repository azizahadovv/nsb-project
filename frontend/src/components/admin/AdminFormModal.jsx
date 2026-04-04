import React from 'react';
import { FiX } from 'react-icons/fi';

export default function AdminFormModal({ title, onClose, onSubmit, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-extrabold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Yopish"><FiX size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="p-5 space-y-3">
          {children}
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-bold hover:bg-primary-600">Saqlash</button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Bekor</button>
          </div>
        </form>
      </div>
    </div>
  );
}
