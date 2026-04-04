import React, { useState } from 'react';
import SEO from '../../components/seo/SEO';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { formatPrice } from '../../helpers/formatters';

const CITIES = { toshkent: 5.2, samarqand: 5.5, buxoro: 5.8, nukus: 5.6, fargona: 5.0, andijon: 4.9 };
const TYPES = { ongrid: { label: 'On-grid (tarmoqqa)', mult: 1 }, hybrid: { label: 'Gibrid', mult: 1.4 }, offgrid: { label: 'Off-grid', mult: 1.8 } };
const TARIFF = 450;
const PANEL_W = 550;
const EFF = 0.85;

export default function SolarCalculatorPage() {
  const [kwh, setKwh] = useState(500);
  const [city, setCity] = useState('toshkent');
  const [type, setType] = useState('ongrid');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const solar = CITIES[city];
    const dailyKwh = kwh / 30;
    const requiredKw = dailyKwh / (solar * EFF);
    const panels = Math.ceil((requiredKw * 1000) / PANEL_W);
    const totalKw = (panels * PANEL_W) / 1000;
    const yearlyKwh = totalKw * solar * 365 * EFF;
    const yearlySaving = yearlyKwh * TARIFF;
    const equipCost = totalKw * 2800000 * TYPES[type].mult;
    const installCost = totalKw * 500000;
    const totalCost = equipCost + installCost;
    const payback = totalCost / yearlySaving;
    const co2 = yearlyKwh * 0.5;
    setResult({ totalKw, panels, area: panels * 2.2, yearlyKwh: Math.round(yearlyKwh), yearlySaving: Math.round(yearlySaving), equipCost: Math.round(equipCost), installCost: Math.round(installCost), totalCost: Math.round(totalCost), payback: payback.toFixed(1), co2: Math.round(co2) });
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-500";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <SEO title="Quyosh kalkulyatori" description="O'zbekiston uchun quyosh elektr stantsiyasi qopilish kalkulyatori" />
      <Breadcrumb items={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Quyosh kalkulyatori' }]} />
      <h1 className="font-display text-2xl font-extrabold mb-5">☀️ Quyosh stantsiyasi kalkulyatori</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Oylik iste'mol (kVt·soat)</label><input type="number" value={kwh} onChange={(e) => setKwh(Number(e.target.value))} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Shahar</label><select value={city} onChange={(e) => setCity(e.target.value)} className={inp}>{Object.keys(CITIES).map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}</select></div>
          <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Stantsiya turi</label><select value={type} onChange={(e) => setType(e.target.value)} className={inp}>{Object.entries(TYPES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
        </div>
        <button onClick={calculate} className="w-full py-3 bg-solar-500 text-dark rounded-lg font-bold text-sm hover:bg-solar-600 transition-colors">Hisoblash</button>
      </div>
      {result && <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-display text-lg font-extrabold mb-4">Natija</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {[['Quvvat',`${result.totalKw.toFixed(1)} kVt`],['Panellar',`${result.panels} dona`],['Maydon',`${result.area.toFixed(1)} m²`],['Yillik ishlab chiqarish',`${result.yearlyKwh} kVt·soat`],['Yillik tejash',formatPrice(result.yearlySaving)],['CO₂ kamaytirish',`${result.co2} kg/yil`]].map(([l,v],i) => <div key={i} className="bg-gray-50 rounded-lg p-3"><p className="text-[10px] text-gray-400">{l}</p><p className="font-display text-sm font-extrabold mt-0.5">{v}</p></div>)}
        </div>
        <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Jihozlar</span><span className="font-bold">{formatPrice(result.equipCost)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">O'rnatish</span><span className="font-bold">{formatPrice(result.installCost)}</span></div>
          <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2"><span>Jami</span><span className="text-solar-600">{formatPrice(result.totalCost)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Qopilish muddati</span><span className="font-bold text-green-600">{result.payback} yil</span></div>
        </div>
      </div>}
    </div>
  );
}
