import { getShowsByGenre } from '@/lib/api';
import { getGenreName, getGenreEmoji, GENRES } from '@/lib/genres';
import MovieCard from '@/app/_components/ui/MovieCard';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { notFound } from 'next/navigation';

interface GenreDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return GENRES.map((genre) => ({
    id: genre.id,
  }));
}

export async function generateMetadata({ params }: GenreDetailPageProps) {
  const genreName = getGenreName(params.id);
  return {
    title: `${genreName} - TheMoviesStream`,
    description: `Browse ${genreName} movies and series`,
  };
}

export const revalidate = 3600;

async function getGenreData(genreId: string) {
  try {
    const [movies, series] = await Promise.all([
      getShowsByGenre(genreId, 'movie'),
      getShowsByGenre(genreId, 'series'),
    ]);
    return { movies, series };
  } catch (error) {
    console.error(`Error fetching ${genreId} content:`, error);
    return { movies: [], series: [] };
  }
}

export default async function GenreDetailPage({ params }: GenreDetailPageProps) {
  // Validate genre exists
  const genreExists = GENRES.some(g => g.id === params.id);
  if (!genreExists) {
    notFound();
  }

  const genreName = getGenreName(params.id);
  const genreEmoji = getGenreEmoji(params.id);
  const data = await getGenreData(params.id);
  const allShows = [...data.movies, ...data.series];

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 px-4 sm:px-6 md:px-8 lg:px-16 pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <Link 
          href="/genre"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <FiArrowLeft size={20} />
          <span>Kembali ke Genre</span>
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <span className="text-4xl sm:text-5xl md:text-6xl">{genreEmoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {genreName}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              {allShows.length} {allShows.length === 1 ? 'title' : 'titles'} tersedia
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <button className="px-4 py-2 bg-netflix-red text-white rounded-full text-sm font-medium">
            All
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium transition-colors">
            Movies ({data.movies.length})
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium transition-colors">
            Series ({data.series.length})
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto">
        {allShows.length > 0 ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {allShows.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{genreEmoji}</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Tidak Ada Konten
            </h2>
            <p className="text-gray-400 mb-6">
              Belum ada film atau series untuk genre {genreName}
            </p>
            <Link
              href="/genre"
              className="inline-block bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-all"
            >
              Lihat Genre Lain
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

