import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PhoneCall, ShieldCheck, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Company Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="PT Arca Lingga Khatulistiwa Proyek Bangunan & Arsitektur"
          fill
          priority
          className="object-cover object-center scale-100 transition-transform duration-1000"
        />
        {/* Deep navy & blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent lg:from-slate-950/85 lg:via-slate-950/45 lg:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-blue-400/50 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-blue-500/10">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              PT Arca Lingga Khatulistiwa • General Contractor & Architecture
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white drop-shadow-md">
              Membangun Ruang,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400">
                Mewujudkan Impian
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-sm">
              Solusi konstruksi terpadu, arsitektur modern, dan renovasi terpercaya bersama PT Arca Lingga Khatulistiwa untuk mewujudkan bangunan kokoh, estetis, dan bernilai investasi tinggi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/konsultasi">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<PhoneCall className="w-5 h-5" />}
                  className="shadow-xl shadow-blue-600/35 font-bold bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Konsultasi Sekarang
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="white"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="font-bold shadow-xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Lihat Portofolio
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-blue-500/30">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Garansi 2 Thn</p>
                  <p className="text-slate-300 text-[11px]">Struktur</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-blue-500/30">
                <Award className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">SNI Standar</p>
                  <p className="text-slate-300 text-[11px]">Material Mutu</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-blue-500/30">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Tepat Waktu</p>
                  <p className="text-slate-300 text-[11px]">Sesuai Timeline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Card / Quick Highlights */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative p-6 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Arca Lingga Snapshot</h3>
                  <p className="text-xs text-blue-400 font-medium">Ringkasan Kinerja Proyek</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-200 font-medium">Tingkat Kepuasan Klien</span>
                  <span className="text-sm font-extrabold text-blue-400 font-heading">99.4%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-200 font-medium">Ketepatan Waktu Proyek</span>
                  <span className="text-sm font-extrabold text-blue-400 font-heading">98.8%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-200 font-medium">Jangkauan Wilayah</span>
                  <span className="text-sm font-extrabold text-white font-heading">Seluruh Indonesia</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/tentang"
                  className="text-xs text-blue-300 hover:text-blue-200 font-bold inline-flex items-center gap-1.5 group"
                >
                  Pelajari profil lengkap kami
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
