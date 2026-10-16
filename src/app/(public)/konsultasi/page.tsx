import React, { Suspense } from 'react';
import { ConsultationForm } from './ConsultationForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Loading } from '@/components/ui/Loading';

export const metadata = {
  title: 'Konsultasi Bangunan & Estimasi Biaya',
  description: 'Hubungi tim PT Arca Lingga Khatulistiwa untuk konsultasi gratis rancang bangun, renovasi rumah, dan estimasi Rencana Anggaran Biaya (RAB).',
};

export default function ConsultationPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Layanan Konsultasi
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Konsultasi & Estimasi Proyek
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Diskusikan rencana pembangunan atau renovasi Anda. Tim ahli PT Arca Lingga Khatulistiwa siap memberikan solusi desain dan estimasi biaya terbaik.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column with Suspense */}
            <div className="lg:col-span-7">
              <Suspense fallback={<Loading text="Memuat formulir konsultasi..." />}>
                <ConsultationForm />
              </Suspense>
            </div>

            {/* Info & Direct Contacts */}
            <div className="lg:col-span-5 space-y-8">
              {/* WhatsApp Fast Track Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Respon Cepat via WhatsApp
                </h3>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  Butuh respon instan atau ingin langsung mengirim denah lahan Anda? Hubungi arsitek kami melalui WhatsApp resmi.
                </p>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Arca%20Lingga%20Khatulistiwa,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangunan."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block w-full text-center py-3 px-6 rounded-xl bg-white text-emerald-800 font-bold text-sm hover:bg-emerald-50 transition-colors shadow-md cursor-pointer"
                >
                  Chat WhatsApp Sekarang (+62 812-3456-7890)
                </a>
              </div>

              {/* Office Details */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Kantor & Operasional
                </h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Kantor Pusat</p>
                      <p className="text-slate-500">
                        Jl. Jenderal Sudirman Kav. 52-53, SCBD, Jakarta Selatan, 12190
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Telepon</p>
                      <p className="text-slate-500">+62 812-3456-7890 / (021) 555-0199</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Email Resmi</p>
                      <p className="text-slate-500">kontak@arcalinggakhatulistiwa.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Jam Layanan</p>
                      <p className="text-slate-500">Senin - Sabtu: 08.00 - 17.00 WIB</p>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Kerahasiaan Data Terjamin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Konsultan Berpengalaman</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
