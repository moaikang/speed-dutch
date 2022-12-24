import styled from '@emotion/styled';
import { ComponentProps, HTMLAttributes } from 'react';
import { match } from 'ts-pattern';
import { COLOR } from '../themes/color';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'big';
  color?: keyof typeof COLOR;
}

function Txt({ size = 'medium', color = 'WHITE', ...props }: Props) {
  return <StyledTxt size={size} color={color} {...props} />;
}

const StyledTxt = styled.span<Props>`
  font-size: ${props =>
    match(props.size)
      .with('small', () => '12px')
      .with('medium', () => '14px')
      .with('big', () => '20px')
      .otherwise(() => '14px')};

  font-weight: ${props =>
    match(props.size)
      .with('small', () => 'normal')
      .with('medium', () => 'normal')
      .with('big', () => 'bold')
      .otherwise(() => 'normal')};

  color: ${props => COLOR[props.color!]};

  text-align: center;

  line-height: 28px;
`;

export default Txt;
