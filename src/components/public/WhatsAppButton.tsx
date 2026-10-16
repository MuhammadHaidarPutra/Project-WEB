'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Halo%20Arca%20Lingga%20Khatulistiwa,%20saya%20tertarik%20untuk%20konsultasi%20layanan%20konstruksi."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
        Tanya Kami via WhatsApp
      </span>
    </a>
  );
}
