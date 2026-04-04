import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../../components/seo/SEO';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';
import { formatPrice } from '../../helpers/formatters';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ customerName: '', customerPhone: '', customerEmail: '', deliveryAddress: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      await orderService.create({ ...form, items: items.map((i) => ({ productId: i.id, quantity: i.quantity })) });
      clearCart(); toast.success('Buyurtma qabul qilindi!'); navigate('/');
    } catch {} finally { setLoading(false); }
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEO title="Buyurtma berish" />
      <h1 className="font-display text-2xl font-extrabold mb-6">Buyurtma berish</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-bold text-sm">Ma'lumotlar</h3>
          <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Ismingiz *" required className={inp} />
          <input name="customerPhone" value={form.customerPhone} onChange={handleChange} placeholder="Telefon *" required className={inp} />
          <input name="customerEmail" value={form.customerEmail} onChange={handleChange} placeholder="Email" type="email" className={inp} />
          <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} placeholder="Manzil" className={inp} />
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Izoh" rows={3} className={inp + " resize-none"} />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 h-fit">
          <h3 className="font-bold text-sm mb-3">Buyurtma ({items.length})</h3>
          {items.map((it) => <div key={it.id} className="flex justify-between text-xs py-1.5 border-b border-gray-50"><span className="truncate flex-1">{it.name} x{it.quantity}</span><span className="font-bold ml-2">{formatPrice(it.price * it.quantity)}</span></div>)}
          <div className="flex justify-between font-bold text-sm mt-3"><span>Jami</span><span className="text-primary-500">{formatPrice(totalPrice)}</span></div>
          <button disabled={loading || items.length === 0} className="w-full mt-4 py-3 bg-primary-500 text-white rounded-lg font-bold text-sm hover:bg-primary-600 disabled:opacity-50">{loading ? 'Yuborilmoqda...' : 'Tasdiqlash'}</button>
        </div>
      </form>
    </div>
  );
}
