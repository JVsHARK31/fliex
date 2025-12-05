import { getTrending, getShowsByFilters } from '@/lib/api';
import ContentRow from '../_components/ui/ContentRow';
import { ContentRowSkeleton } from '../_components/ui/SkeletonLoader';

export const metadata = {
  title: 'Movies - TheMoviesStream',
  description: 'Browse and discover movies',
};

export const revalidate = 3600;

async function getMoviesData() {
  try {
    const [trending, action, comedy, drama, thriller] = await Promise.all([
      getTrending('movie'),
      getShowsByFilters({ showType: 'movie', genres: 'action' }),
      getShowsByFilters({ showType: 'movie', genres: 'comedy' }),
      getShowsByFilters({ showType: 'movie', genres: 'drama' }),
      getShowsByFilters({ showType: 'movie', genres: 'thriller' }),
    ]);

    return { trending, action, comedy, drama, thriller };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { trending: [], action: [], comedy: [], drama: [], thriller: [] };
  }
}

export default async function MoviesPage() {
  const data = await getMoviesData();

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 pb-8">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Movies</h1>
      </div>

      {data.trending.length > 0 && (
        <ContentRow title="Trending Now" shows={data.trending.slice(0, 20)} />
      )}

      {data.action.length > 0 && (
        <ContentRow title="Action" shows={data.action.slice(0, 20)} />
      )}

      {data.comedy.length > 0 && (
        <ContentRow title="Comedy" shows={data.comedy.slice(0, 20)} />
      )}

      {data.drama.length > 0 && (
        <ContentRow title="Drama" shows={data.drama.slice(0, 20)} />
      )}

      {data.thriller.length > 0 && (
        <ContentRow title="Thriller" shows={data.thriller.slice(0, 20)} />
      )}
    </div>
  );
}

