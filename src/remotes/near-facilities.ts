import { GetNearFacilitiesResponse } from '../models/near-facilities';
import { FilterTab } from '../models/search-result/tab';
import { http } from '../utils/http';

/* 키워드로 POI 목록을 받아옴 */
export const getNearFacilities = async (params: { lat: number; lon: number; category: FilterTab }) => {
  const { data } = await http.get<GetNearFacilitiesResponse>(`/api/near-facilities`, {
    params,
  });

  return data;
};
