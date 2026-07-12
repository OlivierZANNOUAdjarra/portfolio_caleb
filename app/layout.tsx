import type { Metadata } from 'next';
import { Montserrat, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { LanguageProvider } from '@/lib/language-context';
import ScrollProgress from '@/components/ScrollProgress';
import SiteHeader from '@/components/SiteHeader';
import AIAssistant from '@/components/AIAssistant';
import WelcomeLoader from '@/components/WelcomeLoader';

const display = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://caleb-creative.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caleb Creative — Là où l'imagination devient réalité",
    template: '%s — Caleb Creative',
  },
  description:
    "Images, vidéos, design et innovation propulsés par l'intelligence artificielle. Caleb Jesugnon AGBAKOU transforme vos idées en réalisations d'exception.",
  keywords: [
    'Caleb Creative',
    'création IA',
    'design Bénin',
    'motion design',
    'montage vidéo',
    'Midjourney',
    'Runway',
    'création de logo',
  ],
  authors: [{ name: 'Caleb Jesugnon AGBAKOU' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Caleb Creative',
    title: "Caleb Creative — Là où l'imagination devient réalité",
    description:
      "Images, vidéos, design et innovation propulsés par l'intelligence artificielle.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Caleb Creative',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Caleb Creative — Là où l'imagination devient réalité",
    description:
      "Images, vidéos, design et innovation propulsés par l'intelligence artificielle.",
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`dark ${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen overflow-x-hidden bg-paper font-body text-ink transition-colors dark:bg-paper-dark dark:text-paper">
        <ThemeProvider>
          <LanguageProvider>
            <WelcomeLoader />
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 -z-10 bg-aurora-gradient"
            />
            <ScrollProgress />
            <SiteHeader />
            <AIAssistant />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}