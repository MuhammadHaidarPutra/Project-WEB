import React from 'react';
import Link from 'next/link';
import { PhoneCall, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-slate-950 text-white">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
          Konsultasi Gratis Sekarang
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
          Siap Mewujudkan Bangunan Impian Anda?
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Konsultasikan kebutuhan pembangunan rumah, gedung, renovasi, atau desain interior Anda bersama tim arsitek dan insinyur profesional PT Arcalingga Khatulistiwa.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/konsultasi">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<MessageSquare className="w-5 h-5" />}
              className="bg-slate-950 text-white hover:bg-slate-900 shadow-xl border border-white/10 font-bold"
            >
              Kirim Pesan Konsultasi
            </Button>
          </Link>

          <a
            href="https://wa.me/6281234567890?text=Halo%20PT%20Arcalingga%20Khatulistiwa,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangunan."
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              leftIcon={<PhoneCall className="w-5 h-5" />}
              className="border-white text-white hover:bg-white hover:text-blue-700 font-bold"
            >
              Chat via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
