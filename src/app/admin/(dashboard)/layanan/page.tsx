'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, ExternalLink, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/ui/DataTable';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Service } from '@/types';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      toast.error('Gagal memuat layanan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...service,
          isActive: !service.isActive,
        }),
      });

      if (!res.ok) throw new Error('Gagal mengubah status');

      toast.success(
        `Layanan "${service.name}" ${!service.isActive ? 'diaktifkan' : 'dinonaktifkan'}`
      );
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengubah status');
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/services/${selectedService.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus layanan');

      toast.success('Layanan berhasil dihapus!');
      setDeleteDialogOpen(false);
      setSelectedService(null);
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus layanan');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Service>[] = [
    {
      header: 'Gambar',
      className: 'w-20',
      cell: (srv) => (
        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={srv.image || '/images/hero.jpg'}
            alt={srv.name}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Nama Layanan',
      accessorKey: 'name',
      sortable: true,
      cell: (srv) => (
        <div>
          <p className="font-bold text-slate-900">{srv.name}</p>
          <p className="text-xs text-slate-400 font-mono">/layanan/{srv.slug}</p>
        </div>
      ),
    },
    {
      header: 'Icon',
      accessorKey: 'icon',
      cell: (srv) => (
        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
          {srv.icon || 'Home'}
        </span>
      ),
    },
    {
      header: 'Urutan',
      accessorKey: 'order',
      sortable: true,
      cell: (srv) => <span className="font-semibold">{srv.order}</span>,
    },
    {
      header: 'Status Aktif',
      cell: (srv) => (
        <button
          onClick={() => handleToggleActive(srv)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            srv.isActive
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          {srv.isActive ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Aktif</span>
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Nonaktif</span>
            </>
          )}
        </button>
      ),
    },
    {
      header: 'Aksi',
      className: 'text-right',
      cell: (srv) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/layanan/${srv.slug}`}
            target="_blank"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Lihat di Web"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <Link
            href={`/admin/layanan/${srv.id}/edit`}
            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            title="Edit Layanan"
          >
            <Edit className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              setSelectedService(srv);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Hapus Layanan"
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
            Kelola Layanan Perusahaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Atur jenis jasa konstruksi, keunggulan paket, dan rincian alur kerja pengerjaan.
          </p>
        </div>

        <Link href="/admin/layanan/buat">
          <Button
            variant="gold"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Tambah Layanan Baru
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={services}
        searchKey="name"
        searchPlaceholder="Cari nama layanan..."
        isLoading={isLoading}
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedService(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Layanan?"
        message={`Apakah Anda yakin ingin menghapus layanan "${selectedService?.name}"?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
