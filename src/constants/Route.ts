import { QS } from '@toss/utils';

export const Route = {
  홈: () => `/`,
  검색결과: (params: { lat: number; lon: number }) => `/search-result${QS.create(params)}`,
};
