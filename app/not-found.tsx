import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <h1 className="text-[10rem] md:text-[14rem] font-black text-transparent bg-clip-text bg-linear-to-b from-rose-500 to-rose-600/30 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 blur-3xl bg-rose-500/20 -z-10" />
      </div>
      
      <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white">Page Not Found</h2>
      <p className="mb-10 max-w-md text-gray-400 leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30 hover:scale-[1.02]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Movies
        </Link>
      </div>
    </div>
  );
}
