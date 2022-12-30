import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FixedBottomSheet = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;
  left: 16px;
  bottom: 0;
  width: 100%;
  padding: 0 0 24px 0;
  font-size: 16px;
`;

export default FixedBottomSheet;
