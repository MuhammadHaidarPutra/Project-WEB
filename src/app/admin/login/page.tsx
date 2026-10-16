'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@arcalinggakhatulistiwa.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Email atau password tidak sesuai.');
        toast.error('Gagal masuk. Periksa kembali kredensial Anda.');
        setIsLoading(false);
        return;
      }

      toast.success('Login berhasil! Mengalihkan ke dashboard...');
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
      toast.error('Terjadi gangguan saat memproses login.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Royal blue glow shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-4">
        {/* Official Brand Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-black border border-blue-500/40 p-2 shadow-2xl shadow-blue-600/40">
          <div className="relative w-full h-full">
            <Image
              src="/images/arca-logo-official.png"
              alt="PT Arca Lingga Khatulistiwa"
              fill
              sizes="96px"
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight">
            ARCA LINGGA <span className="text-blue-400">ADMIN</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Portal Pengelolaan Konten & CMS PT Arca Lingga Khatulistiwa
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-100 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email Administrator"
              type="email"
              placeholder="admin@arcalinggakhatulistiwa.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-blue-600" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-blue-600" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-lg shadow-blue-600/30 font-bold mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Masuk ke Dashboard
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Demo Kredensial: <span className="font-mono text-slate-700 font-semibold">admin@arcalinggakhatulistiwa.com</span> / <span className="font-mono text-slate-700 font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
