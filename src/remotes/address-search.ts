import { http } from '../utils/http';

const APP_KEY = 'fd250eebdf484a919af973233a1410b9 ';

/* 키워드로 주소 목록을 받아옴 */
export const getAddressList = async (keyword: string) => {
  const { data } = await http.get(`https://apis.openapi.sk.com/tmap/pois?searchKeyword=${keyword}appKey=${APP_KEY}`);
  return data;
};
