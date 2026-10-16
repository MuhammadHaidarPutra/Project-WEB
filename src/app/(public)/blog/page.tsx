import React from 'react';
import { prisma } from '@/lib/prisma';
import { BlogFilterList } from './BlogFilterList';
import { CTASection } from '@/components/public/CTASection';

export const metadata = {
  title: 'Blog & Edukasi Konstruksi',
  description: 'Artikel, tips renovasi rumah, tren desain interior, dan wawasan konstruksi bangunan dari PT Arca Lingga Khatulistiwa.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: true,
        author: { select: { name: true, email: true } },
      },
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { posts: true } },
      },
    }),
  ]);

  return (
    <div className="pt-24 md:pt-28">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Wawasan & Edukasi
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Artikel & Tips Pembangunan
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Panduan lengkap, inspirasi desain arsitektur, tips renovasi hemat, dan informasi terkini seputar dunia konstruksi.
          </p>
        </div>
      </section>

      {/* Main Blog Component */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFilterList initialPosts={posts} categories={categories} />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
