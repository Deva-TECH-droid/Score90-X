import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './global.css';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import SideNavBar from '@/components/layout/sidenavbar';

const SITE_URL = 'https://world-cup-score90-x.vercel.app';
const SITE_NAME = 'Score90X';
const TITLE = 'Score90X | FIFA World Cup 2026 Live Scores & Standings';
const DESCRIPTION =
  'Live FIFA World Cup 2026 scores, standings, fixtures, and tournament bracket. Real-time updates, team stats, and top scorer tracking on Score90X.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Score90X',
  },
  description: DESCRIPTION,
  keywords: [
    'FIFA World Cup 2026',
    'World Cup live score',
    'World Cup 2026 standings',
    'World Cup fixtures',
    'football live score',
    'soccer live score',
    'World Cup bracket',
    'World Cup top scorers',
    'Score90X',
  ],
  authors: [{ name: 'Abu Thahir' }],
  creator: 'Abu Thahir',
  publisher: 'Score90X',
  applicationName: SITE_NAME,
  category: 'Sports',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png', // 1200x630 — add this file to /public
        width: 1200,
        height: 630,
        alt: 'Score90X - FIFA World Cup 2026 Live Score Dashboard',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
    // creator: '@your_handle',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  verification: {
    google: '3dIQc71LilzTDca03IrQf_pJ_nQEi8tJtlOLjyxvV_M',
  },

  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#081226',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
       
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <QueryProvider>
          <ThemeProvider defaultTheme="dark">
            <div className="flex h-screen bg-slate-950">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block">
                <SideNavBar />
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                  <Analytics />
                  <Footer />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}