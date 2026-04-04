import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminFormModal from '../../components/admin/AdminFormModal';
import FormInput from '../../components/admin/FormInput';
import ImageUpload from '../../components/admin/ImageUpload';

const EMPTY = { title: '', category: '', description: '', imageUrl: '', location: '', capacity: '', year: '' };
const CATS = ['solar', 'it', 'cctv'];

export default function AdminPortfolioPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => {
    adminService.getPortfolio({ page: 0, size: 100 })
      .then(({ data }) => setItems(data?.content || []))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (p) => { setForm({ ...EMPTY, ...p }); setModal('edit'); };

  const handleSave = async () => {
    try {
      if (modal === 'edit') await adminService.updatePortfolio(form.id, form);
      else await adminService.createPortfolio(form);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi');
      setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deletePortfolio(id); toast.success("O'chirildi"); load(); }
    catch { toast.error('Xatolik'); }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Portfolio</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Nomi</th><th className="px-4 py-3">Kategoriya</th><th className="px-4 py-3">Joylashuv</th><th className="px-4 py-3">Yil</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{items.map((p) => (
            <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{p.title}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.category}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.location}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.year}</td>
              <td className="px-4 py-3 text-center"><button onClick={() => openEdit(p)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <AdminFormModal title={modal === 'edit' ? 'Tahrirlash' : 'Yangi loyiha'} onClose={() => setModal(null)} onSubmit={handleSave}>
          <FormInput label="Nomi *" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategoriya</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500">
              <option value="">Tanlang...</option>
              {CATS.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormInput label="Joylashuv" value={form.location || ''} onChange={(e) => set('location', e.target.value)} />
            <FormInput label="Quvvat" value={form.capacity || ''} onChange={(e) => set('capacity', e.target.value)} />
          </div>
          <FormInput label="Yil" type="number" value={form.year || ''} onChange={(e) => set('year', e.target.value)} />
          <ImageUpload value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />
          <FormInput label="Tavsif" value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={3} />
        </AdminFormModal>
      )}
    </div>
  );
}
