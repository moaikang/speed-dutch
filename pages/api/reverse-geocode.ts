// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ReverseGeoCodeResult } from '../../src/models/geoCode';
import { http } from '../../src/utils/http';

const SECRET_KEY = 'l7xx2561b933bc0b4e60b6913da310a04c19';

/* 키워드로 주소 목록을 받아옴 */
export const getAddressByLatLon = async ({ lat, lon }: { lat: number; lon: number }) => {
  const { data } = await http.get<ReverseGeoCodeResult>(
    'https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result',
    {
      params: {
        appKey: SECRET_KEY,
        coordType: 'WGS84GEO',
        addressType: 'A10',
        lon: lon,
        lat: lat,
      },
    },
  );

  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const query = req.query;
  try {
    const addressList = await getAddressByLatLon({ lat: Number(query.lat), lon: Number(query.lon) });
    res.status(200).json(addressList);
  } catch (err) {
    if (isAxiosError(err)) {
      res.status(Number(err?.code));
    }
  }
}
