import styled from "@emotion/styled";
import React, { ComponentProps, ReactNode } from "react";
import Button from "./Button";

interface Props extends ComponentProps<typeof Button> {
  children: ReactNode;
}

const FixedBottomCTA = ({ children, ...props }: Props) => {
  return (
    <Wrapper>
      <Button {...props}>{children}</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 16px;
  bottom: 0;
  width: 100%;
  padding: 0 0 24px 0;
`;

export default FixedBottomCTA;
