import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';
import { COLOR } from '../themes/color';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function Chip({ active = false, ...props }: Props) {
  return <Wrapper active={active} {...props} />;
}

const Wrapper = styled.button<Props>`
  background-color: ${props => (props.active ? COLOR.ORANGE : COLOR.GREY5)};
  padding: 6px 8px;
  border-radius: 12px;
  color: ${props => (props.active ? COLOR.WHITE : COLOR.GREY3)};
`;

export default Chip;
