'use client';

import { GENRES } from '@/lib/genres';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function GenrePage() {
  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <FiArrowLeft size={20} />
          <span>Kembali</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          Browse by Genre
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Temukan film dan series berdasarkan genre favorit Anda
        </p>
      </div>

      {/* Genre Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-netflix-red/80 to-netflix-red hover:from-netflix-red hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              <div className="relative h-full flex flex-col items-center justify-center p-4">
                <span className="text-4xl sm:text-5xl mb-2">{genre.emoji}</span>
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg text-center">
                  {genre.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

