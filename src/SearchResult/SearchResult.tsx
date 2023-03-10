import { Stack } from '@toss/emotion-utils';
import assert from 'assert';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Chip from '../components/Chip';
import FixedBottomCTA from '../components/FixedBottomCTA';
import KakaoMap from '../components/KakaoMap';
import List from '../components/List';
import SSRSuspense from '../components/SSRSuspense';
import Txt from '../components/Txt';
import { QUERY_KEY } from '../constants/QueryKey';
import { Route } from '../constants/Route';
import { useSuspendedQuery } from '../hooks/useSuspendedQuery';
import { Poi } from '../models/near-facilities';
import { SearchResultQueryParams } from '../models/search-result/params';
import { FilterTab } from '../models/search-result/tab';
import { getNearFacilities } from '../remotes/near-facilities';
import { getAddressByLocation } from '../remotes/reverse-geocode';
import { copyToClipboard, openShareBottomSheet } from '../utils/clipboard';

const NEAR_LOCATION_FILTERS: Array<{ name: string; value: FilterTab }> = [
  { name: '대중교통', value: 'public-transport' },
  { name: '음식점', value: 'restaurant' },
  { name: '카페', value: 'cafe' },
  { name: '문화시설', value: 'culture' },
];

function SearchResult() {
  const router = useRouter();
  const { lat, lon, selectLat, selectLon } = router.query;

  if (lat == null || lon == null) {
    return <div>엥</div>;
  }

  const selectCoord =
    selectLat != null && selectLon != null
      ? {
          lat: Number(selectLat),
          lon: Number(selectLon),
        }
      : undefined;

  return (
    <>
      <KakaoMap centerCoordinate={{ lat: Number(lat), lon: Number(lon) }} selectCoordinate={selectCoord} />
      <SSRSuspense fallback={null}>
        <Result />
      </SSRSuspense>
    </>
  );
}

function Result() {
  const router = useRouter();
  const { lat, lon, tab } = router.query;
  const [selectedItem, setSelectedItem] = useState<Poi | null>(null);

  const { data } = useSuspendedQuery(QUERY_KEY.REVERSE_GEOCODE({ lat: Number(lat), lon: Number(lon) }), async () =>
    getAddressByLocation({ lat: Number(lat), lon: Number(lon) }),
  );

  const pushToNearLocationList = (tab: FilterTab = 'public-transport') => {
    router.push(Route.검색결과({ lat: Number(lat), lon: Number(lon), tab }));
  };

  const handleItemSelect = (item: Poi | null) => {
    setSelectedItem(item);
    if (item) {
      router.push(
        Route.검색결과({
          ...router.query,
          lat: Number(lat),
          lon: Number(lon),
          selectLat: Number(item.frontLat),
          selectLon: Number(item.frontLon),
        }),
      );
    }
  };

  return tab == null ? (
    <FixedBottomCTA
      takeSpace={false}
      description={
        <Stack gutter={16}>
          <Txt size="semi-big" color="ORANGE">
            중간지점 결과
          </Txt>
          <Txt textAlign="start" size="big" weight="normal">
            {`${data.addressInfo.city_do} ${data.addressInfo.gu_gun} ${data.addressInfo.legalDong}`}
          </Txt>
        </Stack>
      }
      onClick={() => pushToNearLocationList('restaurant')}
    >
      중간지점 주변 살펴보기
    </FixedBottomCTA>
  ) : (
    <FixedBottomCTA
      takeSpace={false}
      description={
        <>
          <NearLocationFilterList />
          <SSRSuspense fallback={null}>
            <NearLocationList selectedItem={selectedItem} onItemSelect={handleItemSelect} />
          </SSRSuspense>
        </>
      }
      disabled={selectedItem == null}
      onClick={async () => {
        try {
          assert(selectedItem != null);
          await openShareBottomSheet({
            title: '더치 | 더 편리한 위치찾기',
            text: `중간에 위치한 ${selectedItem.name} 어때요?`,
            url: window.location.href,
          });
        } catch (err) {
          await copyToClipboard(window.location.href);
          window.alert('클립보드에 링크를 복사했어요');
        }
      }}
    >
      친구에게 공유
    </FixedBottomCTA>
  );
}

function NearLocationFilterList() {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <Stack.Horizontal gutter={8}>
      {NEAR_LOCATION_FILTERS.filter(filter => filter.value !== 'public-transport').map(({ value, name }) => (
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
  );
}

function NearLocationList({
  selectedItem,
  onItemSelect,
}: {
  selectedItem: Poi | null;
  onItemSelect: (item: Poi | null) => void;
}) {
  const router = useRouter();
  const { tab, lat, lon } = router.query;

  const searchParams = useMemo(() => {
    return {
      category: tab,
      lat,
      lon,
    } as unknown as {
      category: FilterTab;
      lat: number;
      lon: number;
    };
  }, [tab, lat, lon]);

  const {
    data: {
      searchPoiInfo: {
        pois: { poi: 검색결과_리스트 },
      },
    },
  } = useSuspendedQuery(QUERY_KEY.NEAR_FACILITIES(searchParams), () => getNearFacilities(searchParams));

  return (
    <List height="216px">
      {검색결과_리스트.map(검색결과 => (
        <List.Item
          key={검색결과.pkey}
          type="default"
          selected={검색결과.pkey === selectedItem?.pkey}
          title={검색결과.name}
          description={[
            검색결과.upperAddrName,
            검색결과.middleAddrName,
            검색결과.lowerAddrName,
            검색결과.roadName,
          ].join(' ')}
          onClick={() => {
            const isSameItem = 검색결과.pkey === selectedItem?.pkey;
            onItemSelect(isSameItem ? null : 검색결과);
          }}
        />
      ))}
    </List>
  );
}

export default SearchResult;
