'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICES_OPTIONS = [
  { value: 'Desain Rumah', label: 'Desain Rumah (Arsitektur & 3D)' },
  { value: 'Pembangunan Rumah', label: 'Pembangunan Rumah Baru' },
  { value: 'Renovasi', label: 'Renovasi Rumah / Bangunan' },
  { value: 'Desain Interior', label: 'Desain Interior & Custom Furniture' },
  { value: 'Desain Eksterior', label: 'Desain Eksterior & Landscape' },
  { value: 'Pembangunan Gedung', label: 'Pembangunan Gedung & Ruko Komersial' },
  { value: 'Konsultasi Konstruksi', label: 'Konsultasi Konstruksi & Estimasi RAB' },
  { value: 'Lainnya', label: 'Lainnya' },
];

export function ConsultationForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('layanan') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService) {
      // Find matching option
      const match = SERVICES_OPTIONS.find((s) =>
        s.value.toLowerCase().includes(preselectedService.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.value }));
      }
    }
  }, [preselectedService]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+ -]{8,20}$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }
    if (!formData.service) newErrors.service = 'Pilih jenis layanan';
    if (!formData.message.trim()) newErrors.message = 'Pesan konsultasi wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Harap lengkapi formulir dengan benar');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Gagal mengirim formulir');

      setIsSubmitted(true);
      toast.success('Pesan konsultasi berhasil terkirim!');
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-heading text-slate-900">
            Terima Kasih, {formData.name}!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Permintaan konsultasi Anda untuk layanan{' '}
            <span className="font-semibold text-slate-900">{formData.service}</span> telah
            kami terima. Tim kami akan menghubungi Anda via WhatsApp/Email dalam 1x24 jam.
          </p>
        </div>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: '',
              });
            }}
          >
            Kirim Konsultasi Lainnya
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10 shadow-lg">
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold font-heading text-slate-900">
          Formulir Rencana Bangunan
        </h2>
        <p className="text-sm text-slate-500">
          Isi detail rencana Anda, tim kami akan segera menghubungi untuk konsultasi mendalam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Nama Lengkap"
          placeholder="Contoh: Budi Santoso"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Alamat Email"
            type="email"
            placeholder="budi@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Input
            label="Nomor WhatsApp"
            placeholder="081234567890"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            helperText="Pastikan nomor aktif di WhatsApp"
          />
        </div>

        <Select
          label="Jenis Layanan yang Dibutuhkan"
          placeholder="-- Pilih Layanan --"
          options={SERVICES_OPTIONS}
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          error={errors.service}
        />

        <Textarea
          label="Deskripsi Proyek / Kebutuhan Bangunan"
          placeholder="Ceritakan gambaran proyek Anda (lokasi lahan, luas tanah/bangunan, perkiraan budget, atau gaya yang diinginkan)..."
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={errors.message}
        />

        <div className="pt-3">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<Send className="w-5 h-5" />}
            className="w-full justify-center shadow-lg"
          >
            Kirim Permintaan Konsultasi
          </Button>
        </div>
      </form>
    </div>
  );
}
