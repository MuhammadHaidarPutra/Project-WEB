import React from 'react';
import {
  MessageSquare,
  Search,
  Compass,
  Calculator,
  HardHat,
  KeyRound,
} from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Konsultasi Kebutuhan',
      desc: 'Diskusi mendalam mengenai visi, kebutuhan ruang, gaya arsitektur, dan estimasi anggaran.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'Survey & Analisis Lahan',
      desc: 'Pengukuran topografi lokasi, evaluasi kontur tanah, orientasi matahari, dan analisis lingkungan.',
      icon: Search,
    },
    {
      num: '03',
      title: 'Perancangan & 3D Render',
      desc: 'Pembuatan denah 2D, visualisasi 3D realistis, gambar kerja arsitektur, struktur, dan MEP.',
      icon: Compass,
    },
    {
      num: '04',
      title: 'Estimasi Biaya (RAB)',
      desc: 'Penyusunan Rencana Anggaran Biaya transparan dan kontrak kerja resmi dengan timeline terukur.',
      icon: Calculator,
    },
    {
      num: '05',
      title: 'Pelaksanaan Pembangunan',
      desc: 'Pengerjaan fisik oleh tukang ahli dengan pengawasan ketat, QC berlapis, dan laporan mingguan.',
      icon: HardHat,
    },
    {
      num: '06',
      title: 'Serah Terima Kunci',
      desc: 'Inspeksi akhir bersama klien, serah terima kunci bangunan, dokumen as-built, dan kartu garansi resmi.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Alur Kerja Terstandar
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            6 Tahap Mewujudkan Bangunan Impian
          </h2>
          <p className="text-base text-slate-400">
            Setiap proses diawasi secara profesional untuk menjamin ketepatan waktu, mutu struktur, dan transparansi anggaran.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-extrabold font-heading text-slate-800 group-hover:text-blue-500/40 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
