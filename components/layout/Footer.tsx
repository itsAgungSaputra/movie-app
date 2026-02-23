import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 bg-[#08080c]">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-rose-500/40 to-transparent" />
      
      <div className="container mx-auto px-4 py-14 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 via-rose-600 to-pink-600 shadow-lg shadow-rose-500/25 transition-all duration-300 group-hover:shadow-rose-500/40">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Movie<span className="text-rose-400">App</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Discover and explore movies, TV shows, anime, and K-dramas. Your ultimate entertainment companion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/trending', label: 'Trending' },
                { href: '/discover', label: 'Discover Movies' },
                { href: '/tv-shows', label: 'TV Shows' },
                { href: '/search', label: 'Search' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/anime', label: '🎌 Anime', accent: 'hover:text-purple-400' },
                { href: '/drakor', label: '🇰🇷 K-Drama', accent: 'hover:text-amber-400' },
                { href: '/discover?sort_by=popularity.desc', label: 'Popular' },
                { href: '/discover?sort_by=vote_average.desc', label: 'Top Rated' },
                { href: '/discover?sort_by=release_date.desc', label: 'New Releases' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-gray-500 transition-colors duration-200 ${link.accent || 'hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TMDB Attribution */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Data Source
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block opacity-50 transition-opacity duration-300 hover:opacity-100"
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="h-5"
              />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {currentYear} MovieApp. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js & TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}
