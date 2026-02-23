'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Drakor } from '@/types/drakor';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatYear, formatVoteAverage } from '@/utils/format';

interface DrakorHeroProps {
  drakorList: Drakor[];
  autoPlayInterval?: number;
}

export function DrakorHero({ drakorList, autoPlayInterval = 7000 }: DrakorHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slidesCount = Math.min(drakorList.length, 5);
  const slides = drakorList.slice(0, slidesCount);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slidesCount);
  }, [currentIndex, slidesCount, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slidesCount) % slidesCount);
  }, [currentIndex, slidesCount, goToSlide]);

  useEffect(() => {
    if (!isAutoPlaying || slidesCount <= 1) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, slidesCount]);

  if (slides.length === 0) return null;

  return (
    <section 
      className="relative h-[75vh] min-h-110 md:h-[85vh] md:min-h-160 w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background */}
      {slides.map((drakor, index) => (
        <div
          key={drakor.id}
          className={`absolute inset-0 will-change-[opacity] backface-hidden ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateZ(0)',
          }}
        >
          <Image
            src={getBackdropUrl(drakor.backdrop_path, 'original')}
            alt={drakor.name}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Elegant minimal gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f]/60 to-transparent h-32" />
      
      {/* Animated gradient orbs - GPU accelerated */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl" 
        style={{ 
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          transform: 'translateZ(0)',
        }} 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl" 
        style={{ 
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          animationDelay: '2s',
          transform: 'translateZ(0)',
        }} 
      />

      {/* Main Content */}
      <div className="container relative mx-auto flex h-full items-end pb-24 md:pb-32 px-4 lg:px-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-16 w-full">
          {/* Poster - elegant frame */}
          <div className="hidden lg:block shrink-0">
            <div className="relative">
              {/* Elegant glow behind poster */}
              <div className="absolute -inset-4 bg-linear-to-r from-rose-500/40 via-amber-500/30 to-rose-400/40 rounded-3xl blur-2xl opacity-50" />
              
              {slides.map((drakor, index) => (
                <div
                  key={drakor.id}
                  className={`${index === currentIndex ? 'relative' : 'absolute inset-0'} will-change-[opacity,transform] backface-hidden ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{
                    transition: 'opacity 800ms cubic-bezier(0.19, 1, 0.22, 1), transform 800ms cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: index === currentIndex 
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, 32px, 0) scale(0.95)',
                  }}
                >
                  <div className="relative h-96 w-64 lg:h-110 lg:w-72 xl:h-120 xl:w-80 overflow-hidden rounded-2xl shadow-2xl shadow-rose-500/20 ring-2 ring-white/20">
                    <Image
                      src={getImageUrl(drakor.poster_path, 'w780')}
                      alt={drakor.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* K-Drama badge overlay */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-lg bg-linear-to-r from-rose-500 to-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        K-DRAMA
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 max-w-3xl">
            {slides.map((drakor, index) => (
              <div
                key={drakor.id}
                className={`${index === currentIndex ? 'block' : 'hidden'}`}
              >
                {/* Korean title */}
                {drakor.original_name && drakor.original_name !== drakor.name && (
                  <p className="mb-2 text-lg font-medium text-rose-300/80 md:text-xl">
                    {drakor.original_name}
                  </p>
                )}
                
                <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                  {drakor.name}
                </h1>

                {/* Meta info */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-3 py-1.5 ring-1 ring-yellow-500/30">
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-yellow-300">{formatVoteAverage(drakor.vote_average)}</span>
                  </div>
                  <span className="rounded-full bg-rose-500/20 px-3 py-1.5 text-sm font-medium text-rose-300 ring-1 ring-rose-500/30">
                    {formatYear(drakor.first_air_date)}
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1.5 text-sm font-medium text-amber-300 ring-1 ring-amber-500/30">
                    🇰🇷 South Korea
                  </span>
                </div>

                {/* Overview */}
                <p className="mt-5 line-clamp-3 text-base text-gray-300/90 md:text-lg md:line-clamp-4">
                  {drakor.overview || 'No description available.'}
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/drakor/${drakor.id}`}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-rose-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/50 hover:scale-105"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {slidesCount > 1 && (
        <>
          {/* Arrow Buttons */}
          <div className="absolute bottom-6 left-4 flex items-center gap-3 lg:left-6">
            <button
              onClick={goToPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/20 text-white backdrop-blur-sm ring-1 ring-rose-500/30 transition-transform duration-300 hover:scale-110 hover:bg-rose-500/30"
              style={{ transform: 'translateZ(0)' }}
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/20 text-white backdrop-blur-sm ring-1 ring-rose-500/30 transition-transform duration-300 hover:scale-110 hover:bg-rose-500/30"
              style={{ transform: 'translateZ(0)' }}
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'w-10 bg-linear-to-r from-rose-500 to-amber-500'
                    : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
                style={{ transform: 'translateZ(0)' }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
