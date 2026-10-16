'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  FolderGit2,
  Briefcase,
  MessageSquareText,
  TrendingUp,
  Plus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { DashboardStats } from '@/types';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Gagal mengambil data statistik');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error('Gagal memuat metrik dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading || !stats) {
    return <Loading text="Menyiapkan data dashboard..." />;
  }

  const metricCards = [
    {
      title: 'Total Artikel',
      value: stats.totalPosts,
      desc: 'Artikel aktif terpublikasi',
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-600',
      href: '/admin/artikel',
    },
    {
      title: 'Portofolio Proyek',
      value: stats.totalProjects,
      desc: 'Karya proyek tayang',
      icon: FolderGit2,
      color: 'bg-indigo-500/10 text-indigo-600',
      href: '/admin/portofolio',
    },
    {
      title: 'Layanan Konstruksi',
      value: stats.totalServices,
      desc: 'Paket & jasa aktif',
      icon: Briefcase,
      color: 'bg-sky-500/10 text-sky-600',
      href: '/admin/layanan',
    },
    {
      title: 'Permintaan Konsultasi',
      value: stats.totalConsultations,
      desc: `${stats.newConsultations} pesan baru butuh respon`,
      icon: MessageSquareText,
      color: 'bg-blue-600/10 text-blue-600',
      badge: stats.newConsultations > 0 ? `${stats.newConsultations} Baru` : undefined,
      href: '/admin/konsultasi',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            PT ARCA LINGGA KHATULISTIWA
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Selamat Datang di Panel Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Kelola artikel edukasi, dokumentasi portofolio proyek, penawaran layanan, serta pesan konsultasi klien dari satu pusat kendali.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2.5">
          <Link href="/admin/artikel/buat">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-500 font-bold"
            >
              Tulis Artikel
            </Button>
          </Link>
          <Link href="/admin/portofolio/buat">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              className="text-white border-blue-400/30 bg-slate-900/60 hover:bg-slate-800"
            >
              Tambah Proyek
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} href={card.href} className="group">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-400/60 transition-all duration-200 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {card.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 animate-pulse">
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Chart & Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recharts Consultation Volume */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Tren Permintaan Konsultasi (6 Bulan)
              </h3>
              <p className="text-xs text-slate-400">
                Aktivitas calon klien yang mengajukan proyek lewat website
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.monthlyConsultations}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1120',
                    borderRadius: '0.75rem',
                    border: '1px solid #1e3a8a',
                    color: '#ffffff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Recent Consultation Messages */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Konsultasi Terbaru
                </h3>
                <p className="text-xs text-slate-400">Pesan calon klien yang baru masuk</p>
              </div>
              <Link
                href="/admin/konsultasi"
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {stats.recentConsultations.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  Belum ada pesan konsultasi yang masuk.
                </p>
              ) : (
                stats.recentConsultations.slice(0, 4).map((c) => (
                  <div key={c.id} className="py-3 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-blue-700 font-semibold">{c.service}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {c.message}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {getStatusLabel(c.status)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link href="/admin/konsultasi" className="block">
              <Button variant="outline" size="sm" className="w-full justify-center text-xs text-blue-600 border-blue-200 hover:bg-blue-50">
                Kelola Semua Pesan Konsultasi
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900">
              Artikel & Edukasi Terbaru
            </h3>
            <p className="text-xs text-slate-400">Konten publikasi blog paling baru</p>
          </div>
          <Link
            href="/admin/artikel"
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Semua Artikel ({stats.totalPosts})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                <th className="pb-3">Judul Artikel</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Tanggal Buat</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-slate-900 max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {post.category?.name || '-'}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getStatusColor(
                        post.status
                      )}`}
                    >
                      {getStatusLabel(post.status)}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/artikel/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 font-bold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
