import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Cover Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <Image
          src={project.thumbnail || '/images/project-1.jpg'}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-md">
            {project.category}
          </span>
        </div>

        {/* Floating Quick Link */}
        <Link
          href={`/portfolio/${project.slug}`}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white text-slate-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
          aria-label={`Lihat detail ${project.name}`}
        >
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Info Content */}
      <div className="p-6 space-y-3">
        <Link href={`/portfolio/${project.slug}`}>
          <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Specs metadata */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}
