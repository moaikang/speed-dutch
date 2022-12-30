import { Stack } from '@toss/emotion-utils';
import { useRouter } from 'next/router';
import Chip from '../components/Chip';
import FixedBottomCTA from '../components/FixedBottomCTA';
import FixedBottomSheet from '../components/FixedBottomSheet';
import KakaoMap from '../components/KakaoMap';
import SSRSuspense from '../components/SSRSuspense';
import Txt from '../components/Txt';
import { QUERY_KEY } from '../constants/QueryKey';
import { Route } from '../constants/Route';
import { useSuspendedQuery } from '../hooks/useSuspendedQuery';
import { SearchResultQueryParams } from '../models/search-result/params';
import { FilterTab } from '../models/search-result/tab';
import { getAddressByLocation } from '../remotes/reverse-geocode';

const NEAR_LOCATION_FILTER_CHIPS: Array<{ name: string; value: FilterTab }> = [
  { name: '대중교통', value: 'public-transport' },
  { name: '음식점', value: 'restaurant' },
  { name: '카페', value: 'cafe' },
  { name: '문화시설', value: 'culture' },
];

function SearchResult() {
  const router = useRouter();
  const { lat, lon } = router.query;

  if (lat == null || lon == null) {
    return <div>엥</div>;
  }

  return (
    <>
      <KakaoMap lat={Number(lat)} lon={Number(lon)} />
      <SSRSuspense fallback={null}>
        <Result />
      </SSRSuspense>
    </>
  );
}

function Result() {
  const router = useRouter();
  const { lat, lon, tab } = router.query;

  const { data } = useSuspendedQuery(QUERY_KEY.REVERSE_GEOCODE({ lat: lat as string, lon: lon as string }), async () =>
    getAddressByLocation({ lat: Number(lat), lon: Number(lon) }),
  );

  const pushToNearLocation = (tab: FilterTab = 'public-transport') => {
    router.push(Route.검색결과({ lat: Number(lat), lon: Number(lon), tab }));
  };

  return tab == null ? (
    <FixedBottomCTA
      description={
        <Stack gutter={16}>
          <Txt size="semi-big" color="ORANGE">
            중간지점 결과
          </Txt>
          <Txt textAlign="start" size="big" weight="normal">
            {data.addressInfo.fullAddress}
          </Txt>
        </Stack>
      }
      onClick={() => pushToNearLocation('public-transport')}
    >
      중간지점 주변 살펴보기
    </FixedBottomCTA>
  ) : (
    <FixedBottomSheet>
      <Stack.Horizontal gutter={8}>
        {NEAR_LOCATION_FILTER_CHIPS.map(({ value, name }) => (
          <Chip
            key={value}
            active={value === tab}
            onClick={() =>
              router.push(Route.검색결과({ ...(router.query as unknown as SearchResultQueryParams), tab: value }))
            }
          >
            {name}
          </Chip>
        ))}
      </Stack.Horizontal>
    </FixedBottomSheet>
  );
}

export default SearchResult;
