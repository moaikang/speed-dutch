// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QS } from '@toss/utils';
import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { match } from 'ts-pattern';
import { GetNearFacilitiesResponse } from '../../src/models/near-facilities';
import { FilterTab } from '../../src/models/search-result/tab';
import { http } from '../../src/utils/http';

const SECRET_KEY = 'l7xx2561b933bc0b4e60b6913da310a04c19';

/* 좌표 근처 주변시설 리스트 조회 */
const getNearFacilities = async ({ lat, lon, category }: { lat: number; lon: number; category: FilterTab }) => {
  const { data } = await http.get<GetNearFacilitiesResponse>(
    `https://apis.openapi.sk.com/tmap/pois/search/around${QS.create({
      count: 30,
      page: 1,
      version: 1,
      appKey: SECRET_KEY,
      centerLat: lat,
      centerLon: lon,
      radius: 2,
      categories: match(category)
        .with('cafe', () => '카페')
        .with('culture', () => '문화시설')
        .with('public-transport', () => '대중교통')
        .with('restaurant', () => '식당')
        .otherwise(() => '대중교통'),
    })}`,
  );

  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const query = req.query;

  try {
    const facilities = await getNearFacilities({
      lat: Number(query.lat),
      lon: Number(query.lon),
      category: query.category as FilterTab,
    });

    return res.status(200).json(facilities);
  } catch (err) {
    if (isAxiosError(err)) {
      return res.status(Number(err?.code));
    }

    return res.status(500);
  }
}
