import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  MapPin,
  Calendar,
  Layers,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProjectGallery } from './ProjectGallery';
import { CTASection } from '@/components/public/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) return { title: 'Proyek Tidak Ditemukan' };

  return {
    title: `${project.name} — Portofolio Proyek`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.name} | ARCA LINGGA KHATULISTIWA`,
      description: project.description.slice(0, 160),
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 md:pt-28">
      {/* Back button & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portofolio</span>
        </Link>
      </div>

      {/* Main Showcase Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold" size="md" className="font-bold">
              {project.category}
            </Badge>
            <span className="text-sm text-slate-400">• Selesai Dibangun</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
            {project.name}
          </h1>

          {/* Key specs bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
            <div>
              <p className="text-xs text-slate-400">Lokasi Proyek</p>
              <p className="text-base font-bold text-white mt-1 flex items-center gap-1.5 font-heading">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                {project.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Tahun Selesai</p>
              <p className="text-base font-bold text-white mt-1 flex items-center gap-1.5 font-heading">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                {project.year}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Luas Bangunan</p>
              <p className="text-base font-bold text-white mt-1 flex items-center gap-1.5 font-heading">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                {project.area || '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Kategori</p>
              <p className="text-base font-bold text-amber-400 mt-1 font-heading">
                {project.category}
              </p>
            </div>
          </div>

          {/* Interactive Photo Gallery with Lightbox */}
          <ProjectGallery
            projectName={project.name}
            thumbnail={project.thumbnail}
            images={project.images}
          />

          {/* Description & Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Deskripsi & Tantangan Proyek
              </h2>
              <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line space-y-4">
                {project.description}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 p-6 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    Ingin Membangun Seperti Ini?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Diskusikan konsep desain, estimasi anggaran, dan timeline pelaksanaan bersama tim arsitek PT Arca Lingga Khatulistiwa.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/konsultasi?layanan=${encodeURIComponent(
                      'Pembangunan ' + project.category
                    )}`}
                    className="block"
                  >
                    <Button variant="gold" className="w-full justify-center">
                      Konsultasi Proyek Serupa
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20Arca%20Lingga%20Khatulistiwa,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(
                      project.name
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-center text-slate-700"
                    >
                      Tanya via WhatsApp
                    </Button>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Garansi Struktur 2 Tahun
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Rencana Anggaran Transparan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
