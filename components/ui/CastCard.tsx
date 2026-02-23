import Image from 'next/image';
import type { CastMember } from '@/types/tmdb';
import { getProfileUrl } from '@/utils/image';

interface CastCardProps {
  cast: CastMember;
}

export function CastCard({ cast }: CastCardProps) {
  return (
    <div className="group shrink-0 w-36 text-center">
      <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-2xl bg-[#1a1a24] ring-1 ring-white/8 transition-all duration-500 ease-out group-hover:ring-rose-500/40 group-hover:shadow-lg group-hover:shadow-rose-500/10"
        style={{ transform: 'translateZ(0)' }}
      >
        <Image
          src={getProfileUrl(cast.profile_path)}
          alt={cast.name}
          fill
          sizes="144px"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <h4 className="mt-3 line-clamp-2 text-sm font-medium text-white transition-colors duration-300 group-hover:text-rose-400">
        {cast.name}
      </h4>
      <p className="line-clamp-1 text-xs text-gray-500">
        {cast.character}
      </p>
    </div>
  );
}

interface CastListProps {
  cast: CastMember[];
  limit?: number;
}

export function CastList({ cast, limit = 10 }: CastListProps) {
  const displayCast = cast.slice(0, limit);

  if (displayCast.length === 0) {
    return (
      <p className="text-gray-400">No cast information available.</p>
    );
  }

  return (
    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {displayCast.map((member) => (
        <CastCard key={member.credit_id} cast={member} />
      ))}
    </div>
  );
}
