import './globals.css';
import Header from './components/Header';

/**
 * Metadata for the QuickCart Emporium project.
 * @type {Object}
 * @property {Object} title - Default title and template for the page.
 * @property {string} title.default - The default title of the page.
 * @property {string} title.template - The title template format for dynamic pages.
 * @property {string} description - The meta description for the site.
 * @property {Object} openGraph - Open Graph data for social media sharing.
 * @property {string} openGraph.title - The Open Graph title for the site.
 * @property {string} openGraph.description - The Open Graph description for the site.
 * @property {string} openGraph.type - The type of content (e.g., website).
 * @property {string} openGraph.url - The URL of the site.
 * @property {string} openGraph.siteName - The name of the website.
 * @property {Object} twitter - Twitter card data for social sharing.
 * @property {string} twitter.card - The type of Twitter card (summary_large_image).
 * @property {string} twitter.site - The Twitter handle for the site.
 * @property {string} twitter.creator - The Twitter handle of the content creator.
 */
export const metadata = {
  title: {
    default: 'QuickCart Emporium',
    template: '%s | QuickCart Emporium'
  },
  description: 'Discover Amazing Products at QuickCart Emporium',
  openGraph: {
    title: 'QuickCart Emporium',
    description: 'Discover Amazing Products at QuickCart Emporium',
    type: 'website',
    url: 'https://quickcart-emporium.com',
    siteName: 'QuickCart Emporium',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@quickcartemporium',
    creator: '@quickcartemporium',
  },
};

/**
 * Root layout component for the QuickCart Emporium site.
 * This component wraps the entire application and includes global styles, metadata, and the main layout structure.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @returns {JSX.Element} The root layout structure with header and main content.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
