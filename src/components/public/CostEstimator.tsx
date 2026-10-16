'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const BUILDING_TYPES = [
  { id: 'rumah-1-lantai', name: 'Rumah Tinggal 1 Lantai', baseRate: 4000000 },
  { id: 'rumah-2-lantai', name: 'Rumah Tinggal 2 Lantai', baseRate: 5000000 },
  { id: 'renovasi', name: 'Renovasi Rumah (Total/Sebagian)', baseRate: 3000000 },
  { id: 'interior', name: 'Desain Interior & Fit-Out', baseRate: 2500000 },
  { id: 'ruko', name: 'Ruko / Bangunan Komersial', baseRate: 4500000 },
];

const QUALITY_TIERS = [
  {
    id: 'standar',
    name: 'Spesifikasi Standar',
    multiplier: 1.0,
    desc: 'Lantai granit 60x60, sanitair standar SNI, cat interior/eksterior berkualitas, kusen aluminium.',
  },
  {
    id: 'premium',
    name: 'Spesifikasi Premium (Rekomendasi)',
    multiplier: 1.25,
    desc: 'Lantai granit 80x80 / vinyl premium, sanitair Toto/setara, cat dulux/jotun, kusen powder coating, plafon drop ceiling.',
  },
  {
    id: 'mewah',
    name: 'Spesifikasi Mewah (Luxury)',
    multiplier: 1.6,
    desc: 'Lantai marmer import / kayu solid, smart home integration, sanitair Kohler/Grohe, fasad batu alam & kisi-kisi kayu solid.',
  },
];

export function CostEstimator() {
  const [selectedType, setSelectedType] = useState(BUILDING_TYPES[1].id);
  const [selectedQuality, setSelectedQuality] = useState(QUALITY_TIERS[1].id);
  const [area, setArea] = useState<number>(150);

  const currentType = BUILDING_TYPES.find((t) => t.id === selectedType) || BUILDING_TYPES[0];
  const currentQuality = QUALITY_TIERS.find((q) => q.id === selectedQuality) || QUALITY_TIERS[1];

  const ratePerMeter = Math.round(currentType.baseRate * currentQuality.multiplier);
  const totalCost = ratePerMeter * (area || 0);
  const minCost = Math.round(totalCost * 0.95);
  const maxCost = Math.round(totalCost * 1.08);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getEstimatedDuration = (sqm: number) => {
    if (sqm <= 100) return '3 - 4 Bulan';
    if (sqm <= 250) return '5 - 7 Bulan';
    if (sqm <= 500) return '8 - 10 Bulan';
    return '10 - 14 Bulan';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Calculator className="w-3.5 h-3.5" />
              Simulasi Biaya Cepat
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
              Kalkulator Estimasi Biaya Bangun
            </h3>
            <p className="text-sm text-slate-500">
              Hitung perkiraan Rencana Anggaran Biaya (RAB) bersama PT Arcalingga Khatulistiwa berdasarkan jenis proyek, luas lahan, dan spesifikasi material.
            </p>
          </div>

          {/* Step 1: Building Type */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Pilih Jenis Bangunan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BUILDING_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3.5 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedType === type.id
                      ? 'border-blue-600 bg-blue-50/80 text-blue-950 shadow-xs ring-1 ring-blue-500/30'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Quality Tier */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Pilih Spesifikasi Material
            </label>
            <div className="space-y-2">
              {QUALITY_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedQuality(tier.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedQuality === tier.id
                      ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-500/30'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 font-heading">
                      {tier.name}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      ~ {formatRupiah(currentType.baseRate * tier.multiplier)} / m²
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Area input slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Perkiraan Luas Bangunan (m²)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={20}
                  max={2000}
                  value={area}
                  onChange={(e) => setArea(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 px-2.5 py-1 text-right font-bold text-slate-900 bg-slate-100 rounded-lg text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-slate-500">m²</span>
              </div>
            </div>
            <input
              type="range"
              min={30}
              max={800}
              step={10}
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>30 m² (Kecil)</span>
              <span>150 m² (Menengah)</span>
              <span>400 m² (Besar)</span>
              <span>800+ m² (Mewah)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Summary Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">
                Hasil Simulasi Biaya
              </span>
              <h4 className="text-lg font-bold font-heading text-white mt-1">
                Estimasi Anggaran Proyek
              </h4>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400">Perkiraan Rentang Anggaran:</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 font-heading">
                {formatRupiah(minCost)}
              </div>
              <div className="text-xs text-slate-400">
                hingga <span className="text-slate-200 font-semibold">{formatRupiah(maxCost)}</span>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Tipe:</span>
                <span className="font-semibold text-white text-right">{currentType.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Spesifikasi:</span>
                <span className="font-semibold text-blue-400 text-right">{currentQuality.name.split(' ')[1]}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Luas Bangunan:</span>
                <span className="font-semibold text-white">{area} m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Estimasi Pengerjaan:</span>
                <span className="font-semibold text-emerald-400">{getEstimatedDuration(area)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              *Estimasi bersifat indikatif dan dapat disesuaikan dengan kondisi kontur lahan, perizinan, dan spesifikasi arsitektur khusus.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-3 border-t border-slate-800">
            <Link
              href={`/konsultasi?layanan=${encodeURIComponent(
                currentType.name
              )}&luas=${area}&spek=${encodeURIComponent(currentQuality.name)}`}
              className="block"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-lg shadow-blue-600/30 font-bold bg-blue-600 hover:bg-blue-500"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Konsultasikan Estimasi Ini
              </Button>
            </Link>

            <a
              href={`https://wa.me/6281234567890?text=Halo%20PT%20Arcalingga%20Khatulistiwa,%20saya%20sudah%20mencoba%20simulasi%20estimasi%20biaya%20untuk%20${encodeURIComponent(
                currentType.name
              )}%20luas%20${area}m2%20dengan%20estimasi%20${encodeURIComponent(
                formatRupiah(totalCost)
              )}.%20Bisa%20bantu%20RAB%20detail?`}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors py-2"
            >
              Kirim Hasil Simulasi via WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
