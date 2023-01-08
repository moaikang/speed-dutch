import { FilterTab } from './tab';

export interface SearchResultQueryParams {
  lat: number;
  lon: number;
  tab?: FilterTab;
  selectLat?: number;
  selectLon?: number;
}
