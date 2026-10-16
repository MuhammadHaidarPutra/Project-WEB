'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/ui/DataTable';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Project } from '@/types';
import { getStatusColor, getStatusLabel } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      toast.error('Gagal memuat portofolio');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async () => {
    if (!selectedProject) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus proyek');

      toast.success('Proyek berhasil dihapus!');
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus proyek');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Project>[] = [
    {
      header: 'Thumbnail',
      className: 'w-20',
      cell: (project) => (
        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={project.thumbnail || '/images/project-1.jpg'}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Nama Proyek',
      accessorKey: 'name',
      sortable: true,
      cell: (project) => (
        <div className="max-w-xs sm:max-w-md">
          <p className="font-bold text-slate-900 line-clamp-1">{project.name}</p>
          <p className="text-xs text-slate-400">
            {project.location} • {project.year} {project.area ? `• ${project.area}` : ''}
          </p>
        </div>
      ),
    },
    {
      header: 'Kategori',
      accessorKey: 'category',
      sortable: true,
      cell: (project) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
          {project.category}
        </span>
      ),
    },
    {
      header: 'Galeri',
      cell: (project) => (
        <span className="text-xs text-slate-500">
          {project.images?.length || 0} Foto
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (project) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusColor(
            project.status
          )}`}
        >
          {getStatusLabel(project.status)}
        </span>
      ),
    },
    {
      header: 'Aksi',
      className: 'text-right',
      cell: (project) => (
        <div className="flex items-center justify-end gap-1">
          {project.status === 'PUBLISHED' && (
            <Link
              href={`/portfolio/${project.slug}`}
              target="_blank"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Lihat di Web"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/admin/portofolio/${project.id}/edit`}
            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            title="Edit Proyek"
          >
            <Edit className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              setSelectedProject(project);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Hapus Proyek"
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
            Kelola Portofolio Proyek
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tambah, sunting, dan dokumentasikan hasil karya konstruksi dan desain bangunan.
          </p>
        </div>

        <Link href="/admin/portofolio/buat">
          <Button
            variant="gold"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Tambah Proyek Baru
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={projects}
        searchKey="name"
        searchPlaceholder="Cari nama proyek..."
        isLoading={isLoading}
        emptyTitle="Belum ada proyek"
        emptyDescription="Tambahkan proyek konstruksi dan arsitektur untuk memukau calon pelanggan."
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedProject(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Proyek?"
        message={`Apakah Anda yakin ingin menghapus proyek "${selectedProject?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
