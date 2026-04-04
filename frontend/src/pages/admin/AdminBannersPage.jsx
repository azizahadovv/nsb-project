import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminFormModal from '../../components/admin/AdminFormModal';
import FormInput from '../../components/admin/FormInput';
import ImageUpload from '../../components/admin/ImageUpload';

const EMPTY = { title: '', subtitle: '', imageUrl: '', linkUrl: '', buttonText: '', sortOrder: 0, isActive: true };

export default function AdminBannersPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => {
    adminService.getBanners()
      .then(({ data }) => setItems(data || []))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (b) => { setForm({ ...EMPTY, ...b }); setModal('edit'); };

  const handleSave = async () => {
    try {
      if (modal === 'edit') await adminService.updateBanner(form.id, form);
      else await adminService.createBanner(form);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi');
      setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deleteBanner(id); toast.success("O'chirildi"); load(); }
    catch { toast.error('Xatolik'); }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Bannerlar</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Sarlavha</th><th className="px-4 py-3">Link</th><th className="px-4 py-3 text-center">Aktiv</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{items.map((b) => (
            <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{b.title}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{b.linkUrl}</td>
              <td className="px-4 py-3 text-center">{b.isActive ? <span className="text-green-600 text-xs font-bold">Ha</span> : <span className="text-gray-400 text-xs">Yoq</span>}</td>
              <td className="px-4 py-3 text-center"><button onClick={() => openEdit(b)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <AdminFormModal title={modal === 'edit' ? 'Tahrirlash' : 'Yangi banner'} onClose={() => setModal(null)} onSubmit={handleSave}>
          <FormInput label="Sarlavha" value={form.title || ''} onChange={(e) => set('title', e.target.value)} />
          <FormInput label="Subtitle" value={form.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} />
          <FormInput label="Link URL" value={form.linkUrl || ''} onChange={(e) => set('linkUrl', e.target.value)} />
          <FormInput label="Tugma matni" value={form.buttonText || ''} onChange={(e) => set('buttonText', e.target.value)} />
          <ImageUpload value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />
          <FormInput label="Tartib" type="number" value={form.sortOrder || 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.isActive !== false} onChange={(e) => set('isActive', e.target.checked)} className="w-4 h-4 rounded" /> Aktiv</label>
        </AdminFormModal>
      )}
    </div>
  );
}
