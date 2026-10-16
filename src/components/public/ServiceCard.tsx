import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Building2,
  Hammer,
  Palette,
  Trees,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { Service } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Trees: <Trees className="w-6 h-6" />,
  ClipboardList: <ClipboardList className="w-6 h-6" />,
};

export function ServiceCard({ service }: { service: Service }) {
  const icon = iconMap[service.icon || 'Home'] || <Home className="w-6 h-6" />;

  return (
    <div className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Service Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <Image
          src={service.image || '/images/hero.jpg'}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Floating Icon Box */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors">
            {service.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/layanan/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
          >
            <span>Rincian Layanan</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <span className="text-xs font-semibold text-slate-400">Garansi Mutu</span>
        </div>
      </div>
    </div>
  );
}
