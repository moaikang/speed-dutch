import { Flex, Spacing, Stack } from '@toss/emotion-utils';
import { useRouter } from 'next/router';
import { usePoiList } from '../atoms/search';
import FixedBottomCTA from '../components/FixedBottomCTA';
import Txt from '../components/Txt';
import WithCenter from '../components/WithCenter';
import { Route } from '../constants/Route';
import { Logo } from '../icons';
import AddressAddButton from './components/AddressAddButton';
import PoiSearchInput from './components/PoiSearchInput';

const MINIMUN_POI_COUNT_FOR_SEARCH = 2;

function Home() {
  const { poiList, getNotEmptyPoiLength, getCenterOfPoiList } = usePoiList();

  const router = useRouter();

  return (
    <>
      <Spacing size={42} />
      <WithCenter>
        <Logo />
      </WithCenter>
      <Spacing size={16} />
      <Txt size="big" center>
        만날 장소가 고민이라면
        <br /> 중간지점에서 만나보세요!
      </Txt>
      <Spacing size={42} />
      <Stack gutter={16}>
        {poiList.map((poi, index) => (
          <PoiSearchInput key={poi?.pkey} index={index} placeholder="위치를 입력해주세요" />
        ))}
        <AddressAddButton />
      </Stack>
      <FixedBottomCTA
        disabled={getNotEmptyPoiLength() < MINIMUN_POI_COUNT_FOR_SEARCH}
        onClick={async () => {
          await router.push(Route.검색결과({ ...getCenterOfPoiList() }));
        }}
      >
        중간지점 찾기
      </FixedBottomCTA>
    </>
  );
}

export default Home;
