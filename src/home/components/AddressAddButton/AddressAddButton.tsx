import styled from '@emotion/styled';
import { usePoiList } from '../../../atoms/search';
import Txt from '../../../components/Txt';
import { SearchInputMarker } from '../../../icons';
import { COLOR } from '../../../themes/color';

// TODO: 위치 추가 버튼 Disable 디자인 개발
function AddressAddButton() {
  const { addEmptyPoi, isFullPoiList } = usePoiList();

  return (
    <StyledButton
      onClick={() => {
        addEmptyPoi();
      }}
      disabled={isFullPoiList()}
    >
      <SearchInputMarker type="plus" />
      <MarginTxt color="WHITE">위치 추가하기</MarginTxt>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: ${COLOR.GREY5};
  border-radius: 12px;
`;

export const MarginTxt = styled(Txt)`
  margin-left: 8px;
`;

export default AddressAddButton;
