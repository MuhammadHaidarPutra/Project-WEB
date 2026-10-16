'use client';

import React from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Tautan berhasil disalin ke clipboard!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Baca artikel menarik dari Arca Lingga Khatulistiwa: "${title}"\n\n${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
      <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <Share2 className="w-4 h-4 text-amber-600" />
        Bagikan Artikel Ini:
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShareWhatsApp}
          className="text-emerald-700 hover:bg-emerald-50 border-emerald-200"
        >
          WhatsApp
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
        >
          {copied ? 'Tersalin!' : 'Salin Tautan'}
        </Button>
      </div>
    </div>
  );
}
