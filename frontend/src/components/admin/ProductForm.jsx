import React from 'react';
import AdminFormModal from './AdminFormModal';
import FormInput from './FormInput';
import ImageUpload from './ImageUpload';

export default function ProductForm({ form, set, categories, brands, modal, onClose, onSubmit }) {
  return (
    <AdminFormModal title={modal === 'edit' ? 'Mahsulot tahrirlash' : 'Yangi mahsulot'} onClose={onClose} onSubmit={onSubmit}>
      <FormInput label="Nomi *" value={form.name} onChange={(e) => set('name', e.target.value)} required />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Kategoriya *</label>
          <select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)} required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500">
            <option value="">Tanlang...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Brend</label>
          <select value={form.brandId || ''} onChange={(e) => set('brandId', e.target.value || null)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500">
            <option value="">Tanlang...</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormInput label="Narx *" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} required />
        <FormInput label="Eski narx" type="number" value={form.oldPrice || ''} onChange={(e) => set('oldPrice', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormInput label="Muddatli narx" type="number" value={form.installmentPrice || ''} onChange={(e) => set('installmentPrice', e.target.value)} />
        <FormInput label="Ombor" type="number" value={form.stock || ''} onChange={(e) => set('stock', e.target.value)} />
      </div>
      <FormInput label="Badge" value={form.badge || ''} onChange={(e) => set('badge', e.target.value)} placeholder="HIT, YANGI, -25%" />
      <ImageUpload value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />
      <FormInput label="Tavsif" value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={3} />
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={form.isSolar || false} onChange={(e) => set('isSolar', e.target.checked)} className="w-4 h-4 rounded" /> Quyosh mahsuloti
      </label>
    </AdminFormModal>
  );
}
