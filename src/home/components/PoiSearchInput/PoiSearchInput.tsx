import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Flex, Spacing } from '@toss/emotion-utils';
import { useDebounce } from '@toss/react';
import { useOverlay } from '@toss/use-overlay';
import { useState } from 'react';
import { match, Pattern } from 'ts-pattern';
import { usePoiList } from '../../../atoms/search';
import Layout from '../../../components/Layout';
import List from '../../../components/List';
import SearchBar from '../../../components/SearchBar';
import Txt from '../../../components/Txt';
import { QUERY_KEY } from '../../../constants/QueryKey';
import { Close, SearchInputMarker } from '../../../icons';
import { Poi } from '../../../models/poi';
import { getPoiList } from '../../../remotes/poi-search';
import { COLOR } from '../../../themes/color';

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
      <Layout>
        <SearchBar
          value={searchKeyword}
          onChange={e => {
            setSearchKeyword(e.target.value);
            POI_리스트_검색하기_디바운스();
          }}
        />
        <Spacing size={11} />
        {poiList != null ? (
          <List>
            {poiList.searchPoiInfo.pois.poi.map(poiItem => (
              <List.Item
                type="arrow"
                key={poiItem.pkey}
                title={poiItem.name}
                description={poiItem.newAddressList.newAddress[0].fullAddressRoad ?? '상세 주소 없음'}
                onClick={() => onSelectPoi(poiItem)}
              />
            ))}
          </List>
        ) : null}
      </Layout>
    </SearchPageWrapper>
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

function PoiSearchInput({ index, placeholder }: Props) {
  const openSearchOverlay = useSearchPageOverlay();

  const { changePoiItem, resetPoiItem, getPoiByIndex, removePoi } = usePoiList();
  const poi = getPoiByIndex(index);

  return (
    <StyledButton
      onClick={async () => {
        const selectedPoi = await openSearchOverlay();
        changePoiItem(index, selectedPoi);
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

export default PoiSearchInput;
