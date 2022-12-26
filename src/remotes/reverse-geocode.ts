import { ReverseGeoCodeResult } from '../models/geoCode';
import { http } from '../utils/http';

/* 위도 경도로 주소 조회 */
export const getAddressByLocation = async ({ lat, lon }: { lat: number; lon: number }) => {
  const { data } = await http.get<ReverseGeoCodeResult>('/api/reverse-geocode', {
    params: {
      lon: lon,
      lat: lat,
    },
  });

  return data;
};
