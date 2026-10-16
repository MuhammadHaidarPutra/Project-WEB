import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "ARCA LINGGA KHATULISTIWA — Merancang dengan Presisi, Membangun dengan Integritas",
    template: "%s | ARCA LINGGA KHATULISTIWA",
  },
  description: "PT Arca Lingga Khatulistiwa adalah perusahaan kontraktor & konstruksi profesional terpercaya di Indonesia. Melayani jasa desain rumah, pembangunan gedung, renovasi, arsitektur, interior & eksterior.",
  keywords: ["kontraktor indonesia", "jasa bangun rumah", "renovasi rumah", "desain interior", "arsitektur", "arca lingga khatulistiwa"],
  authors: [{ name: "ARCA LINGGA KHATULISTIWA" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "ARCA LINGGA KHATULISTIWA",
    title: "ARCA LINGGA KHATULISTIWA — Jasa Kontraktor & Desain Bangunan Profesional",
    description: "Solusi konstruksi, desain, dan renovasi terpercaya untuk mewujudkan bangunan berkualitas tinggi.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "ARCA LINGGA KHATULISTIWA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCA LINGGA KHATULISTIWA — Jasa Kontraktor & Desain Bangunan",
    description: "Solusi konstruksi, desain, dan renovasi terpercaya untuk mewujudkan bangunan berkualitas tinggi.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f172a",
              color: "#f8fafc",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#d97706",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
