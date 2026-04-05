import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import useScrollTop from '../../hooks/useScrollTop';

export default function FloatingButtons() {
  const y = useScrollTop();
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      <a href="https://t.me/azizahadov" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#0088CC] text-white flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform" aria-label="Telegram"><FaTelegramPlane /></a>
      {y > 400 && <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="w-11 h-11 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors" aria-label="Yuqoriga"><FiArrowUp /></button>}
    </div>
  );
}
