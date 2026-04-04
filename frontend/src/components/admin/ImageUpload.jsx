import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await adminService.uploadFile(file);
      onChange(data.url);
    } catch { /* handled by interceptor */ }
    finally { setUploading(false); }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">Rasm</label>
      <div className="flex gap-2 items-center">
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="URL yoki yuklang"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500" />
        <label className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 flex items-center gap-1">
          <FiUpload size={14} /> {uploading ? '...' : 'Yuklash'}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      </div>
      {value && <img src={value} alt="preview" className="mt-2 h-16 rounded object-cover" />}
    </div>
  );
}
