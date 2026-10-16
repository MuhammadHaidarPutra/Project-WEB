'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Category } from '@/types';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      toast.error('Gagal memuat kategori');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error('Nama kategori wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!res.ok) throw new Error('Gagal menyimpan kategori');

      toast.success(
        editingCategory
          ? 'Kategori berhasil diperbarui!'
          : 'Kategori baru berhasil ditambahkan!'
      );
      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus kategori');

      toast.success('Kategori berhasil dihapus!');
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus kategori');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Category>[] = [
    {
      header: 'Nama Kategori',
      accessorKey: 'name',
      sortable: true,
      cell: (cat) => (
        <span className="font-bold text-slate-900">{cat.name}</span>
      ),
    },
    {
      header: 'Slug URL',
      accessorKey: 'slug',
      cell: (cat) => (
        <span className="font-mono text-xs text-slate-500">/blog?kategori={cat.slug}</span>
      ),
    },
    {
      header: 'Jumlah Artikel',
      cell: (cat) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          {cat._count?.posts ?? 0} Artikel
        </span>
      ),
    },
    {
      header: 'Aksi',
      className: 'text-right',
      cell: (cat) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openEditModal(cat)}
            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
            title="Edit Kategori"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCategoryToDelete(cat);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Hapus Kategori"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Kategori Artikel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola pengelompokan artikel blog untuk navigasi dan SEO yang lebih teratur.
          </p>
        </div>

        <Button
          variant="gold"
          onClick={openCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Tambah Kategori
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
        searchPlaceholder="Cari nama kategori..."
        isLoading={isLoading}
      />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nama Kategori *"
            placeholder="Contoh: Arsitektur Tropis"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            autoFocus
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="gold"
              isLoading={isSubmitting}
            >
              {editingCategory ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Kategori?"
        message={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
