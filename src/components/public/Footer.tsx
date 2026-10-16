import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Share2,
  Send,
  MessageCircle,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Desain Rumah', href: '/layanan/desain-rumah' },
    { name: 'Pembangunan Rumah', href: '/layanan/pembangunan-rumah' },
    { name: 'Renovasi Rumah & Gedung', href: '/layanan/renovasi' },
    { name: 'Desain Interior', href: '/layanan/desain-interior' },
    { name: 'Desain Eksterior & Landscape', href: '/layanan/desain-eksterior' },
    { name: 'Konsultasi Konstruksi & RAB', href: '/layanan/konsultasi-konstruksi' },
  ];

  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Perusahaan', href: '/tentang' },
    { name: 'Portofolio Proyek', href: '/portfolio' },
    { name: 'Artikel & Tips', href: '/blog' },
    { name: 'Formulir Konsultasi', href: '/konsultasi' },
    { name: 'Admin Dashboard', href: '/admin/login' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-blue-500/40 p-1 shadow-lg shadow-blue-500/20">
                <Image
                  src="/images/arca-logo-official.png"
                  alt="PT Arca Lingga Khatulistiwa"
                  fill
                  sizes="48px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                PT ARCA LINGGA <span className="text-blue-400">KHATULISTIWA</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              PT Arca Lingga Khatulistiwa adalah perusahaan kontraktor umum, arsitektur, dan desain interior terpercaya. Merancang dengan presisi, membangun dengan integritas tinggi untuk seluruh wilayah Indonesia.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="mailto:kontak@arcalinggakhatulistiwa.com"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="Email"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading text-blue-400">
              Layanan Kami
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading text-blue-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading text-blue-400">
              Kontak & Kantor
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan, 12190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>kontak@arcalinggakhatulistiwa.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} PT Arca Lingga Khatulistiwa. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link href="/tentang" className="hover:text-slate-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/tentang" className="hover:text-slate-400 transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/admin/login" className="hover:text-blue-400 transition-colors">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
