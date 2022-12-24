// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AxiosError, isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GetPOIListResponse } from '../../src/models/poi';
import { http } from '../../src/utils/http';

const SECRET_KEY = 'l7xx2561b933bc0b4e60b6913da310a04c19';

/* 키워드로 주소 목록을 받아옴 */
export const getAddressList = async (keyword: string) => {
  const { data } = await http.get<GetPOIListResponse>(
    `https://apis.openapi.sk.com/tmap/pois?searchKeyword=${keyword}&appKey=${SECRET_KEY}`,
  );
  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const query = req.query;
  try {
    const addressList = await getAddressList(query.searchKeyword as string);
    res.status(200).json(addressList);
  } catch (err) {
    if (isAxiosError(err)) {
      res.status(Number(err?.code));
    }
  }
}
