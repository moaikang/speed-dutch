import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { COLOR } from '../themes/color';
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
        transform: translateX(-16px);
      `}
    >
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 16px 24px 16px;
  border-radius: 16px 16px 0px 0px;
  font-size: 16px;
  max-height: 370px;
  background-color: ${COLOR.GREY7};
`;

export default FixedBottomSheet;
