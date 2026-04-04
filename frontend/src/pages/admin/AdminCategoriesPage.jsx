import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminFormModal from '../../components/admin/AdminFormModal';
import FormInput from '../../components/admin/FormInput';

const EMPTY = { name: '', iconUrl: '', description: '', sortOrder: 0 };

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => {
    adminService.getCategories()
      .then(({ data }) => setCats(data || []))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (c) => { setForm({ ...EMPTY, ...c }); setModal('edit'); };

  const handleSave = async () => {
    try {
      if (modal === 'edit') await adminService.updateCategory(form.id, form);
      else await adminService.createCategory(form);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi');
      setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deleteCategory(id); toast.success("O'chirildi"); load(); }
    catch { toast.error('Xatolik'); }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Kategoriyalar</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Nomi</th><th className="px-4 py-3 text-left">Slug</th><th className="px-4 py-3 text-center">Icon</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{cats.map((c) => (
            <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{c.name}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{c.slug}</td>
              <td className="px-4 py-3 text-center">{c.iconUrl}</td>
              <td className="px-4 py-3 text-center"><button onClick={() => openEdit(c)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <AdminFormModal title={modal === 'edit' ? 'Tahrirlash' : 'Yangi kategoriya'} onClose={() => setModal(null)} onSubmit={handleSave}>
          <FormInput label="Nomi *" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          <FormInput label="Icon URL yoki emoji" value={form.iconUrl || ''} onChange={(e) => set('iconUrl', e.target.value)} />
          <FormInput label="Tavsif" value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} />
          <FormInput label="Tartib raqami" type="number" value={form.sortOrder || 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
        </AdminFormModal>
      )}
    </div>
  );
}
