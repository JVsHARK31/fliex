import * as cheerio from 'cheerio';
import axios from 'axios';
import { Show, ShowDetails } from './types';
import { mockMovies, mockSeries } from './mockData';
import { getLK21Movies, searchLK21, getLK21MovieDetail, getLK21ByGenre } from './lk21-api';

// Base URLs
const LK21_URL = process.env.LK21_URL || 'https://tv.lk21official.live';
const ND_URL = process.env.ND_URL || 'https://tv.nontondrama.lol';

// Axios instance with User-Agent to avoid simple blocks
const client = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});

/**
 * Helper to map LK21 structure to our Show interface
 */
function mapLK21ToShow(element: cheerio.Cheerio<any>, $: cheerio.CheerioAPI, type: 'movie' | 'series' = 'movie'): Show {
  const link = $(element).find('h2.entry-title a');
  const rawId = link.attr('href');
  // Extract slug as ID (remove domain)
  const id = rawId ? rawId.replace(/\/$/, '').split('/').pop() || '' : '';
  
  const title = link.text().trim();
  const posterUrl = $(element).find('img').attr('src') || '';
  const ratingText = $(element).find('.gmr-rating-item').text().trim();
  const yearText = $(element).find('.gmr-movie-on').text().trim(); // Adjust selector based on actual site

  // Use 'https:' prefix if missing
  const fullPosterUrl = posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl;

  return {
    id,
    title,
    overview: '', // List view usually has no overview
    releaseYear: parseInt(yearText) || new Date().getFullYear(),
    firstAirYear: parseInt(yearText) || new Date().getFullYear(),
    originalTitle: title,
    genres: [], // List view usually has no genres details
    rating: parseFloat(ratingText) || 0,
    imageSet: {
      verticalPoster: {
        w240: fullPosterUrl,
        w360: fullPosterUrl,
        w480: fullPosterUrl,
        w600: fullPosterUrl,
        w720: fullPosterUrl,
      },
      horizontalPoster: {
        w360: fullPosterUrl,
        w480: fullPosterUrl,
        w720: fullPosterUrl,
        w1080: fullPosterUrl,
        w1440: fullPosterUrl,
      },
    },
    showType: type,
  };
}

/**
 * Get trending shows - Try LK21 API first, fallback to mock data
 */
export async function getTrending(
  type: 'movie' | 'series',
  country: string = 'us'
): Promise<Show[]> {
  // Try LK21 API for movies
  if (type === 'movie') {
    try {
      const lk21Movies = await getLK21Movies(1);
      if (lk21Movies.length > 0) {
        console.log(`✅ Loaded ${lk21Movies.length} movies from LK21 API`);
        return lk21Movies;
      }
    } catch (error) {
      console.log('⚠️ LK21 API not available, using mock data');
    }
  }
  
  // Fallback to mock data
  console.log(`📦 Using mock data for ${type}`);
  return type === 'movie' ? mockMovies : mockSeries;
}

/**
 * Search shows by keyword - Try LK21 API first
 */
export async function searchByKeyword(
  query: string,
  country: string = 'us'
): Promise<Show[]> {
  // Try LK21 API search
  try {
    const lk21Results = await searchLK21(query);
    if (lk21Results.length > 0) {
      console.log(`✅ Found ${lk21Results.length} results from LK21 API`);
      return lk21Results;
    }
  } catch (error) {
    console.log('⚠️ LK21 API search failed, using mock data');
  }
  
  // Fallback to mock data search
  const allMockData = [...mockMovies, ...mockSeries];
  const results = allMockData.filter(show => 
    show.title.toLowerCase().includes(query.toLowerCase()) ||
    show.originalTitle.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log(`📦 Found ${results.length} results from mock data`);
  return results;
}

/**
 * Get details - Try LK21 API first, then mock data
 */
export async function getDetails(id: string): Promise<ShowDetails | null> {
  // Try LK21 API
  try {
    const lk21Detail = await getLK21MovieDetail(id);
    if (lk21Detail) {
      console.log(`✅ Loaded detail from LK21 API: ${lk21Detail.title}`);
      return lk21Detail;
    }
  } catch (error) {
    console.log('⚠️ LK21 API detail failed, checking mock data');
  }
  
  // Fallback to mock data
  const allMockData = [...mockMovies, ...mockSeries];
  const mock = allMockData.find(s => s.id === id);
  
  if (mock) {
    console.log(`📦 Loaded detail from mock data: ${mock.title}`);
    return { ...mock };
  }
  
  console.log(`❌ Movie ${id} not found`);
  return null;
}

/**
 * Get shows by genre - Try LK21 API first
 */
export async function getShowsByGenre(
  genre: string,
  type: 'movie' | 'series' = 'movie',
  country: string = 'us'
): Promise<Show[]> {
  // Try LK21 API for movies
  if (type === 'movie') {
    try {
      const lk21Movies = await getLK21ByGenre(genre, 1);
      if (lk21Movies.length > 0) {
        console.log(`✅ Loaded ${lk21Movies.length} ${genre} movies from LK21 API`);
        return lk21Movies;
      }
    } catch (error) {
      console.log(`⚠️ LK21 API genre failed for ${genre}`);
    }
  }
  
  // Fallback to mock data filtered by genre
  const allMockData = type === 'movie' ? mockMovies : mockSeries;
  const filtered = allMockData.filter(show => 
    show.genres?.some(g => g.id === genre || g.name.toLowerCase() === genre.toLowerCase())
  );
  
  return filtered.length > 0 ? filtered : allMockData;
}

/**
 * Get shows by filters (mapped to recent/trending)
 */
export async function getShowsByFilters(filters: any): Promise<Show[]> {
  // Reuse getTrending logic for simplicity in this scraping implementation
  return getTrending(filters.showType || 'movie');
}
