import type { Genre } from '@/types/tmdb';

interface GenreBadgeProps {
  genre: Genre;
  onClick?: () => void;
  isActive?: boolean;
}

export function GenreBadge({ genre, onClick, isActive = false }: GenreBadgeProps) {
  const baseClasses = 'inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200';
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${
          isActive
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
        }`}
      >
        {genre.name}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} bg-white/10 text-gray-300`}>
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
