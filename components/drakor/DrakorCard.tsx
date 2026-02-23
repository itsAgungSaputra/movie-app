import Image from 'next/image';
import Link from 'next/link';
import type { Drakor } from '@/types/drakor';
import { getImageUrl } from '@/utils/image';
import { formatYear, formatVoteAverage } from '@/utils/format';

interface DrakorCardProps {
  drakor: Drakor;
  priority?: boolean;
}

export function DrakorCard({ drakor, priority = false }: DrakorCardProps) {
  return (
    <Link
      href={`/drakor/${drakor.id}`}
      className="group relative block overflow-hidden rounded-xl focus-ring"
    >
      {/* Subtle elegant glow on hover */}
      <div className="absolute -inset-0.5 rounded-xl bg-linear-to-b from-rose-400/20 to-amber-300/20 opacity-0 blur transition-opacity duration-500 ease-out will-change-opacity group-hover:opacity-100" style={{ transform: 'translateZ(0)' }} />
      
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-[#1a1a24]">
        <Image
          src={getImageUrl(drakor.poster_path, 'w500')}
          alt={drakor.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          priority={priority}
        />
        
        {/* Minimal gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f]/95 via-transparent to-transparent opacity-90" />
        
        {/* Korean flag badge - subtle */}
        <div className="absolute left-3 top-3">
          <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm ring-1 ring-white/10">
            🇰🇷 K-Drama
          </span>
        </div>
        
        {/* Rating - minimal style */}
        <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
            <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-white">{formatVoteAverage(drakor.vote_average)}</span>
          </div>
        </div>
        
        {/* Bottom info - clean typography */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-2 text-sm font-medium tracking-wide text-white">
            {drakor.name}
          </h3>
          {drakor.original_name && drakor.original_name !== drakor.name && (
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-400/80">
              {drakor.original_name}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            {formatYear(drakor.first_air_date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface DrakorCardPortraitProps {
  drakor: Drakor;
  priority?: boolean;
}

// Portrait card with more vertical emphasis - good for drama posters
export function DrakorCardPortrait({ drakor, priority = false }: DrakorCardPortraitProps) {
  return (
    <Link
      href={`/drakor/${drakor.id}`}
      className="group relative block overflow-hidden rounded-2xl focus-ring"
    >
      {/* Elegant border glow */}
      <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-white/20 via-transparent to-white/10 opacity-0 transition-opacity duration-500 ease-out will-change-opacity group-hover:opacity-100" style={{ transform: 'translateZ(0)' }} />
      
      <div className="relative aspect-3/5 w-full overflow-hidden rounded-2xl bg-[#1a1a24]">
        <Image
          src={getImageUrl(drakor.poster_path, 'w780')}
          alt={drakor.name}
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-103"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          priority={priority}
        />
        
        {/* Elegant gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
        
        {/* Top badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-lg bg-black/30 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md ring-1 ring-white/10">
            K-Drama
          </span>
        </div>
        
        {/* Rating badge */}
        <div className="absolute right-4 top-4">
          <div className="flex items-center gap-1.5 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/10">
            <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-white">{formatVoteAverage(drakor.vote_average)}</span>
          </div>
        </div>
        
        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-xl font-semibold tracking-wide text-white md:text-2xl">
            {drakor.name}
          </h3>
          {drakor.original_name && drakor.original_name !== drakor.name && (
            <p className="mt-1 text-sm text-gray-400/80">
              {drakor.original_name}
            </p>
          )}
          <p className="mt-4 line-clamp-2 text-sm text-gray-300/80 leading-relaxed">
            {drakor.overview || 'No description available.'}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/10">
              {formatYear(drakor.first_air_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface DrakorCardMinimalProps {
  drakor: Drakor;
  priority?: boolean;
}

// Ultra minimal card for lists
export function DrakorCardMinimal({ drakor, priority = false }: DrakorCardMinimalProps) {
  return (
    <Link
      href={`/drakor/${drakor.id}`}
      className="group flex gap-4 rounded-lg p-2 transition-colors duration-300 hover:bg-white/5"
    >
      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-[#1a1a24]">
        <Image
          src={getImageUrl(drakor.poster_path, 'w154')}
          alt={drakor.name}
          fill
          sizes="56px"
          className="object-cover"
          priority={priority}
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-center">
        <h3 className="line-clamp-1 text-sm font-medium text-white transition-colors group-hover:text-rose-300">
          {drakor.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {formatYear(drakor.first_air_date)}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <svg className="h-3 w-3 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-400">{formatVoteAverage(drakor.vote_average)}</span>
        </div>
      </div>
    </Link>
  );
}
