import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import Button from "./Button";

type Props = {
  children: ReactNode;
};

const FixedBottomCTA = ({ children, ...props }: Props) => {
  return (
    <Wrapper>
      <Button {...props}>{children}</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 0 16px 24px 16px;
`;

export default FixedBottomCTA;
