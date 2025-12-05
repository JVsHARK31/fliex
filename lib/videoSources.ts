// Video embed sources untuk streaming

export interface VideoSource {
  name: string;
  url: string;
  quality?: string;
  type: 'embed' | 'external';
}

/**
 * Generate embed URLs dari berbagai streaming service
 * @param movieId - ID atau slug dari movie (IMDB ID format: tt1234567)
 * @param title - Title untuk fallback search
 */
export function getVideoSources(movieId: string, title: string): VideoSource[] {
  const sources: VideoSource[] = [];
  
  // Clean movie ID (remove 'tt' prefix if exists)
  const cleanId = movieId.replace('tt', '');
  const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // VidSrc - Universal embed player (works with IMDB IDs)
  sources.push({
    name: 'VidSrc Player',
    url: `https://vidsrc.to/embed/movie/${movieId}`,
    quality: 'HD',
    type: 'embed',
  });

  // VidSrc.me - Alternative
  sources.push({
    name: 'VidSrc.me',
    url: `https://vidsrc.me/embed/movie?imdb=${movieId}`,
    quality: 'HD',
    type: 'embed',
  });

  // 2Embed - Works with IMDB IDs
  sources.push({
    name: '2Embed Player',
    url: `https://www.2embed.cc/embed/${movieId}`,
    quality: 'HD',
    type: 'embed',
  });

  // SuperEmbed
  sources.push({
    name: 'SuperEmbed',
    url: `https://multiembed.mov/?video_id=${movieId}`,
    quality: 'HD',
    type: 'embed',
  });

  // Smashystream
  sources.push({
    name: 'Smashystream',
    url: `https://player.smashy.stream/movie/${movieId}`,
    quality: 'HD',
    type: 'embed',
  });

  return sources;
}

/**
 * Get primary video URL
 */
export function getPrimaryVideoUrl(movieId: string): string {
  // Default ke VidSrc (paling reliable)
  return `https://vidsrc.to/embed/movie/${movieId}`;
}

/**
 * Generate YouTube trailer URL
 */
export function getYouTubeTrailerUrl(title: string): string {
  const searchQuery = encodeURIComponent(`${title} official trailer`);
  return `https://www.youtube.com/embed?listType=search&list=${searchQuery}`;
}

/**
 * Get series embed URL
 */
export function getSeriesEmbedUrl(seriesId: string, season: number = 1, episode: number = 1): string {
  return `https://vidsrc.to/embed/tv/${seriesId}/${season}/${episode}`;
}

