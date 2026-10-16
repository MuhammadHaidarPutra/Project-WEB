'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function ProjectGallery({
  projectName,
  thumbnail,
  images = [],
}: {
  projectName: string;
  thumbnail: string | null;
  images: { imageUrl: string }[];
}) {
  const allImages = [
    ...(thumbnail ? [thumbnail] : []),
    ...images.map((img) => img.imageUrl),
  ].filter((v, i, a) => a.indexOf(v) === i); // deduplicate

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="space-y-6">
      {/* Main Cover Photo with Click to Enlarge */}
      <div
        onClick={() => openLightbox(0)}
        className="relative aspect-16/9 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 group cursor-pointer"
      >
        <Image
          src={allImages[0] || '/images/project-1.jpg'}
          alt={projectName}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-4 py-2 rounded-xl bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Maximize2 className="w-3.5 h-3.5" />
            Klik untuk Memperbesar Foto
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {allImages.length > 1 && (
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-xl font-bold font-heading text-slate-900">
            Galeri Dokumentasi Proyek ({allImages.length} Foto)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {allImages.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 group cursor-pointer ${
                  idx === currentIndex && lightboxOpen ? 'ring-2 ring-amber-500' : ''
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${projectName} - Foto ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-white pb-2 border-b border-white/10">
            <span className="text-sm font-semibold truncate max-w-md">
              {projectName} — Foto {currentIndex + 1} dari {allImages.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image in Lightbox */}
          <div className="relative flex-1 w-full max-w-5xl my-4 flex items-center justify-center">
            {/* Prev button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={allImages[currentIndex]}
                alt={`${projectName} - ${currentIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Next button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto max-w-xl py-2 px-4 rounded-xl bg-white/5 border border-white/10">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'border-amber-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
