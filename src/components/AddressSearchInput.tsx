import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Flex, Spacing } from '@toss/emotion-utils';
import { useOverlay } from '@toss/use-overlay';
import { useState } from 'react';
import { match, Pattern } from 'ts-pattern';
import { QUERY_KEY } from '../constants/QueryKey';
import { useDebounce } from '../hooks/useDebounce';
import { Arrow, SearchInputMarker } from '../icons';
import { Poi } from '../models/poi';
import { getPoiList } from '../remotes/poi-search';
import { COLOR } from '../themes/color';
import SearchBar from './SearchBar';
import Txt from './Txt';

function SearchPage({ onSelectPoi, onClose }: { onSelectPoi: (poi: Poi) => void; onClose: () => void }) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { refetch: POI_리스트_검색하기, data: poiList } = useQuery(
    QUERY_KEY.POI_LIST(searchKeyword),
    async () => getPoiList(searchKeyword),
    {
      enabled: false,
    },
  );

  const POI_리스트_검색하기_디바운스 = useDebounce(POI_리스트_검색하기, 200);

  return (
    <SearchPageWrapper>
      <SearchBar
        value={searchKeyword}
        onChange={e => {
          setSearchKeyword(e.target.value);
          POI_리스트_검색하기_디바운스();
        }}
      />
      <Spacing size={11} />
      {poiList != null ? (
        <SearchListWrapper>
          {poiList.searchPoiInfo.pois.poi.map(poiItem => (
            <PoiItem key={poiItem.pkey} poi={poiItem} onSelectPoi={onSelectPoi} />
          ))}
        </SearchListWrapper>
      ) : null}
    </SearchPageWrapper>
  );
}

function PoiItem({ poi, onSelectPoi }: { poi: Poi; onSelectPoi: (poi: Poi) => void }) {
  const fullAddressRoad = poi.newAddressList.newAddress[0].fullAddressRoad ?? '상세 주소 없음';

  return (
    <SearchItemWrapper onClick={() => onSelectPoi(poi)}>
      <Flex direction="column" style={{ gap: '6px' }}>
        <Txt>{poi.name}</Txt>
        <Txt size="small">{fullAddressRoad}</Txt>
      </Flex>
      <Arrow direction="right" />
    </SearchItemWrapper>
  );
}

function useSearchPageOverlay() {
  const { open } = useOverlay({ exitOnUnmount: true });

  return () =>
    new Promise<Poi>(resolve =>
      open(({ exit }) => (
        <SearchPage
          onSelectPoi={poi => {
            resolve(poi);
            exit();
          }}
          onClose={exit}
        />
      )),
    );
}

interface Props {
  index: number;
  placeholder?: string;
}

function AddressSearchInput({ index, placeholder }: Props) {
  const openSearchOverlay = useSearchPageOverlay();

  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  return (
    <StyledButton
      onClick={async () => {
        const selectedPoi = await openSearchOverlay();
        setSelectedPoi(selectedPoi);
      }}
    >
      <SearchInputMarker index={index} disabled={selectedPoi == null} />
      <MarginTxt color={selectedPoi == null ? 'GREY3' : 'GREY5'}>
        {match(selectedPoi)
          .with(Pattern.not(Pattern.nullish), poi => poi.name)
          .otherwise(() => placeholder)}
      </MarginTxt>
    </StyledButton>
  );
}

const SearchPageWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100vw - 32px);
  height: 100vh;
  background-color: ${COLOR.GREY7};
  padding: 11px 16px 0 16px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: ${COLOR.WHITE};
  border-radius: 12px;
`;

export const SearchListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SearchItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 19px 0;
`;

export const MarginTxt = styled(Txt)`
  margin-left: 8px;
`;

export default AddressSearchInput;
