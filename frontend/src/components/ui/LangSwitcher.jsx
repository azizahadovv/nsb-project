import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const change = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('nsb_lang', code);
    document.documentElement.lang = code;
  };

  return (
    <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5" role="radiogroup" aria-label="Til tanlash">
      {LANGS.map((l) => (
        <button key={l.code} onClick={() => change(l.code)}
          className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
            i18n.language === l.code
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          role="radio" aria-checked={i18n.language === l.code}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
