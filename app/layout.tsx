import type { Metadata } from 'next';
import { DM_Sans, Libre_Baskerville } from 'next/font/google';
import './globals.css';

const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] });
const serif = Libre_Baskerville({ variable: '--font-serif', weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://twelve-grapes-gippsland-eoi.rowanjpaterson.chatgpt.site'),
  title: {
    default: '12Grapes Vineyard Services | Gippsland',
    template: '%s | 12Grapes',
  },
  description: 'Practical vineyard services, specialist equipment and mechanical undervine management for Gippsland growers.',
  openGraph: {
    title: '12Grapes Vineyard Services',
    description: 'Supporting Gippsland vineyards all year round.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: '12Grapes herbicide-free vineyard care in Gippsland' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '12Grapes Vineyard Services',
    description: 'Supporting Gippsland vineyards all year round.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
