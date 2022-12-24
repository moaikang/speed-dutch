import { Flex, Spacing, Stack } from '@toss/emotion-utils';
import { useRecoilState } from 'recoil';
import { addressSearchListAtom } from '../atoms/search';
import AddressAddButton from '../components/AddressAddButton';
import AddressSearchInput from '../components/AddressSearchInput';
import FixedBottomCTA from '../components/FixedBottomCTA';
import Txt from '../components/Txt';
import { Logo } from '../icons';

function Home() {
  const [addressSearchList, setAddressSearchList] = useRecoilState(addressSearchListAtom);

  return (
    <>
      <Spacing size={42} />
      <Flex width="100%" justify="center">
        <Logo />
      </Flex>
      <Spacing size={16} />
      <Flex width="100%" justify="center">
        <Txt size="big">
          만날 장소가 고민이라면
          <br /> 중간지점에서 만나보세요!
        </Txt>
      </Flex>
      <Spacing size={42} />
      <Stack gutter={16}>
        {addressSearchList.map((addressSearch, index) => (
          <AddressSearchInput
            key={addressSearch}
            index={index}
            onAddressChange={() => {}}
            placeholder="위치를 입력해주세요"
          />
        ))}
        <AddressAddButton />
      </Stack>
      <FixedBottomCTA disabled>중간지점 찾기</FixedBottomCTA>
    </>
  );
}

export default Home;
