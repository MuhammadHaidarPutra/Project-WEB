import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from './ServiceCard';
import { Service } from '@/types';

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              Layanan Konstruksi Terpadu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Solusi Lengkap untuk Kebutuhan Bangunan Anda
            </h2>
            <p className="text-base text-slate-600">
              Dari tahap perancangan konsep hingga serah terima kunci, kami menyediakan jasa konstruksi profesional dengan standar mutu terbaik.
            </p>
          </div>

          <div>
            <Link href="/layanan">
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-white"
              >
                Lihat Semua Layanan
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
