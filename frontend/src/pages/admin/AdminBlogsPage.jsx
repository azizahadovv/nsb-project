import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminFormModal from '../../components/admin/AdminFormModal';
import FormInput from '../../components/admin/FormInput';
import ImageUpload from '../../components/admin/ImageUpload';
import { formatDate } from '../../helpers/formatters';

const EMPTY = { title: '', shortDescription: '', content: '', imageUrl: '', author: '', seoTitle: '', seoDescription: '', published: true };

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => {
    adminService.getBlogs({ page: 0, size: 100 })
      .then(({ data }) => setBlogs(data?.content || []))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (b) => { setForm({ ...EMPTY, ...b }); setModal('edit'); };

  const handleSave = async () => {
    try {
      if (modal === 'edit') await adminService.updateBlog(form.id, form);
      else await adminService.createBlog(form);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi');
      setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deleteBlog(id); toast.success("O'chirildi"); load(); }
    catch { toast.error('Xatolik'); }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Blog</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Sarlavha</th><th className="px-4 py-3 text-center">Status</th><th className="px-4 py-3 text-left">Sana</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{blogs.map((b) => (
            <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{b.title}</td>
              <td className="px-4 py-3 text-center">{b.published ? <span className="text-green-600 text-xs font-bold">Chop</span> : <span className="text-gray-400 text-xs">Qoralama</span>}</td>
              <td className="px-4 py-3 text-xs text-gray-500">{formatDate(b.createdAt)}</td>
              <td className="px-4 py-3 text-center"><button onClick={() => openEdit(b)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && (
        <AdminFormModal title={modal === 'edit' ? 'Tahrirlash' : 'Yangi maqola'} onClose={() => setModal(null)} onSubmit={handleSave}>
          <FormInput label="Sarlavha *" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <FormInput label="Muallif" value={form.author || ''} onChange={(e) => set('author', e.target.value)} />
          <FormInput label="Qisqa tavsif" value={form.shortDescription || ''} onChange={(e) => set('shortDescription', e.target.value)} rows={2} />
          <FormInput label="Kontent" value={form.content || ''} onChange={(e) => set('content', e.target.value)} rows={5} />
          <ImageUpload value={form.imageUrl} onChange={(v) => set('imageUrl', v)} />
          <FormInput label="SEO Title" value={form.seoTitle || ''} onChange={(e) => set('seoTitle', e.target.value)} />
          <FormInput label="SEO Description" value={form.seoDescription || ''} onChange={(e) => set('seoDescription', e.target.value)} rows={2} />
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 rounded" /> Chop etish</label>
        </AdminFormModal>
      )}
    </div>
  );
}
