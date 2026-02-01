import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatYear } from '@/utils/format';
import { RatingBadge } from '@/components/ui';

interface FeaturedHeroProps {
  movie: Movie;
}

export function FeaturedHero({ movie }: FeaturedHeroProps) {
  return (
    <section className="relative h-[80vh] min-h-150 w-full overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-105"
        />
        {/* Modern Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f]/60 to-transparent h-32" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-end pb-16 px-4 lg:px-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-12">
          {/* Poster */}
          <div className="hidden lg:block">
            <div className="relative h-96 w-64 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-transform hover:scale-[1.02]">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                priority
                sizes="256px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="max-w-2xl space-y-6">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge rating={movie.vote_average} size="lg" />
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                {formatYear(movie.release_date)}
              </span>
              <span className="rounded-full bg-rose-500/20 px-4 py-1.5 text-sm font-medium text-rose-400 backdrop-blur-sm">
                Featured
              </span>
            </div>
            
            {/* Title with gradient */}
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {movie.title}
            </h1>
            
            {/* Overview */}
            <p className="line-clamp-3 text-lg leading-relaxed text-gray-300/90 md:text-xl">
              {movie.overview}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/movie/${movie.id}`}
                className="group inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30 hover:scale-[1.02]"
              >
                <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                View Details
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
