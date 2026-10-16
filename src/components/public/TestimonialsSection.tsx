import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Bpk. Hendrawan Santoso',
      role: 'Pemilik Rumah Tinggal',
      location: 'Menteng, Jakarta Pusat',
      project: 'Pembangunan Rumah Mewah 350m²',
      quote:
        'PT Arca Lingga Khatulistiwa sangat profesional dari tahap awal denah 3D hingga serah terima kunci. Anggaran sangat transparan sesuai RAB tanpa ada biaya siluman. Mutu bangunan kokoh dan rapi!',
      rating: 5,
      avatarText: 'HS',
    },
    {
      name: 'Ibu Rina Anggraini',
      role: 'Pengusaha & Investor Properti',
      location: 'BSD City, Tangerang',
      project: 'Desain & Bangun Rumah Tropis',
      quote:
        'Tim arsiteknya sangat komunikatif dan sabar mendengar aspirasi keluarga kami. Pencahayaan alami dan sirkulasi udara di rumah jadi sangat sejuk. Sangat puas dengan hasilnya!',
      rating: 5,
      avatarText: 'RA',
    },
    {
      name: 'Dr. Michael Prasetyo',
      role: 'Pemilik Villa Puncak',
      location: 'Bogor, Jawa Barat',
      project: 'Renovasi Total Villa & Kolam Renang',
      quote:
        'Renovasi villa kami selesai tepat waktu sesuai timeline yang dijanjikan. Pengawasan mandor ketat dan laporan progres mingguan via foto/video membuat kami merasa tenang meski jarang ke lokasi.',
      rating: 5,
      avatarText: 'MP',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
            Testimoni & Kepuasan Klien
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
            Apa Kata Mereka Tentang PT Arca Lingga Khatulistiwa?
          </h2>
          <p className="text-base text-slate-600">
            Kepercayaan dan kepuasan klien adalah mahakarya terbesar kami dalam membangun relasi jangka panjang.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-blue-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-950 to-blue-900 text-blue-400 font-bold text-sm flex items-center justify-center font-heading shrink-0 border border-blue-500/20">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-heading">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t.role} • {t.location}
                  </p>
                  <p className="text-[11px] text-blue-700 font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {t.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
