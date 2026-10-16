'use client';

import React, { useState } from 'react';
import { Save, Building2, Phone, Mail, MapPin, Clock, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'PT Arca Lingga Khatulistiwa',
    brandName: 'ARCA LINGGA KHATULISTIWA',
    slogan: 'Merancang dengan Presisi, Membangun dengan Integritas',
    phone: '+62 812-3456-7890',
    whatsapp: '6281234567890',
    email: 'kontak@arcalinggakhatulistiwa.com',
    address: 'Jl. Jenderal Sudirman Kav. 52-53, SCBD, Jakarta Selatan, 12190',
    workingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    instagram: 'https://instagram.com/arcalinggakhatulistiwa',
    facebook: 'https://facebook.com/arcalinggakhatulistiwa',
    linkedin: 'https://linkedin.com/company/arca-lingga-khatulistiwa',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Pengaturan perusahaan berhasil diperbarui!');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Pengaturan Profil Perusahaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sesuaikan informasi kontak, nomor WhatsApp hotline, alamat kantor, dan media sosial.
          </p>
        </div>

        <Button
          type="button"
          variant="gold"
          isLoading={isSaving}
          onClick={handleSave}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Simpan Pengaturan
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-amber-700 pb-2 border-b border-slate-100">
            <Building2 className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
              Identitas Brand
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Nama PT / Legalitas"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
            />

            <Input
              label="Nama Brand Display"
              value={settings.brandName}
              onChange={(e) =>
                setSettings({ ...settings, brandName: e.target.value })
              }
            />
          </div>

          <Input
            label="Slogan / Tagline"
            value={settings.slogan}
            onChange={(e) =>
              setSettings({ ...settings, slogan: e.target.value })
            }
          />
        </div>

        {/* Kontak & Hotline */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-amber-700 pb-2 border-b border-slate-100">
            <Phone className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
              Kontak & Operasional
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Nomor WhatsApp Hotline"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
              helperText="Format angka diawali kode negara tanpa + (Contoh: 6281234567890)"
            />

            <Input
              label="Telepon Kantor"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Email Resmi"
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
            />

            <Input
              label="Jam Operasional"
              value={settings.workingHours}
              onChange={(e) =>
                setSettings({ ...settings, workingHours: e.target.value })
              }
            />
          </div>

          <Textarea
            label="Alamat Kantor Pusat"
            rows={2}
            value={settings.address}
            onChange={(e) =>
              setSettings({ ...settings, address: e.target.value })
            }
          />
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-amber-700 pb-2 border-b border-slate-100">
            <Globe className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
              Tautan Media Sosial
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Instagram URL"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
            />

            <Input
              label="Facebook URL"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({ ...settings, facebook: e.target.value })
              }
            />

            <Input
              label="LinkedIn URL"
              value={settings.linkedin}
              onChange={(e) =>
                setSettings({ ...settings, linkedin: e.target.value })
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}
