import { FilterTab } from '../models/search-result/tab';

export const QUERY_KEY = {
  POI_LIST: (key: string) => ['POI_LIST', key],
  REVERSE_GEOCODE: ({ lat, lon }: { lat: number; lon: number }) => ['REVERSE_GEOCODE', lat, lon],
  NEAR_FACILITIES: ({ lat, lon, category }: { lat: number; lon: number; category: FilterTab }) => [
    'NEAR_FACILITIES',
    lat,
    lon,
    category,
  ],
} as const;
