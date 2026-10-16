import React from 'react';
import { Calendar, Building2, Users2, HardHat } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      value: '10+',
      label: 'Tahun Pengalaman',
      desc: 'Dedikasi karya konstruksi & desain',
      icon: Calendar,
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      value: '100+',
      label: 'Proyek Selesai',
      desc: 'Rumah tinggal, gedung & komersial',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      value: '50+',
      label: 'Klien Puas',
      desc: 'Kepercayaan pemilik properti & korporasi',
      icon: Users2,
      gradient: 'from-blue-600 to-sky-500',
    },
    {
      value: '20+',
      label: 'Tenaga Ahli',
      desc: 'Arsitek IAI & insinyur berlisensi',
      icon: HardHat,
      gradient: 'from-indigo-600 to-blue-700',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-blue-600">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 line-clamp-1">
                  {stat.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
