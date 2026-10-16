import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlogCard } from './BlogCard';
import { Post } from '@/types';

export function BlogSection({ posts }: { posts: Post[] }) {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              Wawasan & Edukasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Artikel & Tips Konstruksi Terbaru
            </h2>
            <p className="text-base text-slate-600">
              Temukan inspirasi desain arsitektur, panduan renovasi rumah hemat biaya, dan tips memilih material bangunan berkualitas.
            </p>
          </div>

          <div>
            <Link href="/blog">
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-white"
              >
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
