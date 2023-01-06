import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';
import { LAYOUT } from '../themes/layout';
import { px } from '../utils/css';

interface Props {
  children: ReactNode;
  css?: SerializedStyles;
}

const Layout = forwardRef<HTMLElement, Props>(function Layout({ children, css }: Props, forwardedRef) {
  return (
    <Wrapper css={css} ref={forwardedRef}>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.section<Props>`
  width: 100%;
  max-width: ${px(LAYOUT.MAX_WIDTH)};
  padding: 0 16px;
  margin: 0 auto;
  ${props => props.css};
`;

export default Layout;
