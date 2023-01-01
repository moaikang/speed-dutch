import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, HTMLAttributes } from 'react';
import { match } from 'ts-pattern';
import { COLOR } from '../themes/color';
import WithCenter from './WithCenter';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'semi-big' | 'big';
  color?: keyof typeof COLOR;
  textAlign?: CSSProperties['textAlign'];
  weight?: CSSProperties['fontWeight'];
  center?: boolean;
}

function Txt({ size = 'medium', color = 'WHITE', textAlign = 'center', center = false, ...props }: Props) {
  return center === true ? (
    <WithCenter>
      <StyledTxt size={size} color={color} {...props} />
    </WithCenter>
  ) : (
    <StyledTxt size={size} color={color} {...props} />
  );
}

const StyledTxt = styled.span<Props>`
  width: fit-content;
  font-size: ${props =>
    match(props.size)
      .with('small', () => '12px')
      .with('medium', () => '14px')
      .with('semi-big', () => '16px')
      .with('big', () => '20px')
      .otherwise(() => '14px')};

  font-weight: ${props => {
    return (
      props.weight ??
      match(props.size)
        .with('small', () => 'normal')
        .with('medium', () => 'normal')
        .with('semi-big', () => 'bold')
        .with('big', () => 'bold')
        .otherwise(() => 'normal')
    );
  }};

  color: ${props => COLOR[props.color!]};

  text-align: ${props => props.textAlign};

  line-height: ${props =>
    match(props.size)
      .with('small', () => '14px')
      .with('medium', () => '14px')
      .with('big', () => '28px')
      .otherwise(() => '14px')};
`;

export default Txt;
