export const QUERY_KEY = {
  POI_LIST: (key: string) => ['POI_LIST', key],
  REVERSE_GEOCODE: ({ lat, lon }: { lat: string; lon: string }) => ['REVERSE_GEOCODE', lat, lon],
} as const;
