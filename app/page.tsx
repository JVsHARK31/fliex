import { getTrending, getShowsByFilters } from '@/lib/api';
import HeroBanner from './_components/ui/HeroBanner';
import ContentRow from './_components/ui/ContentRow';
import { HeroBannerSkeleton, ContentRowSkeleton } from './_components/ui/SkeletonLoader';
import { Suspense } from 'react';

export const revalidate = 3600; // Revalidate setiap 1 jam

async function getHomePageData() {
  try {
    const [trendingMovies, trendingSeries, actionMovies, comedyMovies, dramaSeries] = await Promise.all([
      getTrending('movie'),
      getTrending('series'),
      getShowsByFilters({ showType: 'movie', genres: 'action' }),
      getShowsByFilters({ showType: 'movie', genres: 'comedy' }),
      getShowsByFilters({ showType: 'series', genres: 'drama' }),
    ]);

    return {
      featuredShow: trendingMovies[0] || trendingSeries[0],
      trendingMovies: trendingMovies.slice(1, 21),
      trendingSeries: trendingSeries.slice(0, 20),
      actionMovies: actionMovies.slice(0, 20),
      comedyMovies: comedyMovies.slice(0, 20),
      dramaSeries: dramaSeries.slice(0, 20),
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      featuredShow: null,
      trendingMovies: [],
      trendingSeries: [],
      actionMovies: [],
      comedyMovies: [],
      dramaSeries: [],
    };
  }
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Banner */}
      <div className="pt-[88px] md:pt-0">
        {data.featuredShow ? (
          <HeroBanner show={data.featuredShow} />
        ) : (
          <HeroBannerSkeleton />
        )}
      </div>

      {/* Content Rows */}
      <div className="relative -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-28 z-10 pb-8 pt-4">
        {data.trendingMovies.length > 0 && (
          <ContentRow title="Trending Movies" shows={data.trendingMovies} />
        )}

        {data.trendingSeries.length > 0 && (
          <ContentRow title="Trending Series" shows={data.trendingSeries} />
        )}

        {data.actionMovies.length > 0 && (
          <ContentRow title="Action Movies" shows={data.actionMovies} />
        )}

        {data.comedyMovies.length > 0 && (
          <ContentRow title="Comedy Movies" shows={data.comedyMovies} />
        )}

        {data.dramaSeries.length > 0 && (
          <ContentRow title="Drama Series" shows={data.dramaSeries} />
        )}

        {/* Fallback jika tidak ada data */}
        {data.trendingMovies.length === 0 && 
         data.trendingSeries.length === 0 && 
         data.actionMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              Tidak dapat memuat konten. Silakan coba lagi nanti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

