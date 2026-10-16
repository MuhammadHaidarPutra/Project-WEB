'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  FolderGit2,
  Briefcase,
  MessageSquareText,
  Settings,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Artikel / Blog', href: '/admin/artikel', icon: FileText },
  { name: 'Kategori Artikel', href: '/admin/kategori', icon: FolderTree },
  { name: 'Portofolio Proyek', href: '/admin/portofolio', icon: FolderGit2 },
  { name: 'Layanan', href: '/admin/layanan', icon: Briefcase },
  { name: 'Pesan Konsultasi', href: '/admin/konsultasi', icon: MessageSquareText },
  { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
];

export function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    toast.loading('Keluar dari sesi...');
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header with Official Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black border border-blue-500/40 p-0.5 shadow-md shadow-blue-600/30">
              <Image
                src="/images/arca-logo-official.png"
                alt="PT Arca Lingga Khatulistiwa"
                fill
                sizes="36px"
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white font-heading block leading-none">
                ARCA LINGGA
              </span>
              <span className="text-[10px] text-blue-400 font-semibold block mt-0.5 uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Menu Utama
          </p>
          {menuItems.map((item) => {
            const isActive =
              item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard'
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Lihat Website Live
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
