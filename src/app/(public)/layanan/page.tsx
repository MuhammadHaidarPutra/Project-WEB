import React from 'react';
import { prisma } from '@/lib/prisma';
import { ServiceCard } from '@/components/public/ServiceCard';
import { ProcessSection } from '@/components/public/ProcessSection';
import { CTASection } from '@/components/public/CTASection';

export const metadata = {
  title: 'Layanan Konstruksi & Desain',
  description: 'Daftar layanan konstruksi, desain rumah, renovasi, interior, eksterior, dan konsultasi dari PT Arca Lingga Khatulistiwa.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-24 md:pt-28">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Layanan Komprehensif
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Solusi Rancang Bangun Terpadu
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Dari perencanaan konsep arsitektur hingga eksekusi konstruksi fisik, kami memberikan layanan berstandar mutu tinggi.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 6 Step Process */}
      <ProcessSection />

      {/* CTA */}
      <CTASection />
    </div>
  );
}
