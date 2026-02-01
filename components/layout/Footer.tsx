import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/25">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MovieApp</span>
            </Link>
            <p className="text-sm text-gray-500">
              Discover and explore movies and TV shows. Powered by TMDB.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/trending" className="text-sm text-gray-500 transition-colors hover:text-white">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-sm text-gray-500 transition-colors hover:text-white">
                  Discover Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="text-sm text-gray-500 transition-colors hover:text-white">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-gray-500 transition-colors hover:text-white">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/discover?sort_by=popularity.desc" className="text-sm text-gray-500 transition-colors hover:text-white">
                  Popular
                </Link>
              </li>
              <li>
                <Link href="/discover?sort_by=vote_average.desc" className="text-sm text-gray-500 transition-colors hover:text-white">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/discover?sort_by=release_date.desc" className="text-sm text-gray-500 transition-colors hover:text-white">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* TMDB Attribution */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Data Source
            </h3>
            <p className="text-sm text-gray-500">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block opacity-60 transition-opacity hover:opacity-100"
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="h-6"
              />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} MovieApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
