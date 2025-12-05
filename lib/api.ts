import axios from 'axios';
import { Show, ShowDetails, APIResponse, SearchResponse } from './types';
import { mockMovies, mockSeries } from './mockData';

// Axios instance dengan konfigurasi RapidAPI
const apiClient = axios.create({
  baseURL: 'https://streaming-availability.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '4e191731b7msh836483830c0fbafp1d45c2jsnc33bea0ab0aa',
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'streaming-availability.p.rapidapi.com',
  },
});

/**
 * Get trending shows (movies or series)
 * @param type - 'movie' atau 'series'
 * @param country - kode negara (default: 'us')
 */
export async function getTrending(
  type: 'movie' | 'series',
  country: string = 'us'
): Promise<Show[]> {
  try {
    const response = await apiClient.get('/shows/search/filters', {
      params: {
        country,
        show_type: type,
        order_by: 'popularity_1year',
        genres_relation: 'and',
        output_language: 'en',
        catalogs: 'netflix.subscription,prime.subscription,disney.subscription',
      },
    });
    return response.data.shows || [];
  } catch (error) {
    console.error(`Error fetching trending ${type}:`, error);
    // Return mock data as fallback
    return type === 'movie' ? mockMovies : mockSeries;
  }
}

/**
 * Get show details by ID
 * @param id - ID dari show
 */
export async function getDetails(id: string): Promise<ShowDetails | null> {
  try {
    const response = await apiClient.get(`/shows/${id}`, {
      params: {
        output_language: 'en',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    return null;
  }
}

/**
 * Search shows by keyword
 * @param query - kata kunci pencarian
 * @param country - kode negara (default: 'us')
 */
export async function searchByKeyword(
  query: string,
  country: string = 'us'
): Promise<Show[]> {
  // Langsung gunakan mock data untuk search yang reliable
  const allMockData = [...mockMovies, ...mockSeries];
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }
  
  const searchResults = allMockData.filter(show => {
    const titleMatch = show.title.toLowerCase().includes(searchTerm);
    const originalTitleMatch = show.originalTitle.toLowerCase().includes(searchTerm);
    const overviewMatch = show.overview?.toLowerCase().includes(searchTerm);
    const genreMatch = show.genres?.some(genre => 
      genre.name.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || originalTitleMatch || overviewMatch || genreMatch;
  });
  
  console.log(`Search for "${query}" found ${searchResults.length} results`);
  return searchResults;
}

/**
 * Get shows by genre
 * @param genre - ID atau nama genre
 * @param type - 'movie' atau 'series'
 * @param country - kode negara (default: 'us')
 */
export async function getShowsByGenre(
  genre: string,
  type: 'movie' | 'series' = 'movie',
  country: string = 'us'
): Promise<Show[]> {
  try {
    const response = await apiClient.get('/shows/search/filters', {
      params: {
        country,
        show_type: type,
        genres: genre,
        order_by: 'popularity_1year',
        output_language: 'en',
      },
    });
    return response.data.shows || [];
  } catch (error) {
    console.error(`Error fetching ${type} by genre "${genre}":`, error);
    return [];
  }
}

/**
 * Get shows by multiple filters
 * @param filters - object dengan berbagai filter
 */
export async function getShowsByFilters(filters: {
  country?: string;
  showType?: 'movie' | 'series';
  genres?: string;
  orderBy?: string;
  catalogs?: string;
}): Promise<Show[]> {
  try {
    const response = await apiClient.get('/shows/search/filters', {
      params: {
        country: filters.country || 'us',
        show_type: filters.showType,
        genres: filters.genres,
        order_by: filters.orderBy || 'popularity_1year',
        catalogs: filters.catalogs,
        output_language: 'en',
      },
    });
    return response.data.shows || [];
  } catch (error) {
    console.error('Error fetching shows by filters:', error);
    // Return mock data as fallback
    return filters.showType === 'series' ? mockSeries : mockMovies;
  }
}

