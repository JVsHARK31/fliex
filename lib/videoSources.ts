// Video embed sources untuk streaming

export interface VideoSource {
  name: string;
  url: string;
  quality?: string;
}

/**
 * Generate embed URLs dari berbagai streaming service
 * @param movieId - ID atau slug dari movie
 * @param title - Title untuk fallback search
 */
export function getVideoSources(movieId: string, title: string): VideoSource[] {
  const sources: VideoSource[] = [];

  // LK21 Embed
  sources.push({
    name: 'LK21 Player',
    url: `https://lk21official.my/embed/${movieId}`,
    quality: 'HD',
  });

  // NontonDrama Embed (untuk series)
  sources.push({
    name: 'NontonDrama Player',
    url: `https://tv.nontondrama.lol/embed/${movieId}`,
    quality: 'HD',
  });

  // Layarkaca21 Alternative
  sources.push({
    name: 'Layarkaca21',
    url: `https://layarkaca21.my.id/embed/${movieId}`,
    quality: 'HD',
  });

  // Rebahin
  sources.push({
    name: 'Rebahin',
    url: `https://rebahin.cam/embed/${movieId}`,
    quality: 'HD',
  });

  // Dutafilm
  sources.push({
    name: 'Dutafilm',
    url: `https://dutafilm.my.id/embed/${movieId}`,
    quality: 'HD',
  });

  return sources;
}

/**
 * Get primary video URL
 */
export function getPrimaryVideoUrl(movieId: string): string {
  // Default ke LK21
  return `https://lk21official.my/embed/${movieId}`;
}

/**
 * Generate YouTube trailer search URL as fallback
 */
export function getYouTubeTrailerUrl(title: string): string {
  const searchQuery = encodeURIComponent(`${title} official trailer`);
  return `https://www.youtube.com/results?search_query=${searchQuery}`;
}

