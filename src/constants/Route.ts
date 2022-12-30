import { QS } from '@toss/utils';
import { SearchResultQueryParams } from '../models/search-result/params';

export const Route = {
  홈: () => `/`,
  검색결과: (params: SearchResultQueryParams) => `/search-result${QS.create(params)}`,
};
