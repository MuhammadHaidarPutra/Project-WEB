'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Modal } from '@/components/ui/Modal';
import { Category } from '@/types';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CreateArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    thumbnail: '',
    excerpt: '',
    content: '',
    status: 'DRAFT',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugify(val),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Judul artikel wajib diisi';
    if (!formData.categoryId) newErrors.categoryId = 'Pilih kategori artikel';
    if (!formData.content.trim() || formData.content === '<p></p>') {
      newErrors.content = 'Konten artikel tidak boleh kosong';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (publishStatus: 'DRAFT' | 'PUBLISHED') => {
    if (!validate()) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: publishStatus,
        excerpt: formData.excerpt.trim() || formData.title,
      };

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Gagal menyimpan artikel');
      }

      toast.success(
        publishStatus === 'PUBLISHED'
          ? 'Artikel berhasil dipublikasikan!'
          : 'Draf artikel berhasil disimpan!'
      );
      router.push('/admin/artikel');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/artikel">
            <Button variant="outline" size="sm" className="px-2.5">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Tulis Artikel Baru
            </h1>
            <p className="text-xs text-slate-500">
              Gunakan rich editor untuk menyusun konten informatif
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Preview
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isSubmitting}
            onClick={() => handleSubmit('DRAFT')}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Simpan Draf
          </Button>

          <Button
            type="button"
            variant="gold"
            size="sm"
            isLoading={isSubmitting}
            onClick={() => handleSubmit('PUBLISHED')}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Publikasikan
          </Button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Editor & Content) */}
        <div className="lg:col-span-8 space-y-6">
          <Input
            label="Judul Artikel *"
            placeholder="Contoh: 10 Tips Memilih Kontraktor Terpercaya..."
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            error={errors.title}
          />

          {formData.slug && (
            <p className="text-xs text-slate-400 -mt-4">
              URL Slug:{' '}
              <span className="font-mono text-slate-600">/blog/{formData.slug}</span>
            </p>
          )}

          <Textarea
            label="Ringkasan (Excerpt)"
            placeholder="Ringkasan singkat 1-2 kalimat untuk preview card..."
            rows={2}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            helperText="Jika dikosongkan, akan otomatis menggunakan judul artikel"
          />

          <RichTextEditor
            label="Konten Artikel *"
            value={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
            error={errors.content}
          />
        </div>

        {/* Right Sidebar (Settings & Thumbnail) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 font-heading">
              Pengaturan Publikasi
            </h3>

            <Select
              label="Kategori Artikel *"
              placeholder="-- Pilih Kategori --"
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              error={errors.categoryId}
            />

            <ImageUpload
              label="Gambar Utama (Thumbnail)"
              value={formData.thumbnail}
              onChange={(url) =>
                setFormData({ ...formData, thumbnail: url as string })
              }
              helperText="Rekomendasi rasio 16:9 atau 4:3 (JPG, PNG, WebP)"
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Preview Tampilan Artikel"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            {formData.title || 'Judul Artikel Kosong'}
          </h1>
          {formData.thumbnail && (
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.thumbnail}
                alt="Preview Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {formData.excerpt && (
            <p className="text-sm italic text-slate-600 border-l-4 border-amber-500 pl-3 py-1 bg-amber-50/50">
              {formData.excerpt}
            </p>
          )}
          <div
            className="prose-custom pt-4"
            dangerouslySetInnerHTML={{
              __html: formData.content || '<p class="text-slate-400">Konten belum diisi...</p>',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
