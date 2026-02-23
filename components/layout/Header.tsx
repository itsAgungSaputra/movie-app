'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const mainLinks = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/trending', label: 'Trending', icon: 'trending' },
  { href: '/discover', label: 'Movies', icon: 'movie' },
  { href: '/tv-shows', label: 'TV Shows', icon: 'tv' },
];

const specialLinks = [
  { href: '/anime', label: 'Anime', accent: 'purple', emoji: '🎌' },
  { href: '/drakor', label: 'K-Drama', accent: 'amber', emoji: '🇰🇷' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#0a0a0f]/85 backdrop-blur-2xl shadow-xl shadow-black/20 border-b border-white/6'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-18 lg:px-6">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 via-rose-600 to-pink-600 shadow-lg shadow-rose-500/30 transition-all duration-300 group-hover:shadow-rose-500/50 group-hover:scale-110">
              <svg
                className="h-5 w-5 text-white drop-shadow-sm"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white transition-colors">
                Movie<span className="text-rose-400">App</span>
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-500 lg:block">
                Discover & Explore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Main Links */}
            <div className="flex items-center gap-0.5 rounded-2xl bg-white/4 p-1 ring-1 ring-white/6">
              {mainLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-xl ${
                      active
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/6'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-white/8" />

            {/* Special Category Links */}
            <div className="flex items-center gap-1.5">
              {specialLinks.map((link) => {
                const active = isActive(link.href);
                const colors = {
                  purple: {
                    active: 'bg-purple-500/15 text-purple-300 ring-purple-500/30 shadow-purple-500/10',
                    idle: 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 ring-transparent hover:ring-purple-500/20',
                    dot: 'bg-purple-400',
                  },
                  amber: {
                    active: 'bg-amber-500/15 text-amber-300 ring-amber-500/30 shadow-amber-500/10',
                    idle: 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 ring-transparent hover:ring-amber-500/20',
                    dot: 'bg-amber-400',
                  },
                };
                const c = colors[link.accent as keyof typeof colors];

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium ring-1 transition-all duration-300 ${
                      active ? `${c.active} shadow-sm` : c.idle
                    }`}
                  >
                    <span className="text-xs">{link.emoji}</span>
                    {link.label}
                    {active && (
                      <span className={`ml-0.5 h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-white/8" />

            {/* Search Button */}
            <Link
              href="/search"
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                isActive('/search')
                  ? 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30'
                  : 'text-gray-400 hover:bg-white/8 hover:text-white'
              }`}
              aria-label="Search"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 md:hidden ${
              isMobileMenuOpen
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/8 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-1.25">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-1.75 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-translate-y-1.75 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Panel */}
      <nav
        className={`fixed top-16 right-0 z-40 h-[calc(100dvh-4rem)] w-72 border-l border-white/6 bg-[#0d0d14]/95 backdrop-blur-2xl transition-transform duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transform: isMobileMenuOpen ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)' }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          {/* Main Links */}
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Browse
            </p>
            {mainLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-rose-500/10 text-white'
                      : 'text-gray-400 hover:bg-white/6 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/6" />

          {/* Special Categories */}
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Categories
            </p>
            {specialLinks.map((link) => {
              const active = isActive(link.href);
              const colors = {
                purple: active
                  ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/25'
                  : 'text-gray-400 hover:bg-purple-500/10 hover:text-purple-300',
                amber: active
                  ? 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25'
                  : 'text-gray-400 hover:bg-amber-500/10 hover:text-amber-300',
              };
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    colors[link.accent as keyof typeof colors]
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.emoji}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/6" />

          {/* Search */}
          <Link
            href="/search"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive('/search')
                ? 'bg-rose-500/10 text-rose-400'
                : 'text-gray-400 hover:bg-white/6 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>

          {/* Bottom Branding */}
          <div className="mt-auto pt-6">
            <div className="rounded-xl bg-white/3 p-4 ring-1 ring-white/6">
              <p className="text-xs font-medium text-gray-400">
                Powered by <span className="text-rose-400">TMDB</span>
              </p>
              <p className="mt-1 text-[10px] text-gray-600">
                Discover Movies & TV Shows
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going behind fixed header */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
