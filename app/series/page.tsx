import { getTrending, getShowsByFilters } from '@/lib/api';
import ContentRow from '../_components/ui/ContentRow';
import { ContentRowSkeleton } from '../_components/ui/SkeletonLoader';

export const metadata = {
  title: 'Series - TheMoviesStream',
  description: 'Browse and discover TV series',
};

export const revalidate = 3600;

async function getSeriesData() {
  try {
    const [trending, action, comedy, drama, scifi] = await Promise.all([
      getTrending('series'),
      getShowsByFilters({ showType: 'series', genres: 'action' }),
      getShowsByFilters({ showType: 'series', genres: 'comedy' }),
      getShowsByFilters({ showType: 'series', genres: 'drama' }),
      getShowsByFilters({ showType: 'series', genres: 'scifi' }),
    ]);

    return { trending, action, comedy, drama, scifi };
  } catch (error) {
    console.error('Error fetching series:', error);
    return { trending: [], action: [], comedy: [], drama: [], scifi: [] };
  }
}

export default async function SeriesPage() {
  const data = await getSeriesData();

  return (
    <div className="min-h-screen bg-black pt-[88px] md:pt-24 pb-8">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">TV Series</h1>
      </div>

      {data.trending.length > 0 && (
        <ContentRow title="Trending Now" shows={data.trending.slice(0, 20)} />
      )}

      {data.action.length > 0 && (
        <ContentRow title="Action & Adventure" shows={data.action.slice(0, 20)} />
      )}

      {data.comedy.length > 0 && (
        <ContentRow title="Comedy" shows={data.comedy.slice(0, 20)} />
      )}

      {data.drama.length > 0 && (
        <ContentRow title="Drama" shows={data.drama.slice(0, 20)} />
      )}

      {data.scifi.length > 0 && (
        <ContentRow title="Sci-Fi & Fantasy" shows={data.scifi.slice(0, 20)} />
      )}
    </div>
  );
}

