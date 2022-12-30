import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Layout from './Layout';

interface Props {
  children: ReactNode;
}

const FixedBottomSheet = ({ children }: Props) => {
  return (
    <Layout
      css={css`
        position: fixed;
        bottom: 0;
      `}
    >
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 0 24px 0;
  font-size: 16px;
`;

export default FixedBottomSheet;
