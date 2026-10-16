import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import {
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ArrowLeft,
  ShieldCheck,
  Award,
  Clock,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/public/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) return { title: 'Layanan Tidak Ditemukan' };

  return {
    title: `${service.name} — Layanan Konstruksi`,
    description: service.description.slice(0, 160),
    openGraph: {
      title: `${service.name} | ARCA LINGGA KHATULISTIWA`,
      description: service.description.slice(0, 160),
      images: service.image ? [{ url: service.image }] : [],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service || !service.isActive) {
    notFound();
  }

  // Parse JSON fields
  let advantages: string[] = [];
  try {
    advantages = service.advantages ? JSON.parse(service.advantages) : [];
  } catch (e) {
    advantages = [service.advantages || ''];
  }

  let processSteps: string[] = [];
  try {
    processSteps = service.process ? JSON.parse(service.process) : [];
  } catch (e) {
    processSteps = [service.process || ''];
  }

  let faqs: { q: string; a: string }[] = [];
  try {
    faqs = service.faq ? JSON.parse(service.faq) : [];
  } catch (e) {
    faqs = [];
  }

  return (
    <div className="pt-24 md:pt-28">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Semua Layanan
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-white max-w-3xl">
            {service.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
            Solusi rancang bangun dan pengerjaan profesional berstandar mutu tinggi dari PT Arca Lingga Khatulistiwa.
          </p>
        </div>
      </section>

      {/* Main Content & Sticky Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Feature Image */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                <Image
                  src={service.image || '/images/hero.jpg'}
                  alt={service.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Tentang Layanan Ini
                </h2>
                <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                  {service.description}
                </div>
              </div>

              {/* Advantages List */}
              {advantages.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    Keunggulan & Apa yang Anda Dapatkan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {advantages.map((adv, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-800">
                          {adv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Stages */}
              {processSteps.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    Tahapan Pelaksanaan Proyek
                  </h3>
                  <div className="space-y-3">
                    {processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-heading shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-semibold text-slate-800">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Accordion */}
              {faqs.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    Pertanyaan Umum (FAQ)
                  </h3>
                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group p-4 rounded-xl bg-slate-50 border border-slate-200/80 transition-all [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex items-center justify-between font-semibold text-slate-900 cursor-pointer text-sm font-heading">
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-amber-600" />
                            {faq.q}
                          </span>
                          <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-6">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 p-6 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    Tertarik dengan Layanan Ini?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Dapatkan konsultasi gratis dan perkiraan estimasi anggaran (RAB) dari tim PT Arca Lingga Khatulistiwa.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/konsultasi?layanan=${encodeURIComponent(
                      service.name
                    )}`}
                    className="block"
                  >
                    <Button
                      variant="gold"
                      className="w-full justify-center"
                    >
                      Ajukan Konsultasi Sekarang
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20Arca%20Lingga%20Khatulistiwa,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
                      service.name
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      leftIcon={<PhoneCall className="w-4 h-4" />}
                      className="w-full justify-center text-slate-700"
                    >
                      Chat WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Trust mini list */}
                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Garansi Struktur & Purna Jual</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Material SNI Terverifikasi</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transparansi Jadwal & RAB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
