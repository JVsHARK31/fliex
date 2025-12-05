'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchByKeyword } from '@/lib/api';
import { Show } from '@/lib/types';
import MovieCard from '../_components/ui/MovieCard';
import { MovieCardSkeleton } from '../_components/ui/SkeletonLoader';
import { useDebounce } from 'use-debounce';
import { FiSearch } from 'react-icons/fi';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchByKeyword(searchQuery);
      console.log('Search results:', data); // Debug log
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 pb-8">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Cari Film & Series
        </h1>

        {/* Search Input */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul film atau series..."
            className="w-full bg-netflix-darkGray text-white px-4 sm:px-6 py-3 sm:py-4 pr-10 sm:pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red text-sm sm:text-base border border-gray-700"
            autoFocus
          />
          <FiSearch className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Search Info */}
        {hasSearched && !isLoading && (
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            {results.length > 0
              ? `Ditemukan ${results.length} hasil untuk "${debouncedQuery}"`
              : `Tidak ada hasil untuk "${debouncedQuery}"`}
          </p>
        )}
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(12)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {results.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg sm:text-xl mb-3 sm:mb-4">
              Tidak ada hasil untuk "{debouncedQuery}"
            </p>
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Coba kata kunci lain atau cari berdasarkan genre
            </p>
            <Link
              href="/genre"
              className="inline-block bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-all"
            >
              Browse by Genre
            </Link>
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <FiSearch className="mx-auto mb-3 sm:mb-4 text-gray-600" size={48} />
            <p className="text-gray-400 text-base sm:text-lg md:text-xl">
              Mulai ketik untuk mencari film atau series
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

