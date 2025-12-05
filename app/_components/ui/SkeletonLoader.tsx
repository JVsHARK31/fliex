export function MovieCardSkeleton() {
  return (
    <div className="flex-none w-32 sm:w-40 md:w-48 lg:w-52">
      <div className="aspect-[2/3] rounded-md bg-netflix-gray animate-shimmer" />
    </div>
  );
}

export function ContentRowSkeleton() {
  return (
    <div className="mb-8 md:mb-12">
      {/* Title Skeleton */}
      <div className="h-8 w-48 bg-netflix-gray animate-shimmer rounded mb-4 px-4 md:px-8 lg:px-16" />

      {/* Cards Skeleton */}
      <div className="flex space-x-2 md:space-x-3 px-4 md:px-8 lg:px-16 py-2">
        {[...Array(6)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full bg-netflix-gray animate-shimmer">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl space-y-4">
          <div className="h-16 w-96 bg-netflix-darkGray rounded" />
          <div className="h-6 w-64 bg-netflix-darkGray rounded" />
          <div className="h-24 w-full bg-netflix-darkGray rounded" />
          <div className="flex space-x-3">
            <div className="h-12 w-32 bg-netflix-darkGray rounded" />
            <div className="h-12 w-32 bg-netflix-darkGray rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Banner Skeleton */}
      <div className="relative h-[60vh] bg-netflix-gray animate-shimmer" />

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="h-12 w-96 bg-netflix-gray animate-shimmer rounded mb-4" />
        <div className="h-6 w-64 bg-netflix-gray animate-shimmer rounded mb-6" />
        <div className="space-y-3 mb-8">
          <div className="h-4 w-full bg-netflix-gray animate-shimmer rounded" />
          <div className="h-4 w-full bg-netflix-gray animate-shimmer rounded" />
          <div className="h-4 w-3/4 bg-netflix-gray animate-shimmer rounded" />
        </div>
      </div>
    </div>
  );
}

