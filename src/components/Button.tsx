import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';
import { COLOR } from '../themes/color';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ ...props }: Props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button<Props>`
  display: block;
  width: 100%;
  background: ${props => (props.disabled ? COLOR.LIGHT_GREY : COLOR.ORANGE)};
  border-radius: 12px;
  color: ${COLOR.WHITE};
  padding: 16px 0;
  font-weight: bold;
`;

export default Button;
