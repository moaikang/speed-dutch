import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  css?: SerializedStyles;
}

function Layout({ children, css }: Props) {
  return <Wrapper css={css}>{children}</Wrapper>;
}

const Wrapper = styled.section<Props>`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  ${props => props.css};
`;

export default Layout;
