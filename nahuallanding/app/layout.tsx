import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

// @ts-ignore
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const siteUrl = "https://www.nahualsec.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nahual — Detección de Reclutamiento Criminal Digital en Menores",
  description:
    "Sistema de 4 capas cognitivas (heurístico, bayesiano, LLM y trayectoria) para detectar captación criminal en WhatsApp, Instagram, Discord y Roblox. Protege a menores de grooming y reclutamiento con 99.6% de precisión.",
  keywords: [
    "reclutamiento criminal",
    "detección menores",
    "México",
    "sextorsión",
    "WhatsApp bot",
    "clasificador de riesgo",
    "Bayesian Naive",
    "Claude API",
    "grooming",
    "ciberseguridad infantil"
  ],
  authors: [{ name: "Equipo Vanguard — Armando Flores & Marco Espinosa" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Nahual — Protección Digital para Menores en México",
    description:
      "El primer sistema en México con 4 capas cognitivas para detectar reclutamiento criminal digital. Análisis heurístico (900 patrones) + Naive Bayes + IA (Claude).",
    images: [
      {
        url: "/opengraph-image", // Cambia esto por la URL absoluta si está alojada o deja que next genere el default
        width: 1200,
        height: 630,
        alt: "Nahual Security",
      }
    ],
    locale: "es_MX",
    type: "website",
    siteName: "Nahual",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahual — Detección de reclutamiento criminal en menores",
    description:
      "4 capas cognitivas · 900 patrones · 99.6% accuracy · Bot WhatsApp + panel web · Privacy-first (Art. 16 CPEUM).",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "Añade-tu-codigo-google-site-verification-aqui", // Reemplazar en search console
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body
        className={`${inter.variable} ${mono.variable} bg-carbon-dark font-sans text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
