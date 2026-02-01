import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTVShowDetails, getTVShowCredits, getTVShowRecommendations } from '@/lib/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatDate, formatVoteAverage, formatVoteCount } from '@/utils/format';
import { RatingBadge, GenreList, CastList, TVShowCard, HorizontalScroll, SectionHeader } from '@/components/ui';

interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TVShowPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tvId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(tvId)) {
    return { title: 'TV Show Not Found' };
  }

  try {
    const show = await getTVShowDetails(tvId);
    return {
      title: show.name,
      description: show.overview,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: show.backdrop_path
          ? [{ url: getBackdropUrl(show.backdrop_path, 'w1280') }]
          : [],
      },
    };
  } catch {
    return { title: 'TV Show Not Found' };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const resolvedParams = await params;
  const tvId = parseInt(resolvedParams.id, 10);

  if (isNaN(tvId)) {
    notFound();
  }

  try {
    const [show, credits, recommendations] = await Promise.all([
      getTVShowDetails(tvId),
      getTVShowCredits(tvId),
      getTVShowRecommendations(tvId, 1),
    ]);

    return (
      <article>
        {/* Backdrop Section */}
        <section className="relative h-[60vh] min-h-125 w-full overflow-hidden md:h-[70vh]">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(show.backdrop_path, 'original')}
              alt={show.name}
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
                  src={getImageUrl(show.poster_path, 'w500')}
                  alt={show.name}
                  fill
                  priority
                  sizes="267px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-400">
                  TV SERIES
                </span>
              </div>
              
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {show.name}
              </h1>
              
              {show.tagline && (
                <p className="mb-5 text-lg italic text-gray-400/80">"{show.tagline}"</p>
              )}

              {/* Meta info */}
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <RatingBadge rating={show.vote_average} size="lg" />
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">First aired: {formatDate(show.first_air_date)}</span>
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                <span className="h-4 w-px bg-gray-600" />
                <span className="rounded-full bg-white/10 px-3 py-1">{show.number_of_episodes} Episode{show.number_of_episodes !== 1 ? 's' : ''}</span>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <GenreList genres={show.genres} />
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
                <p className="leading-relaxed text-gray-300/90">{show.overview}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {show.created_by.length > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Created By</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {show.created_by.map((c) => c.name).join(', ')}
                    </p>
                  </div>
                )}
                {show.status && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Status</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{show.status}</p>
                  </div>
                )}
                {show.type && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Type</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{show.type}</p>
                  </div>
                )}
                {show.networks.length > 0 && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Networks</h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {show.networks.map((n) => n.name).join(', ')}
                    </p>
                  </div>
                )}
                {show.last_air_date && (
                  <div className="rounded-xl bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-gray-400">Last Aired</h3>
                    <p className="mt-1 text-sm font-semibold text-white">{formatDate(show.last_air_date)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seasons Section */}
        {show.seasons.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <SectionHeader title="Seasons" />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {show.seasons
                .filter((season) => season.season_number > 0)
                .map((season) => (
                  <div key={season.id} className="group text-center">
                    <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-gray-800 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
                      <Image
                        src={getImageUrl(season.poster_path, 'w342')}
                        alt={season.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="mt-3 text-sm font-medium text-white">{season.name}</h4>
                    <p className="text-xs text-gray-400">{season.episode_count} episodes</p>
                  </div>
                ))}
            </div>
          </section>
        )}

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
                <Link href={`/tv-shows`} className="inline-flex items-center gap-1 text-sm font-medium">
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
                  <TVShowCard show={rec} />
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
