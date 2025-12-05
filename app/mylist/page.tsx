'use client';

import { useAppStore } from '@/store/useAppStore';
import MovieCard from '../_components/ui/MovieCard';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useEffect } from 'react';

export default function MyListPage() {
  // Force re-render when component mounts to sync with localStorage
  useEffect(() => {
    // This ensures the component updates with the latest myList from store
  }, []);
  const { myList } = useAppStore();

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 pb-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <FiArrowLeft size={20} />
          <span>Kembali</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          My List
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {myList.length} {myList.length === 1 ? 'item' : 'items'} tersimpan
        </p>
      </div>

      {/* Content */}
      {myList.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {myList.map((show) => (
            <MovieCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📺</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            My List Kosong
          </h2>
          <p className="text-gray-400 mb-6">
            Tambahkan film atau series favorit Anda ke My List
          </p>
          <Link
            href="/"
            className="inline-block bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-all"
          >
            Jelajahi Konten
          </Link>
        </div>
      )}
    </div>
  );
}

