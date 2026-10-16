import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

export function PortfolioSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
              Portofolio Unggulan
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Karya Konstruksi & Arsitektur Terbaik
            </h2>
            <p className="text-base text-slate-600">
              Lihat ragam proyek hunian mewah, ruko, gedung perkantoran, dan interior yang telah kami selesaikan dengan kepuasan tertinggi.
            </p>
          </div>

          <div>
            <Link href="/portfolio">
              <Button
                variant="gold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Lihat Semua Proyek
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
