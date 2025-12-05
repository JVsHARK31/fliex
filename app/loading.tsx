export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mb-4"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
}

