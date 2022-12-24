import styled from '@emotion/styled';
import { Spacing } from '@toss/emotion-utils';
import { SearchInputMarker } from '../icons';
import { COLOR } from '../themes/color';
import Txt from './Txt';

interface Props {
  onAddressChange?: () => void;
  index: number;
  disabled?: boolean;
  placeholder?: string;
}

function AddressSearchInput({ onAddressChange, index, disabled = false, placeholder }: Props) {
  return (
    <StyledButton>
      <SearchInputMarker index={index} disabled={disabled} />
      <MarginTxt color="GREY3">{placeholder}</MarginTxt>
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

export const MarginTxt = styled(Txt)`
  margin-left: 8px;
`;

export default AddressSearchInput;
