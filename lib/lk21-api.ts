import axios from 'axios';
import { Show, ShowDetails } from './types';

// LK21 API Base URL - Anda bisa deploy backend lk21-api sendiri atau gunakan public instance
const LK21_API_BASE = process.env.NEXT_PUBLIC_LK21_API || 'https://lk21-api.vercel.app';

const apiClient = axios.create({
  baseURL: LK21_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Map LK21 API response to our Show interface
 */
function mapLK21Movie(movie: any): Show {
  return {
    id: movie.id || movie.slug || '',
    title: movie.title || '',
    overview: movie.synopsis || movie.description || '',
    releaseYear: movie.year ? parseInt(movie.year) : new Date().getFullYear(),
    originalTitle: movie.title || '',
    genres: movie.genres?.map((g: any) => ({
      id: typeof g === 'string' ? g.toLowerCase() : g.id,
      name: typeof g === 'string' ? g : g.name,
    })) || [],
    rating: movie.rating ? parseFloat(movie.rating) : 0,
    directors: movie.directors?.map((d: any) => ({
      id: d,
      name: d,
    })) || [],
    cast: movie.cast?.map((c: any) => ({
      id: c,
      name: c,
    })) || [],
    imageSet: {
      verticalPoster: {
        w240: movie.poster || movie.thumbnail || '/placeholder.jpg',
        w360: movie.poster || movie.thumbnail || '/placeholder.jpg',
        w480: movie.poster || movie.thumbnail || '/placeholder.jpg',
        w600: movie.poster || movie.thumbnail || '/placeholder.jpg',
        w720: movie.poster || movie.thumbnail || '/placeholder.jpg',
      },
      horizontalPoster: {
        w360: movie.backdrop || movie.poster || '/placeholder.jpg',
        w480: movie.backdrop || movie.poster || '/placeholder.jpg',
        w720: movie.backdrop || movie.poster || '/placeholder.jpg',
        w1080: movie.backdrop || movie.poster || '/placeholder.jpg',
        w1440: movie.backdrop || movie.poster || '/placeholder.jpg',
      },
    },
    showType: 'movie',
    streamingOptions: movie.streamingUrl ? {
      id: [{
        service: { id: 'lk21', name: 'LK21', imageSet: { lightThemeImage: '', darkThemeImage: '' } },
        type: 'stream',
        link: movie.streamingUrl,
      }],
    } : undefined,
  };
}

/**
 * Get recent/trending movies from LK21
 */
export async function getLK21Movies(page: number = 1): Promise<Show[]> {
  try {
    const response = await apiClient.get('/movies', {
      params: { page },
    });
    
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.map(mapLK21Movie);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching LK21 movies:', error);
    return [];
  }
}

/**
 * Search movies by title
 */
export async function searchLK21(query: string): Promise<Show[]> {
  try {
    const response = await apiClient.get('/search', {
      params: { q: query },
    });
    
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.map(mapLK21Movie);
    }
    
    return [];
  } catch (error) {
    console.error('Error searching LK21:', error);
    return [];
  }
}

/**
 * Get movie details with streaming URL
 */
export async function getLK21MovieDetail(id: string): Promise<ShowDetails | null> {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    
    if (response.data) {
      const movie = mapLK21Movie(response.data);
      return {
        ...movie,
        tagline: response.data.tagline,
        runtime: response.data.duration ? parseInt(response.data.duration) : undefined,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    return null;
  }
}

/**
 * Get streaming URL for a movie
 */
export async function getLK21StreamingUrl(movieId: string): Promise<string | null> {
  try {
    const response = await apiClient.get(`/movie/${movieId}/stream`);
    
    if (response.data && response.data.streamUrl) {
      return response.data.streamUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting streaming URL:', error);
    return null;
  }
}

/**
 * Get movies by genre
 */
export async function getLK21ByGenre(genre: string, page: number = 1): Promise<Show[]> {
  try {
    const response = await apiClient.get('/movies/genre', {
      params: { genre, page },
    });
    
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.map(mapLK21Movie);
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching genre ${genre}:`, error);
    return [];
  }
}

