import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingProps {
  text?: string;
  fullPage?: boolean;
}

export function Loading({ text = 'Memuat data...', fullPage = false }: LoadingProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm animate-pulse">
      <div className="w-full h-48 bg-slate-200 rounded-lg mb-4" />
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-200 rounded w-full mb-2" />
      <div className="h-4 bg-slate-200 rounded w-2/3" />
    </div>
  );
}
