'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiSearch, FiList } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { myList } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black shadow-xl' : 'bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-2.5 sm:py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12">
            <Image
              src="/logo.webp"
              alt="TheMoviesStream Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-netflix-red text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight hidden sm:block">
            TheMoviesStream
          </h1>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-4 lg:ml-8">
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium"
          >
            Movies
          </Link>
          <Link
            href="/series"
            className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium"
          >
            Series
          </Link>
          <Link
            href="/genre"
            className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium"
          >
            Genre
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* My List */}
          <Link
            href="/mylist"
            className="relative text-white hover:text-gray-300 transition-colors p-2"
            aria-label="My List"
          >
            <FiList size={20} className="sm:w-6 sm:h-6" />
            {myList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-netflix-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {myList.length > 9 ? '9+' : myList.length}
              </span>
            )}
          </Link>

          {/* Search */}
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari..."
                className="bg-black border border-white text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red w-32 sm:w-48 md:w-64 text-sm"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="ml-2 text-white hover:text-gray-300 text-lg"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Search"
            >
              <FiSearch size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around px-2 py-2 border-t border-gray-800/50 bg-black/40 backdrop-blur-sm">
        <Link
          href="/"
          className="text-white hover:text-netflix-red transition-colors text-xs font-medium py-2 px-2 rounded active:bg-white/10"
        >
          Home
        </Link>
        <Link
          href="/movies"
          className="text-white hover:text-netflix-red transition-colors text-xs font-medium py-2 px-2 rounded active:bg-white/10"
        >
          Movies
        </Link>
        <Link
          href="/series"
          className="text-white hover:text-netflix-red transition-colors text-xs font-medium py-2 px-2 rounded active:bg-white/10"
        >
          Series
        </Link>
        <Link
          href="/genre"
          className="text-white hover:text-netflix-red transition-colors text-xs font-medium py-2 px-2 rounded active:bg-white/10"
        >
          Genre
        </Link>
        <Link
          href="/mylist"
          className="relative text-white hover:text-netflix-red transition-colors text-xs font-medium py-2 px-2 rounded active:bg-white/10"
        >
          My List
          {myList.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-netflix-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {myList.length > 9 ? '9+' : myList.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

