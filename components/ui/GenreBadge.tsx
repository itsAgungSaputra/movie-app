import type { Genre } from '@/types/tmdb';

interface GenreBadgeProps {
  genre: Genre;
  onClick?: () => void;
  isActive?: boolean;
}

export function GenreBadge({ genre, onClick, isActive = false }: GenreBadgeProps) {
  const baseClasses = 'inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-out';
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${
          isActive
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-rose-500/50'
            : 'bg-white/[0.06] text-gray-400 ring-1 ring-white/[0.08] hover:bg-white/[0.1] hover:text-white hover:ring-white/[0.15]'
        }`}
      >
        {genre.name}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} bg-white/[0.06] text-gray-400 ring-1 ring-white/[0.08]`}>
      {genre.name}
    </span>
  );
}

interface GenreListProps {
  genres: Genre[];
  onGenreClick?: (genre: Genre) => void;
  activeGenreId?: number | null;
}

export function GenreList({ genres, onGenreClick, activeGenreId }: GenreListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <GenreBadge
          key={genre.id}
          genre={genre}
          onClick={onGenreClick ? () => onGenreClick(genre) : undefined}
          isActive={activeGenreId === genre.id}
        />
      ))}
    </div>
  );
}
