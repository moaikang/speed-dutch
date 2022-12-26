import { Stack } from '@toss/emotion-utils';
import { useRouter } from 'next/router';
import KakaoMap from '../components/KakaoMap';
import SSRSuspense from '../components/SSRSuspense';
import Txt from '../components/Txt';
import { QUERY_KEY } from '../constants/QueryKey';
import { useSuspendedQuery } from '../hooks/useSuspendedQuery';
import { getAddressByLocation } from '../remotes/reverse-geocode';

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
  const { lat, lon } = router.query;

  const { data } = useSuspendedQuery(QUERY_KEY.REVERSE_GEOCODE({ lat: lat as string, lon: lon as string }), async () =>
    getAddressByLocation({ lat: Number(lat), lon: Number(lon) }),
  );

  return (
    <Stack>
      <Txt size="big">중간위치는 바로~~~~ 요기입니다!</Txt>
      <Txt>{data.addressInfo.fullAddress}</Txt>
    </Stack>
  );
}

export default SearchResult;
