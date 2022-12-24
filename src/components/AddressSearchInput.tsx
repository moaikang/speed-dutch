import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useOverlay } from '@toss/use-overlay';
import { useState } from 'react';
import { QUERY_KEY } from '../constants/QueryKey';
import { useDebounce } from '../hooks/useDebounce';
import { SearchInputMarker } from '../icons';
import { Poi } from '../models/poi';
import { getAddressList } from '../remotes/address-search';
import { COLOR } from '../themes/color';
import SearchBar from './SearchBar';
import Txt from './Txt';

function SearchPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { refetch: 장소_검색하기, data: 장소_리스트 } = useQuery(
    QUERY_KEY.장소_검색하기(searchKeyword),
    async () => getAddressList(searchKeyword),
    {
      enabled: false,
    },
  );

  const 장소_검색하기_디바운스 = useDebounce(장소_검색하기, 200);

  return (
    <SearchPageWrapper>
      <SearchBar
        value={searchKeyword}
        onChange={e => {
          setSearchKeyword(e.target.value);
          장소_검색하기_디바운스();
        }}
      />
      {장소_리스트 != null ? <SearchList poiList={장소_리스트.searchPoiInfo.pois.poi} /> : <div>ㅎㅎ</div>}
    </SearchPageWrapper>
  );
}

function SearchList({ poiList }: { poiList: Poi[] }) {
  return (
    <>
      {poiList.map(poiItem => (
        <div key={poiItem.id}>{poiItem.name}</div>
      ))}
    </>
  );
}

function useSearchPageOverlay() {
  const { open } = useOverlay({ exitOnUnmount: true });

  return () => new Promise(resolve => open(({ isOpen, close, exit }) => <SearchPage />));
}

interface Props {
  onAddressChange?: () => void;
  index: number;
  disabled?: boolean;
  placeholder?: string;
}

function AddressSearchInput({ onAddressChange, index, disabled = false, placeholder }: Props) {
  const openSearchOverlay = useSearchPageOverlay();

  return (
    <StyledButton
      onClick={() => {
        openSearchOverlay();
      }}
    >
      <SearchInputMarker index={index} disabled={disabled} />
      <MarginTxt color="GREY3">{placeholder}</MarginTxt>
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

export const MarginTxt = styled(Txt)`
  margin-left: 8px;
`;

export default AddressSearchInput;
