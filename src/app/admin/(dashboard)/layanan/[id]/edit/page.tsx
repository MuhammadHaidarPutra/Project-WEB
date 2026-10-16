'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Loading } from '@/components/ui/Loading';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

const ICON_OPTIONS = [
  { value: 'Home', label: 'Home (Rumah)' },
  { value: 'Building2', label: 'Building (Gedung)' },
  { value: 'Hammer', label: 'Hammer (Renovasi)' },
  { value: 'Palette', label: 'Palette (Interior)' },
  { value: 'Trees', label: 'Trees (Eksterior)' },
  { value: 'ClipboardList', label: 'Clipboard (Konsultasi)' },
];

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'Home',
    order: 1,
    image: '',
    description: '',
    advantages: [] as string[],
    process: [] as string[],
    faq: [] as { q: string; a: string }[],
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let adv: string[] = [];
        try {
          adv = data.advantages ? JSON.parse(data.advantages) : [];
        } catch (e) {
          adv = [data.advantages || ''];
        }

        let proc: string[] = [];
        try {
          proc = data.process ? JSON.parse(data.process) : [];
        } catch (e) {
          proc = [data.process || ''];
        }

        let faqs: { q: string; a: string }[] = [];
        try {
          faqs = data.faq ? JSON.parse(data.faq) : [];
        } catch (e) {
          faqs = [];
        }

        setFormData({
          name: data.name,
          slug: data.slug,
          icon: data.icon || 'Home',
          order: data.order || 1,
          image: data.image || '',
          description: data.description,
          advantages: adv,
          process: proc,
          faq: faqs,
          isActive: data.isActive,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('Gagal memuat layanan');
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

  // Advantage helpers
  const addAdvantage = () => {
    setFormData((prev) => ({
      ...prev,
      advantages: [...prev.advantages, ''],
    }));
  };
  const updateAdvantage = (idx: number, val: string) => {
    const updated = [...formData.advantages];
    updated[idx] = val;
    setFormData((prev) => ({ ...prev, advantages: updated }));
  };
  const removeAdvantage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      advantages: prev.advantages.filter((_, i) => i !== idx),
    }));
  };

  // Process helpers
  const addProcess = () => {
    setFormData((prev) => ({
      ...prev,
      process: [...prev.process, ''],
    }));
  };
  const updateProcess = (idx: number, val: string) => {
    const updated = [...formData.process];
    updated[idx] = val;
    setFormData((prev) => ({ ...prev, process: updated }));
  };
  const removeProcess = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== idx),
    }));
  };

  // FAQ helpers
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { q: '', a: '' }],
    }));
  };
  const updateFaq = (idx: number, field: 'q' | 'a', val: string) => {
    const updated = [...formData.faq];
    updated[idx][field] = val;
    setFormData((prev) => ({ ...prev, faq: updated }));
  };
  const removeFaq = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama layanan wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi layanan wajib diisi';

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
      const payload = {
        ...formData,
        advantages: formData.advantages.filter((a) => a.trim() !== ''),
        process: formData.process.filter((p) => p.trim() !== ''),
        faq: formData.faq.filter((f) => f.q.trim() !== '' && f.a.trim() !== ''),
      };

      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Gagal memperbarui layanan');
      }

      toast.success('Layanan berhasil diperbarui!');
      router.push('/admin/layanan');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading text="Memuat data layanan..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/layanan">
            <Button variant="outline" size="sm" className="px-2.5">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Edit Layanan
            </h1>
            <p className="text-xs text-slate-500">
              Perbarui rincian, tahapan kerja, dan FAQ layanan
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
        {/* Basic info */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-heading">
            Informasi Dasar
          </h3>

          <Input
            label="Nama Layanan *"
            placeholder="Contoh: Desain Interior Komersial"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            error={errors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Ikon Layanan *"
              options={ICON_OPTIONS}
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />

            <Input
              label="Urutan Tampil (Order Number)"
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
            />
          </div>

          <Textarea
            label="Deskripsi Layanan *"
            placeholder="Jelaskan ruang lingkup layanan secara komprehensif..."
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={errors.description}
          />

          <ImageUpload
            label="Foto Header Layanan"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url as string })}
            helperText="Foto representasi layanan di card & detail page"
          />
        </div>

        {/* Advantages */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-heading">
                Keunggulan Layanan (Apa yang Didapat)
              </h3>
              <p className="text-xs text-slate-400">Poin-poin manfaat untuk klien</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAdvantage}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Tambah Poin
            </Button>
          </div>

          <div className="space-y-2.5">
            {formData.advantages.map((adv, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder={`Keunggulan #${idx + 1}`}
                  value={adv}
                  onChange={(e) => updateAdvantage(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeAdvantage(idx)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process stages */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-heading">
                Tahapan Pengerjaan
              </h3>
              <p className="text-xs text-slate-400">Langkah-langkah proses eksekusi</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addProcess}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Tambah Tahap
            </Button>
          </div>

          <div className="space-y-2.5">
            {formData.process.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <Input
                  placeholder={`Tahap #${idx + 1}`}
                  value={step}
                  onChange={(e) => updateProcess(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeProcess(idx)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ list */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-heading">
                Tanya Jawab (FAQ)
              </h3>
              <p className="text-xs text-slate-400">Pertanyaan umum seputar layanan ini</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFaq}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Tambah FAQ
            </Button>
          </div>

          <div className="space-y-4">
            {formData.faq.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 relative">
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="absolute top-2 right-2 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Input
                  label="Pertanyaan"
                  placeholder="Berapa lama waktu desain?"
                  value={item.q}
                  onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                />
                <Textarea
                  label="Jawaban"
                  placeholder="Proses desain berlangsung sekitar 2-4 minggu..."
                  rows={2}
                  value={item.a}
                  onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
