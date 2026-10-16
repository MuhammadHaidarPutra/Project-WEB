import React from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { StatsSection } from '@/components/public/StatsSection';
import { CTASection } from '@/components/public/CTASection';

export const metadata = {
  title: 'Tentang Kami',
  description: 'Profil, sejarah, visi misi, dan tim profesional PT Arca Lingga Khatulistiwa.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Integritas & Kejujuran',
      desc: 'Transparansi penuh dalam penggunaan material, penyusunan anggaran (RAB), dan laporan progres pekerjaan.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Presisi & Kualitas Mutu',
      desc: 'Setiap sudut rancangan dieksekusi dengan perhitungan teknis teliti dan kontrol kualitas bertahap.',
      icon: <Award className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Kepuasan & Kemitraan Klien',
      desc: 'Membangun relasi jangka panjang dengan mendengar setiap aspirasi dan memberikan garansi purna jual.',
      icon: <Users className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Inovasi Berkelanjutan',
      desc: 'Menerapkan teknologi perancangan BIM terkini, material ramah lingkungan, dan efisiensi energi.',
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
    },
  ];

  const timeline = [
    {
      year: '2014',
      title: 'Awal Pendirian',
      desc: 'Didirikan sebagai biro konsultan desain arsitektur dan renovasi rumah tinggal di Jakarta.',
    },
    {
      year: '2017',
      title: 'Ekspansi Kontraktor Umum',
      desc: 'Meningkatkan layanan menjadi general contractor untuk pembangunan rumah tinggal mewah dan ruko komersial.',
    },
    {
      year: '2020',
      title: 'Penerapan Teknologi Digital',
      desc: 'Mengintegrasikan perancangan 3D rendering fotorealistik dan sistem manajemen mutu terstandarisasi.',
    },
    {
      year: '2024',
      title: 'Pencapaian 100+ Proyek',
      desc: 'Telah berhasil menyelesaikan lebih dari 100 proyek prestisius di berbagai kota besar di Indonesia.',
    },
  ];

  const team = [
    {
      name: 'Ir. Hendra Pratama, M.T., IAI',
      role: 'Principal Architect & Founder',
      desc: '15+ tahun pengalaman dalam perancangan arsitektur tropis modern dan hunian eksklusif.',
    },
    {
      name: 'Bambang Sudibyo, S.T.',
      role: 'Head of Civil & Structure Engineering',
      desc: 'Ahli struktur bangunan bertingkat dan perhitungan ketahanan gempa bersertifikasi.',
    },
    {
      name: 'Clarissa Amanda, S.Ds.',
      role: 'Lead Interior Designer',
      desc: 'Spesialis desain interior mewah minimalis, tata ruang ergonomis, dan visual styling.',
    },
    {
      name: 'Wahyu Nugroho',
      role: 'Senior Project Manager & Field Director',
      desc: 'Memimpin pelaksanaan lapangan, pengawasan mutu harian, dan ketepatan timeline konstruksi.',
    },
  ];

  return (
    <div className="pt-24 md:pt-28">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Mengenal Lebih Dekat
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Tentang Arca Lingga Khatulistiwa
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Merancang dengan presisi, membangun dengan integritas untuk menghadirkan mahakarya bangunan terbaik di Indonesia.
          </p>
        </div>
      </section>

      {/* Stats teaser */}
      <StatsSection />

      {/* Company Profile Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
                Profil Perusahaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading leading-tight">
                Dedikasi Satu Dekade Membangun Bangunan Impian
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                PT Arca Lingga Khatulistiwa berdiri dengan komitmen utama: memberikan rasa tenang dan kepuasan mutlak bagi setiap pemilik properti. Kami menyadari bahwa membangun atau merenovasi rumah adalah salah satu investasi terbesar dalam hidup Anda.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Oleh karena itu, kami menyingkirkan kekhawatiran klasik seperti pembengkakan anggaran tak terduga, kualitas material yang diturunkan, atau proyek yang molor tanpa kepastian. Di Arca Lingga Khatulistiwa, setiap milimeter struktur dihitung cermat dan dikerjakan secara profesional.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="/images/project-1.jpg"
                  alt="Proyek Arca Lingga Khatulistiwa"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Visi, Misi & Landasan Kami
            </h2>
            <p className="text-base text-slate-600">
              Prinsip-prinsip yang memandu setiap langkah kami dalam merancang dan membangun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Visi Kami
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi perusahaan jasa konstruksi dan desain bangunan terdepan, paling tepercaya, dan bereputasi prima di Indonesia dengan mengintegrasikan keindahan arsitektur, ketahanan struktur, dan kepuasan pelanggan tiada tanding.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Misi Kami
              </h3>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                  <span>Memberikan hasil konstruksi berkualitas tinggi sesuai standar SNI & perundangan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                  <span>Menyajikan estimasi biaya transparan, tanpa biaya siluman di tengah pengerjaan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                  <span>Menyelesaikan setiap proyek tepat waktu dengan pengawasan mutu berlapis.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Perusahaan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
              Nilai Perusahaan
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Fondasi Utama Integritas Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-amber-400/60 hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white shadow-sm inline-block">
                  {v.icon}
                </div>
                <h4 className="text-lg font-bold font-heading text-slate-900">
                  {v.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah & Timeline */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              Perjalanan Kami
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Sejarah Perkembangan Arca Lingga Khatulistiwa
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-950 group-hover:scale-125 transition-transform" />
                <div className="hidden md:block absolute -left-32 top-0 text-amber-400 font-bold font-heading text-lg">
                  {item.year}
                </div>
                <div className="md:hidden text-amber-400 font-bold text-sm mb-1">
                  Tahun {item.year}
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-lg font-bold font-heading text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim Profesional */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
              Para Ahli di Balik Mahakarya
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Tim Profesional Arca Lingga Khatulistiwa
            </h2>
            <p className="text-base text-slate-600">
              Didukung oleh arsitek bersertifikat IAI, insinyur struktur berlisensi, dan manajemen proyek berpengalaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-amber-400 font-bold text-xl flex items-center justify-center mb-4 shadow-md font-heading">
                    {member.name.slice(0, 2)}
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5 mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
