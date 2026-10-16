'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Portofolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Konsultasi', href: '/konsultasi' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-black/30 border-b border-blue-500/20 py-2.5'
          : 'bg-slate-950/85 backdrop-blur-sm border-b border-slate-800/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand with Official Symbol */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-black border border-blue-500/40 p-0.5 shadow-lg shadow-blue-600/30 group-hover:border-blue-400 group-hover:shadow-blue-500/50 transition-all">
              <Image
                src="/images/arca-logo-official.png"
                alt="PT Arca Lingga Khatulistiwa"
                fill
                sizes="44px"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-heading block leading-none">
                PT ARCA LINGGA <span className="text-blue-400">KHATULISTIWA</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold mt-0.5 block">
                General Contractor & Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-blue-600/15 font-bold border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/konsultasi" className="hidden sm:inline-block">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<PhoneCall className="w-4 h-4" />}
                className="font-bold shadow-lg shadow-blue-600/30 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600"
              >
                Konsultasi Gratis
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[62px] bg-slate-950/98 border-b border-slate-800 shadow-2xl py-6 px-6 max-h-[calc(100vh-62px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-400 bg-blue-600/15 font-bold border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <Link href="/konsultasi">
                <Button variant="primary" className="w-full justify-center bg-blue-600 hover:bg-blue-500 font-bold">
                  Konsultasi Sekarang
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="w-full justify-center text-xs text-slate-400 border-slate-800 hover:bg-slate-900">
                  Login Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
