'use client';

import React, { useEffect, useState } from 'react';
import {
  MessageSquareText,
  Phone,
  Mail,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Consultation } from '@/types';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import toast from 'react-hot-toast';

const STATUS_LIST = ['Semua', 'NEW', 'READ', 'PROCESSED', 'DONE'];

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  // Detail Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Consultation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedStatus === 'Semua'
          ? '/api/consultations'
          : `/api/consultations?status=${selectedStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      setConsultations(data);
    } catch (err) {
      toast.error('Gagal memuat pesan konsultasi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [selectedStatus]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Gagal memperbarui status');

      toast.success(`Status diubah menjadi: ${getStatusLabel(newStatus)}`);
      fetchConsultations();
      if (selectedConsultation?.id === id) {
        setSelectedConsultation((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengubah status');
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/consultations/${toDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus pesan');

      toast.success('Pesan konsultasi berhasil dihapus!');
      setDeleteDialogOpen(false);
      setToDelete(null);
      fetchConsultations();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus pesan');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Consultation>[] = [
    {
      header: 'Klien',
      accessorKey: 'name',
      sortable: true,
      cell: (item) => (
        <div>
          <p className="font-bold text-slate-900">{item.name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span>{item.email}</span>
            <span>•</span>
            <span>{item.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Layanan',
      accessorKey: 'service',
      sortable: true,
      cell: (item) => (
        <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          {item.service}
        </span>
      ),
    },
    {
      header: 'Pesan',
      cell: (item) => (
        <p className="text-xs text-slate-600 max-w-xs truncate">
          {item.message}
        </p>
      ),
    },
    {
      header: 'Tanggal',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (item) => (
        <span className="text-xs text-slate-500">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => (
        <select
          value={item.status}
          onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
          className={`text-xs font-bold rounded-lg px-2.5 py-1 border-0 focus:ring-2 focus:ring-amber-500 cursor-pointer ${getStatusColor(
            item.status
          )}`}
        >
          <option value="NEW">Baru</option>
          <option value="READ">Dibaca</option>
          <option value="PROCESSED">Diproses</option>
          <option value="DONE">Selesai</option>
        </select>
      ),
    },
    {
      header: 'Aksi',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-1">
          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
              item.name
            )},%20kami%20dari%20PT%20Arca%20Lingga%20Khatulistiwa%20menindaklanjuti%20permintaan%20konsultasi%20layanan%20${encodeURIComponent(
              item.service
            )}.`}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            title="Chat via WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* View Details */}
          <button
            onClick={() => {
              setSelectedConsultation(item);
              setViewModalOpen(true);
              if (item.status === 'NEW') {
                handleUpdateStatus(item.id, 'READ');
              }
            }}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Lihat Detail Pesan"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              setToDelete(item);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Hapus Pesan"
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
            Pesan Masuk Konsultasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar calon klien yang mengirimkan formulir konsultasi pembangunan dan renovasi.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 w-fit overflow-x-auto">
        {STATUS_LIST.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === st
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st === 'Semua' ? 'Semua Status' : getStatusLabel(st)}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={consultations}
        searchKey="name"
        searchPlaceholder="Cari nama calon klien..."
        isLoading={isLoading}
        emptyTitle="Tidak ada pesan konsultasi"
        emptyDescription="Pesan dari formulir konsultasi website akan muncul di sini."
      />

      {/* Detail Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedConsultation(null);
        }}
        title="Detail Permintaan Konsultasi"
        maxWidth="lg"
      >
        {selectedConsultation && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm">
              <div>
                <span className="text-xs text-slate-400">Nama Klien</span>
                <p className="font-bold text-slate-900">{selectedConsultation.name}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Status Saat Ini</span>
                <div className="mt-0.5">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${getStatusColor(
                      selectedConsultation.status
                    )}`}
                  >
                    {getStatusLabel(selectedConsultation.status)}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Email</span>
                <p className="font-medium text-slate-800">{selectedConsultation.email}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Nomor WhatsApp</span>
                <p className="font-medium text-slate-800">{selectedConsultation.phone}</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-slate-400">Layanan yang Diminati</span>
                <p className="font-bold text-amber-700">{selectedConsultation.service}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 block mb-1.5">
                Isi Pesan Kebutuhan:
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedConsultation.message}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedConsultation.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
                  selectedConsultation.name
                )},%20kami%20dari%20PT%20Arca%20Lingga%20Khatulistiwa%20menindaklanjuti%20permintaan%20konsultasi%20layanan%20${encodeURIComponent(
                  selectedConsultation.service
                )}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <Button
                  variant="gold"
                  className="w-full justify-center"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  Hubungi via WhatsApp
                </Button>
              </a>

              <a
                href={`mailto:${selectedConsultation.email}?subject=Konsultasi%20Arca%20Lingga%20Khatulistiwa%20-%20${encodeURIComponent(
                  selectedConsultation.service
                )}`}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  leftIcon={<Mail className="w-4 h-4" />}
                >
                  Kirim Email
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Pesan Konsultasi?"
        message={`Apakah Anda yakin ingin menghapus pesan dari "${toDelete?.name}"?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
