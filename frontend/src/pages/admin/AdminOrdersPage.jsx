import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import { formatPrice, formatDate } from '../../helpers/formatters';

const STATUSES = ['NEW', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const STATUS_CLS = { NEW: 'bg-blue-100 text-blue-700', CONFIRMED: 'bg-yellow-100 text-yellow-700', PROCESSING: 'bg-purple-100 text-purple-700', SHIPPED: 'bg-indigo-100 text-indigo-700', DELIVERED: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700' };

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminService.getOrders({ page: 0, size: 50 })
      .then(({ data }) => setOrders(data?.content || []))
      .catch(() => {});
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await adminService.updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
      toast.success('Status yangilandi');
    } catch { toast.error('Xatolik'); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-5">Buyurtmalar</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs">
            <th className="px-4 py-3 text-left">#</th><th className="px-4 py-3 text-left">Mijoz</th>
            <th className="px-4 py-3 text-right">Summa</th><th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-left">Sana</th><th className="px-4 py-3">Amal</th>
          </tr></thead>
          <tbody>{orders.map((o) => (
            <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-bold">#{o.id}</td>
              <td className="px-4 py-3"><p className="font-semibold">{o.customerName}</p><p className="text-xs text-gray-400">{o.customerPhone}</p></td>
              <td className="px-4 py-3 text-right font-bold">{formatPrice(o.totalAmount)}</td>
              <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_CLS[o.status] || ''}`}>{o.status}</span></td>
              <td className="px-4 py-3 text-xs text-gray-500">{formatDate(o.createdAt)}</td>
              <td className="px-4 py-3">
                <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:border-primary-500" aria-label="Status">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}</tbody>
        </table>
        {orders.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">Buyurtmalar topilmadi</p>}
      </div>
    </div>
  );
}
