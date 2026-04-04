import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import ProductForm from '../../components/admin/ProductForm';
import { formatPrice } from '../../helpers/formatters';

const EMPTY = { name: '', categoryId: '', brandId: '', price: '', oldPrice: '', installmentPrice: '', badge: '', description: '', imageUrl: '', stock: '', isSolar: false };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => {
    Promise.all([adminService.getProducts({ page: 0, size: 100 }), adminService.getCategories(), adminService.getBrands()])
      .then(([p, c, b]) => { setProducts(p.data?.content || []); setCategories(c.data || []); setBrands(b.data || []); }).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const openNew = () => { setForm(EMPTY); setModal('new'); };
  const openEdit = (p) => { setForm({ ...EMPTY, ...p, categoryId: p.categoryId || '', brandId: p.brandId || '' }); setModal('edit'); };

  const handleSave = async () => {
    try {
      const d = { ...form, price: Number(form.price) || 0, oldPrice: form.oldPrice ? Number(form.oldPrice) : null, installmentPrice: form.installmentPrice ? Number(form.installmentPrice) : null, stock: form.stock ? Number(form.stock) : 0, categoryId: Number(form.categoryId), brandId: form.brandId ? Number(form.brandId) : null };
      if (modal === 'edit') await adminService.updateProduct(form.id, d);
      else await adminService.createProduct(d);
      toast.success(modal === 'edit' ? 'Yangilandi' : 'Yaratildi'); setModal(null); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Xatolik'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
    try { await adminService.deleteProduct(id); toast.success("O'chirildi"); load(); } catch { toast.error('Xatolik'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-display text-2xl font-extrabold">Mahsulotlar</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold hover:bg-primary-600"><FiPlus /> Yangi</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Nomi</th><th className="px-4 py-3">Kategoriya</th><th className="px-4 py-3">Brend</th><th className="px-4 py-3 text-right">Narx</th><th className="px-4 py-3 text-center">Ombor</th><th className="px-4 py-3 w-24">Amal</th></tr></thead>
          <tbody>{products.map((p) => (
            <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{p.name}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.categoryName || '-'}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{p.brandName || '-'}</td>
              <td className="px-4 py-3 text-right font-bold">{formatPrice(p.price)}</td>
              <td className="px-4 py-3 text-center">{p.stock}</td>
              <td className="px-4 py-3 text-right"><button onClick={() => openEdit(p)} className="text-gray-400 hover:text-primary-500 mr-2"><FiEdit size={14} /></button><button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {modal && <ProductForm form={form} set={set} categories={categories} brands={brands} modal={modal} onClose={() => setModal(null)} onSubmit={handleSave} />}
    </div>
  );
}
