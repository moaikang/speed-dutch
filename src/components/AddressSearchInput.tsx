import styled from '@emotion/styled';
import { SearchInputMarker } from '../icons';
import { COLOR } from '../themes/color';

interface Props {
  onAddressChange?: () => void;
  index: number;
}

function AddressSearchInput({ onAddressChange, index }: Props) {
  return (
    <StyledButton>
      <SearchInputMarker />
      zzz
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: ${COLOR.WHITE};
  border-radius: 12px;
`;

export default AddressSearchInput;
