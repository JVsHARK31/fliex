import { getDetails, getTrending } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus, FiCheck } from 'react-icons/fi';
import ContentRow from '@/app/_components/ui/ContentRow';
import { DetailPageSkeleton } from '@/app/_components/ui/SkeletonLoader';
import { notFound } from 'next/navigation';
import PlayButton from './PlayButton';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
  const show = await getDetails(params.id);
  
  if (!show) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: `${show.title} - TheMoviesStream`,
    description: show.overview || `Watch ${show.title} online`,
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  let show = await getDetails(params.id);
  
  // Fallback: Cari di mock data jika getDetails gagal
  if (!show) {
    const { mockMovies } = await import('@/lib/mockData');
    show = mockMovies.find(m => m.id === params.id) || null;
  }
  
  const relatedMovies = await getTrending('movie');

  if (!show) {
    notFound();
  }

  const backdropUrl = show.imageSet?.horizontalBackdrop?.w1440 || show.imageSet?.horizontalPoster?.w1440 || '/placeholder.jpg';
  const posterUrl = show.imageSet?.verticalPoster?.w480 || '/placeholder.jpg';

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={backdropUrl}
          alt={show.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative -mt-32 z-10 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={posterUrl}
                alt={show.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {show.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
              {show.releaseYear && (
                <span className="text-lg">{show.releaseYear}</span>
              )}
              {show.rating && (
                <span className="flex items-center text-lg font-semibold text-green-400">
                  ⭐ {show.rating.toFixed(1)}
                </span>
              )}
              {show.runtime && (
                <span>{Math.floor(show.runtime / 60)}h {show.runtime % 60}m</span>
              )}
            </div>

            {/* Genres */}
            {show.genres && show.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-netflix-gray text-white text-sm rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <PlayButton title={show.title} movieId={show.id} />
              <button className="flex items-center gap-2 bg-netflix-gray text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition-all">
                <FiPlus size={20} />
              </button>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-3">Sinopsis</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {show.overview || 'Tidak ada sinopsis tersedia.'}
              </p>
            </div>

            {/* Cast */}
            {show.cast && show.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-3">Pemeran</h2>
                <div className="flex flex-wrap gap-2">
                  {show.cast.slice(0, 10).map((actor) => (
                    <span
                      key={actor.id}
                      className="px-3 py-1 bg-netflix-darkGray text-gray-300 text-sm rounded"
                    >
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Directors */}
            {show.directors && show.directors.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-3">Sutradara</h2>
                <div className="flex flex-wrap gap-2">
                  {show.directors.map((director) => (
                    <span
                      key={director.id}
                      className="px-3 py-1 bg-netflix-darkGray text-gray-300 text-sm rounded"
                    >
                      {director.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Streaming Options */}
            {show.streamingOptions && Object.keys(show.streamingOptions).length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-3">Tersedia di</h2>
                <div className="flex flex-wrap gap-3">
                  {Object.values(show.streamingOptions)[0]?.slice(0, 5).map((option, index) => (
                    <a
                      key={index}
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-netflix-red text-white text-sm rounded hover:bg-opacity-80 transition-all"
                    >
                      {option.service.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-16">
            <ContentRow title="Film Serupa" shows={relatedMovies.slice(0, 20)} />
          </div>
        )}
      </div>
    </div>
  );
}

