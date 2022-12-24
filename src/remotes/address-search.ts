import { GetPOIListResponse } from '../models/poi';
import { http } from '../utils/http';

const APP_KEY = 'fd250eebdf484a919af973233a1410b9 ';
const SECRET_KEY = 'l7xx2561b933bc0b4e60b6913da310a04c19';

/* 키워드로 주소 목록을 받아옴 */
export const getAddressList = async (keyword: string) => {
  const { data } = await http.get<GetPOIListResponse>(`/api/poi?searchKeyword=${keyword}`);
  return data;
};
