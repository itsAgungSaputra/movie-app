import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieDetails, getMovieCredits, getMovieRecommendations } from '@/lib/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatDate, formatRuntime, formatVoteAverage, formatVoteCount } from '@/utils/format';
import { RatingBadge, GenreList, CastList, MovieCard, HorizontalScroll, SectionHeader } from '@/components/ui';

interface MoviePageProps {
  params: Promise<{ movieId: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.movieId, 10);
  
  if (isNaN(movieId)) {
    return { title: 'Movie Not Found' };
  }

  try {
    const movie = await getMovieDetails(movieId);
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path
          ? [{ url: getBackdropUrl(movie.backdrop_path, 'w1280') }]
          : [],
      },
    };
  } catch {
    return { title: 'Movie Not Found' };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.movieId, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const [movie, credits, recommendations] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getMovieRecommendations(movieId, 1),
    ]);

    const directors = credits.crew.filter((member) => member.job === 'Director');
    const writers = credits.crew.filter(
      (member) => member.department === 'Writing' || member.job === 'Screenplay'
    ).slice(0, 3);

    return (
      <article>
        {/* Backdrop Section */}
        <section className="relative h-[60vh] min-h-125 w-full overflow-hidden md:h-[70vh]">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(movie.backdrop_path, 'original')}
              alt={movie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/40" />
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4">
          <div className="-mt-40 relative z-10 flex flex-col gap-10 md:flex-row">
            {/* Poster */}
            <div className="mx-auto shrink-0 md:mx-0">
              <div className="relative h-100 w-67 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  priority
                  sizes="267px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-6">
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="mb-5 text-lg italic text-gray-400/80">"{movie.tagline}"</p>
              )}

              {/* Meta info */}
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <RatingBadge rating={movie.vote_average} size="lg" />
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">{formatDate(movie.release_date)}</span>
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">{formatRuntime(movie.runtime)}</span>
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">{formatVoteCount(movie.vote_count)} votes</span>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <GenreList genres={movie.genres} />
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
                <p className="leading-relaxed text-gray-300/90">{movie.overview}</p>
              </div>

              {/* Crew */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {directors.length > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Director</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {directors.map((d) => d.name).join(', ')}
                    </p>
                  </div>
                )}
                {writers.length > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Writers</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {writers.map((w) => w.name).join(', ')}
                    </p>
                  </div>
                )}
                {movie.status && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Status</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{movie.status}</p>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Budget</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      ${movie.budget.toLocaleString()}
                    </p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      ${movie.revenue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cast Section */}
        <section className="container mx-auto px-4 py-16">
          <SectionHeader title="Top Cast" />
          <CastList cast={credits.cast} limit={15} />
        </section>

        {/* Recommendations Section */}
        {recommendations.results.length > 0 && (
          <section className="container mx-auto px-4 pb-16">
            <SectionHeader
              title="Recommendations"
              action={
                <Link href={`/discover`} className="inline-flex items-center gap-1 text-sm font-medium">
                  Discover More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              }
            />
            <HorizontalScroll>
              {recommendations.results.slice(0, 12).map((rec) => (
                <div key={rec.id} className="w-40 shrink-0 sm:w-48">
                  <MovieCard movie={rec} />
                </div>
              ))}
            </HorizontalScroll>
          </section>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
