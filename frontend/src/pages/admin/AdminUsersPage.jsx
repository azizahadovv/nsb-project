import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminService.getUsers({ page: 0, size: 50 })
      .then(({ data }) => setUsers(data?.content || []))
      .catch(() => {});
  }, []);

  const toggleBlock = async (id, blocked) => {
    try {
      await adminService.blockUser(id, !blocked);
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, blocked: !blocked } : u));
      toast.success(blocked ? 'Foydalanuvchi ochildi' : 'Foydalanuvchi bloklandi');
    } catch { toast.error('Xatolik'); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-5">Foydalanuvchilar</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-gray-500 text-xs"><th className="px-4 py-3 text-left">Ism</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-center">Rol</th><th className="px-4 py-3 text-center">Status</th><th className="px-4 py-3">Amal</th></tr></thead>
          <tbody>{users.map((u) => (
            <tr key={u.id} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold">{u.name}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
              <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-50 text-primary-600">{u.role}</span></td>
              <td className="px-4 py-3 text-center">{u.blocked ? <span className="text-red-500 text-xs font-bold">Bloklangan</span> : <span className="text-green-600 text-xs font-bold">Aktiv</span>}</td>
              <td className="px-4 py-3 text-center">
                <button onClick={() => toggleBlock(u.id, u.blocked)} className={`text-xs font-bold px-2 py-1 rounded ${u.blocked ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}>
                  {u.blocked ? 'Ochish' : 'Bloklash'}
                </button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
