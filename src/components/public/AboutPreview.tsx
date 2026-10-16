import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Target, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AboutPreview() {
  const points = [
    'Legalitas lengkap & sertifikasi konstruksi resmi',
    'Transparansi anggaran & Rencana Anggaran Biaya (RAB) detail',
    'Pengawasan mutu harian dan laporan progres berkala',
    'Material SNI bergaransi langsung dari pabrikan resmi',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Images */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-4/3">
              <Image
                src="/images/project-1.jpg"
                alt="PT Arca Lingga Khatulistiwa Team & Proyek"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl border border-blue-500/30 max-w-[240px]">
              <p className="text-2xl font-bold font-heading text-blue-400">10+ Tahun</p>
              <p className="text-xs text-slate-300 mt-1">
                Berdedikasi membangun mahakarya arsitektur nusantara.
              </p>
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              Tentang PT Arca Lingga Khatulistiwa
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading leading-tight">
              Merancang dengan Presisi, Membangun dengan Integritas
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              PT Arca Lingga Khatulistiwa hadir sebagai mitra konstruksi terpadu yang memadukan keahlian teknik sipil mutakhir, estetika arsitektur berkelas, serta manajemen proyek yang transparan dan tepat waktu.
            </p>

            {/* Visi & Misi Mini */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-blue-600 mb-2 font-bold text-sm">
                  <Eye className="w-4 h-4" /> Visi Kami
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menjadi kontraktor dan konsultan desain terdepan di Indonesia yang mengutamakan kualitas prima dan inovasi berkelanjutan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-blue-600 mb-2 font-bold text-sm">
                  <Target className="w-4 h-4" /> Misi Kami
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Memberikan solusi konstruksi menyeluruh, tepat waktu, tepat mutu, serta efisiensi anggaran terbaik bagi setiap klien.
                </p>
              </div>
            </div>

            {/* Checkpoints */}
            <div className="space-y-2.5 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{pt}</span>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4">
              <Link href="/tentang">
                <Button
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-500 font-bold shadow-md shadow-blue-600/25"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Selengkapnya Tentang Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
