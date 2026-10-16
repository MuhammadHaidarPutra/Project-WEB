'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/ui/DataTable';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Post } from '@/types';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminArticlesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      toast.error('Gagal memuat artikel');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!selectedPost) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${selectedPost.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus artikel');

      toast.success('Artikel berhasil dihapus!');
      setDeleteDialogOpen(false);
      setSelectedPost(null);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus artikel');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Post>[] = [
    {
      header: 'Thumbnail',
      className: 'w-20',
      cell: (post) => (
        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={post.thumbnail || '/images/project-1.jpg'}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Judul Artikel',
      accessorKey: 'title',
      sortable: true,
      cell: (post) => (
        <div className="max-w-xs sm:max-w-md">
          <p className="font-bold text-slate-900 line-clamp-1">{post.title}</p>
          <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
        </div>
      ),
    },
    {
      header: 'Kategori',
      cell: (post) => (
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
          {post.category?.name || '-'}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (post) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusColor(
            post.status
          )}`}
        >
          {getStatusLabel(post.status)}
        </span>
      ),
    },
    {
      header: 'Tanggal',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (post) => (
        <span className="text-xs text-slate-500">
          {formatDate(post.publishedAt || post.createdAt)}
        </span>
      ),
    },
    {
      header: 'Aksi',
      className: 'text-right',
      cell: (post) => (
        <div className="flex items-center justify-end gap-1">
          {post.status === 'PUBLISHED' && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Lihat di Web"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/admin/artikel/${post.id}/edit`}
            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            title="Edit Artikel"
          >
            <Edit className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              setSelectedPost(post);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Hapus Artikel"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Kelola Artikel & Blog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Buat, sunting, terbitkan, dan hapus artikel edukasi serta tips konstruksi.
          </p>
        </div>

        <Link href="/admin/artikel/buat">
          <Button
            variant="gold"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-sm"
          >
            Tulis Artikel Baru
          </Button>
        </Link>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={posts}
        searchKey="title"
        searchPlaceholder="Cari judul artikel..."
        isLoading={isLoading}
        emptyTitle="Belum ada artikel"
        emptyDescription="Mulai buat artikel edukasi baru untuk meningkatkan SEO dan kepercayaan klien."
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedPost(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Artikel?"
        message={`Apakah Anda yakin ingin menghapus artikel "${selectedPost?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
