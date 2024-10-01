import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'QuickCart Emporium | Your One-Stop Shop',
    template: '%s | QuickCart Emporium'
  },
  description: 'Discover amazing products at great prices on QuickCart Emporium.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'QuickCart Emporium | Your One-Stop Shop',
    description: 'Discover amazing products at great prices on QuickCart Emporium.',
    url: 'https://quickcart-emporium.vercel.app',
    siteName: 'QuickCart Emporium',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'QuickCart Emporium'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickCart Emporium | Your One-Stop Shop',
    description: 'Discover amazing products at great prices on QuickCart Emporium.',
    images: ['/og-image.jpg'],
    creator: '@quickcartemporium'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}