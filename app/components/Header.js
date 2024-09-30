import Link from 'next/link';

/**
 * Header component that displays the navigation bar with links to different pages.
 *
 * @returns {JSX.Element} - The header component containing the website's logo and navigation links.
 */
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        {/* Website logo and title */}
        <Link href="/" className="flex items-center group">
          <span className="font-['Brush_Script_MT',_cursive] text-4xl text-white tracking-wider group-hover:text-yellow-300 transition-colors duration-300">
            QuickCart Emporium
          </span>
        </Link>
        {/* Navigation links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}