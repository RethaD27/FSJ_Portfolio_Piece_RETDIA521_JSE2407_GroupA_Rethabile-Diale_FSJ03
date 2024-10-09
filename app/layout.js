import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Head from 'next/head';
import ErrorBoundary from './components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata configuration for the QuickCart Emporium site.
 * 
 * This metadata includes page title, description, Open Graph details, and Twitter card information
 * to improve SEO and social media link previews.
 * 
 * @type {Object}
 * @property {Object} title - The title configuration, including the default title and template for dynamic titles.
 * @property {string} description - A short description of the site.
 * @property {Object} icons - Icons for the site, including the favicon.
 * @property {Object} openGraph - Open Graph metadata for social media sharing.
 * @property {string} openGraph.title - The default Open Graph title.
 * @property {string} openGraph.description - The Open Graph description.
 * @property {string} openGraph.url - The URL of the site.
 * @property {string} openGraph.siteName - The name of the website.
 * @property {Array} openGraph.images - An array of images used for Open Graph previews.
 * @property {string} openGraph.locale - The locale of the site, defaulting to 'en_US'.
 * @property {string} openGraph.type - The type of site, which is 'website' for this project.
 * @property {Object} twitter - Twitter metadata for card previews.
 * @property {string} twitter.card - The Twitter card type, set to 'summary_large_image'.
 * @property {string} twitter.title - The title for Twitter previews.
 * @property {string} twitter.description - The description for Twitter previews.
 * @property {Array} twitter.images - An array of images for Twitter previews.
 * @property {string} twitter.creator - The Twitter username of the site creator.
 */
export const metadata = {
  title: {
    default: 'QuickCart Emporium | Your One-Stop Shop',
    template: '%s | QuickCart Emporium',
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
        alt: 'QuickCart Emporium',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickCart Emporium | Your One-Stop Shop',
    description: 'Discover amazing products at great prices on QuickCart Emporium.',
    images: ['/og-image.jpg'],
    creator: '@quickcartemporium',
  },
};

/**
 * Root layout component for the application.
 * 
 * This component wraps the entire application, providing global styles, a header, and an error boundary.
 * It includes SEO-related metadata and ensures that the layout is responsive and visually appealing.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout of the application.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QuickCart Emporium" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body className={`${inter.className} font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen`}>
        <Header />
        <ErrorBoundary>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
