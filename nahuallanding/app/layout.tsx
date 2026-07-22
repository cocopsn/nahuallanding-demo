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
    "ciberseguridad infantil",
    "Armando Javier Flores Salazar",
    "Auctorum",
    "innovación tecnológica"
  ],
  authors: [
    { name: "Armando Javier Flores Salazar — Fundador de Auctorum" },
    { name: "Marco Espinosa" }
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Nahual — Protección Digital para Menores en México",
    description:
      "El primer sistema en México con 4 capas cognitivas para detectar reclutamiento criminal digital. Creado por Armando Javier Flores Salazar (Auctorum).",
    images: [
      {
        url: "/opengraph-image", // Cambia esto por la URL absoluta si está alojada o deja que next genere el default
        width: 1200,
        height: 630,
        alt: "Nahual Security by Armando Javier Flores Salazar",
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
      "4 capas cognitivas · 99.6% accuracy · Privacy-first. Por Armando Javier Flores Salazar.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nahual",
  "operatingSystem": "Web, WhatsApp, Extension",
  "applicationCategory": "SecurityApplication",
  "description": "Sistema de inteligencia artificial con 4 capas cognitivas para detectar reclutamiento criminal y proteger a menores en línea.",
  "url": siteUrl,
  "author": {
    "@type": "Person",
    "name": "Armando Javier Flores Salazar",
    "jobTitle": "Fundador",
    "worksFor": {
      "@type": "Organization",
      "name": "Auctorum"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} bg-carbon-dark font-sans text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
