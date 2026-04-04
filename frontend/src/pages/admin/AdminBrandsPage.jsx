import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminFormModal from '../../components/admin/AdminFormModal';
import FormInput from '../../components/admin/FormInput';
import ImageUpload from '../../components/admin/ImageUpload';

const EMPTY = { name: '', logoUrl: '', sortOrder: 0 };

export default function AdminBrandsPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => { adminService.getBrands().then(({ data }) => setItems(data || [])).catch(() => {}); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (b) => { setForm({ ...EMPTY, ...b }); setModal('edit'); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    try {
      if (modal === 'edit') await adminService.updateBrand(form.id, form);
      else await adminService.createBrand(form);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi');
      setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deleteBrand(id); toast.success("O'chirildi"); load(); }
    catch { toast.error('Xatolik'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Brendlar</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Nomi</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Logo</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{items.map((b) => (
            <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{b.name}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{b.slug}</td>
              <td className="px-4 py-3">{b.logoUrl && <img src={b.logoUrl} alt={b.name} className="h-6 object-contain" />}</td>
              <td className="px-4 py-3 text-center"><button onClick={() => openEdit(b)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <AdminFormModal title={modal === 'edit' ? 'Tahrirlash' : 'Yangi brend'} onClose={() => setModal(null)} onSubmit={handleSave}>
          <FormInput label="Nomi *" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          <ImageUpload value={form.logoUrl} onChange={(v) => set('logoUrl', v)} />
          <FormInput label="Tartib" type="number" value={form.sortOrder || 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
        </AdminFormModal>
      )}
    </div>
  );
}
