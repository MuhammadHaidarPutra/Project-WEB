'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/types';
import { ProjectCard } from '@/components/public/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';

const CATEGORIES = [
  'Semua',
  'Rumah',
  'Renovasi',
  'Interior',
  'Eksterior',
  'Komersial',
];

export function PortfolioFilterList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return initialProjects;
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Tidak Ada Proyek Ditemukan"
          description="Belum ada portofolio untuk kategori ini. Pilih kategori lain untuk melihat karya kami."
        />
      )}
    </div>
  );
}
