import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import {
  Calendar,
  User,
  Folder,
  ArrowLeft,
  Share2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { ShareButtons } from './ShareButtons';
import { BlogCard } from '@/components/public/BlogCard';
import { CTASection } from '@/components/public/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: `${post.title} — Arca Lingga Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ARCA LINGGA KHATULISTIWA`,
      description: post.excerpt,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: { select: { name: true, email: true } },
    },
  });

  if (!post || post.status !== 'PUBLISHED') {
    notFound();
  }

  // Related posts from same category
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      id: { not: post.id },
      status: 'PUBLISHED',
    },
    include: {
      category: true,
      author: { select: { name: true } },
    },
    take: 3,
  });

  return (
    <div className="pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <Badge variant="gold" size="md">
            {post.category.name}
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 py-4 border-y border-slate-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Edukasi Konstruksi</span>
            </div>
          </div>

          {/* Feature Image */}
          {post.thumbnail && (
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          {post.excerpt && (
            <p className="text-lg sm:text-xl font-medium text-slate-700 leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/50 rounded-r-lg">
              {post.excerpt}
            </p>
          )}

          {/* Rich Content Render */}
          <div
            className="prose prose-slate lg:prose-lg max-w-none pt-4 text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons */}
          <div className="pt-8 mt-12 border-t border-slate-200">
            <ShareButtons title={post.title} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Artikel Terkait Lainnya
              </h3>
              <Link
                href="/blog"
                className="text-sm font-semibold text-amber-600 hover:text-amber-700"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
