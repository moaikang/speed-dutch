import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Flex, FullHeight, Spacing, Stack } from '@toss/emotion-utils';
import { useOverlay } from '@toss/use-overlay';
import { useState } from 'react';
import { match, Pattern } from 'ts-pattern';
import { usePoiList } from '../../../atoms/search';
import List from '../../../components/List';
import SearchBar from '../../../components/SearchBar';
import Txt from '../../../components/Txt';
import { QUERY_KEY } from '../../../constants/QueryKey';
import { useDebounce } from '../../../hooks/useDebounce';
import { Arrow, Close, SearchInputMarker } from '../../../icons';
import { Poi } from '../../../models/poi';
import { getPoiList } from '../../../remotes/poi-search';
import { COLOR } from '../../../themes/color';

function SearchPage({ onSelectPoi, onClose }: { onSelectPoi: (poi: Poi) => void; onClose: () => void }) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const {
    refetch: POI_리스트_검색하기,
    data: poiListSearchResponse,
    fetchStatus,
  } = useQuery(QUERY_KEY.POI_LIST(searchKeyword), async () => getPoiList(searchKeyword), {
    enabled: false,
    keepPreviousData: true,
  });

  const POI_리스트_검색하기_디바운스 = useDebounce(POI_리스트_검색하기, 200);

  const poiList = poiListSearchResponse?.searchPoiInfo?.pois?.poi ?? [];

  return (
    <SearchPageWrapper>
      <Stack.Horizontal align="center" gutter={8}>
        <Arrow color="WHITE" direction="left" onClick={() => onClose()} />
        <SearchBar
          value={searchKeyword}
          onChange={e => {
            setSearchKeyword(e.target.value);
            POI_리스트_검색하기_디바운스();
          }}
        />
      </Stack.Horizontal>
      <Spacing size={11} />
      {match({ poiList, searchKeyword, fetchStatus })
        .when(
          ({ searchKeyword }) => searchKeyword.length === 0,
          () => null,
        )
        .with({ fetchStatus: 'fetching' }, () => (
          <CenterFullHeight>
            <Txt>검색하고 있어요...</Txt>
          </CenterFullHeight>
        ))
        .when(
          ({ poiList }) => poiList.length > 0,
          () => (
            <List>
              {poiList.map(poiItem => (
                <List.Item
                  type="arrow"
                  key={poiItem.pkey}
                  title={poiItem.name}
                  description={poiItem.newAddressList.newAddress[0].fullAddressRoad ?? '상세 주소 없음'}
                  onClick={() => onSelectPoi(poiItem)}
                />
              ))}
            </List>
          ),
        )
        .otherwise(() => (
          <CenterFullHeight>
            <Txt>검색 결과가 없습니다</Txt>
          </CenterFullHeight>
        ))}
    </SearchPageWrapper>
  );
}

function useSearchPageOverlay() {
  const { open } = useOverlay({ exitOnUnmount: true });

  return () =>
    new Promise<Poi | null>(resolve =>
      open(({ exit }) => (
        <SearchPage
          onSelectPoi={poi => {
            resolve(poi);
            exit();
          }}
          onClose={() => {
            resolve(null);
            exit();
          }}
        />
      )),
    );
}

interface Props {
  index: number;
  placeholder?: string;
}

function PoiSearchInput({ index, placeholder }: Props) {
  const openSearchOverlay = useSearchPageOverlay();

  const { changePoiItem, resetPoiItem, getPoiByIndex, removePoi } = usePoiList();
  const poi = getPoiByIndex(index);

  return (
    <StyledButton
      onClick={async () => {
        const selectedPoi = await openSearchOverlay();
        if (selectedPoi != null) {
          changePoiItem(index, selectedPoi);
        }
      }}
    >
      <Flex align="center">
        <SearchInputMarker index={index} disabled={poi == null} />
        <MarginTxt color={poi == null ? 'GREY3' : 'GREY5'}>
          {match(poi)
            .with(Pattern.not(Pattern.nullish), poi => poi.name)
            .otherwise(() => placeholder)}
        </MarginTxt>
      </Flex>
      <Close
        onClick={e => {
          e.stopPropagation();

          if (poi == null) {
            removePoi(index);
          } else {
            resetPoiItem(index);
          }
        }}
      />
    </StyledButton>
  );
}

const SearchPageWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.GREY7};
  padding: 11px 16px 0 16px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: ${COLOR.WHITE};
  border-radius: 12px;
`;

export const MarginTxt = styled(Txt)`
  margin-left: 8px;
`;

export const CenterFullHeight = styled(FullHeight)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PoiSearchInput;
