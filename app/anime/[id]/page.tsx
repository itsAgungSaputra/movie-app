import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnimeDetails, getAnimeCredits, getAnimeRecommendations } from '@/lib/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatDate, formatVoteAverage } from '@/utils/format';
import { GenreList, CastList, HorizontalScroll, SectionHeader } from '@/components/ui';
import { AnimeCard } from '@/components/anime';

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const animeId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(animeId)) {
    return { title: 'Anime Not Found' };
  }

  try {
    const anime = await getAnimeDetails(animeId);
    return {
      title: `${anime.name} | Anime`,
      description: anime.overview,
      openGraph: {
        title: anime.name,
        description: anime.overview,
        images: anime.backdrop_path
          ? [{ url: getBackdropUrl(anime.backdrop_path, 'w1280') }]
          : [],
      },
    };
  } catch {
    return { title: 'Anime Not Found' };
  }
}

export default async function AnimeDetailPage({ params }: AnimePageProps) {
  const resolvedParams = await params;
  const animeId = parseInt(resolvedParams.id, 10);

  if (isNaN(animeId)) {
    notFound();
  }

  try {
    const [anime, credits, recommendations] = await Promise.all([
      getAnimeDetails(animeId),
      getAnimeCredits(animeId),
      getAnimeRecommendations(animeId, 1),
    ]);

    return (
      <article className="min-h-screen">
        {/* Backdrop Section with anime-style gradients */}
        <section className="relative h-[65vh] min-h-125 w-full overflow-hidden md:h-[75vh]">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(anime.backdrop_path, 'original')}
              alt={anime.name}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105"
            />
            {/* Colorful anime-style overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-900/95 via-[#0a0a0f]/80 to-pink-900/40" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-purple-900/30" />
          </div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 lg:px-6">
          <div className="-mt-48 relative z-10 flex flex-col gap-10 md:flex-row">
            {/* Poster with colorful glow */}
            <div className="mx-auto shrink-0 md:mx-0">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-40" />
                
                <div className="relative h-105 w-70 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20">
                  <Image
                    src={getImageUrl(anime.poster_path, 'w780')}
                    alt={anime.name}
                    fill
                    priority
                    sizes="280px"
                    className="object-cover"
                  />
                  {/* Anime badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-lg bg-linear-to-r from-pink-500 to-purple-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      ANIME
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-6">
              {/* Japanese title */}
              {anime.original_name && anime.original_name !== anime.name && (
                <p className="mb-2 text-lg font-medium text-pink-300/80">
                  {anime.original_name}
                </p>
              )}
              
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {anime.name}
              </h1>
              
              {anime.tagline && (
                <p className="mb-5 text-lg italic text-purple-300/80">"{anime.tagline}"</p>
              )}

              {/* Meta info with colorful badges */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* Rating */}
                <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-4 py-2 ring-1 ring-yellow-500/30">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-yellow-300">{formatVoteAverage(anime.vote_average)}</span>
                </div>
                
                <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300 ring-1 ring-purple-500/30">
                  {formatDate(anime.first_air_date)}
                </span>
                
                {anime.number_of_seasons > 0 && (
                  <span className="rounded-full bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-300 ring-1 ring-pink-500/30">
                    {anime.number_of_seasons} Season{anime.number_of_seasons !== 1 ? 's' : ''}
                  </span>
                )}
                
                {anime.number_of_episodes > 0 && (
                  <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30">
                    {anime.number_of_episodes} Episode{anime.number_of_episodes !== 1 ? 's' : ''}
                  </span>
                )}
                
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 ring-1 ring-white/10">
                  🇯🇵 Japan
                </span>
              </div>

              {/* Genres with anime styling */}
              <div className="mb-6">
                <GenreList genres={anime.genres} />
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-linear-to-b from-pink-500 to-purple-500" />
                  Synopsis
                </h2>
                <p className="leading-relaxed text-gray-300/90">{anime.overview || 'No synopsis available.'}</p>
              </div>

              {/* Additional Info Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {anime.status && (
                  <div className="rounded-xl bg-purple-500/10 p-4 ring-1 ring-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-300/70">Status</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{anime.status}</p>
                  </div>
                )}
                {anime.type && (
                  <div className="rounded-xl bg-purple-500/10 p-4 ring-1 ring-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-300/70">Type</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{anime.type}</p>
                  </div>
                )}
                {anime.networks && anime.networks.length > 0 && (
                  <div className="rounded-xl bg-purple-500/10 p-4 ring-1 ring-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-300/70">Network</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {anime.networks.map(n => n.name).join(', ')}
                    </p>
                  </div>
                )}
                {anime.episode_run_time && anime.episode_run_time.length > 0 && (
                  <div className="rounded-xl bg-purple-500/10 p-4 ring-1 ring-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-300/70">Episode Runtime</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {anime.episode_run_time[0]} min
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cast Section */}
        {credits.cast.length > 0 && (
          <section className="mt-16">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-pink-500 via-purple-500 to-cyan-500" />
                <h2 className="text-xl font-bold text-white md:text-2xl">Voice Cast</h2>
              </div>
              <CastList cast={credits.cast.slice(0, 12)} />
            </div>
          </section>
        )}

        {/* Recommendations */}
        {recommendations.results.length > 0 && (
          <section className="mt-16 pb-16">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-pink-500 via-purple-500 to-cyan-500" />
                <h2 className="text-xl font-bold text-white md:text-2xl">You Might Also Like</h2>
              </div>
              <HorizontalScroll>
                {recommendations.results.slice(0, 12).map((rec, index) => (
                  <div key={rec.id} className="shrink-0 w-44 md:w-52">
                    <AnimeCard anime={rec} priority={index < 4} />
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          </section>
        )}

        {/* Back button */}
        <div className="container mx-auto px-4 lg:px-6 pb-16">
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-500/10 px-5 py-3 text-sm font-medium text-purple-300 ring-1 ring-purple-500/20 transition-all duration-300 hover:bg-purple-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Anime
          </Link>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
