'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Loading } from '@/components/ui/Loading';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

const CATEGORY_OPTIONS = [
  { value: 'Rumah', label: 'Pembangunan Rumah' },
  { value: 'Renovasi', label: 'Renovasi Rumah & Gedung' },
  { value: 'Interior', label: 'Desain Interior' },
  { value: 'Eksterior', label: 'Desain Eksterior & Landscape' },
  { value: 'Komersial', label: 'Gedung Komersial & Kantor' },
  { value: 'Gedung', label: 'Pembangunan Gedung' },
];

export default function EditPortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Rumah',
    location: '',
    year: '',
    area: '',
    description: '',
    thumbnail: '',
    galleryImages: [] as string[],
    status: 'PUBLISHED',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          slug: data.slug,
          category: data.category,
          location: data.location,
          year: data.year,
          area: data.area || '',
          description: data.description,
          thumbnail: data.thumbnail || '',
          galleryImages: data.images?.map((img: any) => img.imageUrl) || [],
          status: data.status,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('Gagal memuat proyek');
        setIsLoading(false);
      });
  }, [id]);

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: slugify(val),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama proyek wajib diisi';
    if (!formData.category) newErrors.category = 'Pilih kategori proyek';
    if (!formData.location.trim()) newErrors.location = 'Lokasi proyek wajib diisi';
    if (!formData.year.trim()) newErrors.year = 'Tahun proyek wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi proyek wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Gagal memperbarui proyek');
      }

      toast.success('Proyek berhasil diperbarui!');
      router.push('/admin/portofolio');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading text="Memuat data proyek..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/portofolio">
            <Button variant="outline" size="sm" className="px-2.5">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Edit Proyek Portofolio
            </h1>
            <p className="text-xs text-slate-500">
              Perbarui rincian dan foto dokumentasi proyek
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="gold"
          isLoading={isSubmitting}
          onClick={handleSubmit}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Simpan Perubahan
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <Input
            label="Nama Proyek *"
            placeholder="Contoh: Residensi Modern Menteng"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            error={errors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Kategori Proyek *"
              options={CATEGORY_OPTIONS}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              error={errors.category}
            />

            <Input
              label="Lokasi Proyek *"
              placeholder="Contoh: Jakarta Selatan / BSD City"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              error={errors.location}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Tahun Selesai *"
              placeholder="2024"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              error={errors.year}
            />

            <Input
              label="Luas Bangunan (Opsional)"
              placeholder="Contoh: 350 m²"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
          </div>

          <Textarea
            label="Deskripsi & Cerita Proyek *"
            placeholder="Jelaskan konsep arsitektur, tantangan pengerjaan, material utama, dan kepuasan klien..."
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={errors.description}
          />

          <div className="pt-2 border-t border-slate-100 space-y-6">
            <ImageUpload
              label="Foto Utama (Cover Thumbnail)"
              value={formData.thumbnail}
              onChange={(url) =>
                setFormData({ ...formData, thumbnail: url as string })
              }
              helperText="Foto terbaik yang mewakili proyek di halaman portofolio"
            />

            <ImageUpload
              label="Galeri Foto Tambahan (Bisa Banyak)"
              value={formData.galleryImages}
              multiple
              onChange={(urls) =>
                setFormData({ ...formData, galleryImages: urls as string[] })
              }
              helperText="Foto detail interior, eksterior, dan progres pengerjaan"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
