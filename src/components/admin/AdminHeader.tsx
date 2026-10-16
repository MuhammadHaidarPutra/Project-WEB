'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, ShieldCheck } from 'lucide-react';

const pathTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard Ikhtisar',
  '/admin/artikel': 'Kelola Artikel & Tips',
  '/admin/artikel/buat': 'Tulis Artikel Baru',
  '/admin/kategori': 'Kelola Kategori Artikel',
  '/admin/portofolio': 'Kelola Portofolio Proyek',
  '/admin/portofolio/buat': 'Tambah Proyek Baru',
  '/admin/layanan': 'Kelola Layanan',
  '/admin/layanan/buat': 'Tambah Layanan Baru',
  '/admin/konsultasi': 'Pesan Masuk Konsultasi',
  '/admin/pengaturan': 'Pengaturan Profil Perusahaan',
};

export function AdminHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  let userName = 'Administrator';

  try {
    const sessionRes = useSession();
    if (sessionRes?.data?.user?.name) {
      userName = sessionRes.data.user.name;
    }
  } catch (e) {
    // SSR safe fallback
  }

  const getPageTitle = () => {
    if (pathTitles[pathname]) return pathTitles[pathname];
    if (pathname.includes('/admin/artikel/') && pathname.includes('/edit'))
      return 'Edit Artikel';
    if (pathname.includes('/admin/portofolio/') && pathname.includes('/edit'))
      return 'Edit Proyek';
    if (pathname.includes('/admin/layanan/') && pathname.includes('/edit'))
      return 'Edit Layanan';
    return 'Admin Panel';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left Title & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-none">
            {getPageTitle()}
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
            PT Arca Lingga Khatulistiwa • Dashboard CMS
          </p>
        </div>
      </div>

      {/* Right User Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs font-heading">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">
              {userName}
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
