import styled from '@emotion/styled';
import React, { ComponentProps, ReactNode } from 'react';
import Button from './Button';
import FixedBottomSheet from './FixedBottomSheet';

interface Props extends ComponentProps<typeof Button> {
  children: ReactNode;
  description?: ReactNode;
}

const FixedBottomCTA = ({ children, description, ...props }: Props) => {
  return (
    <FixedBottomSheet>
      {description != null ? <DescriptionWrapper>{description}</DescriptionWrapper> : null}
      <Button {...props}>{children}</Button>
    </FixedBottomSheet>
  );
};

const DescriptionWrapper = styled.div`
  padding: 0 0 16px 0;
`;

export default FixedBottomCTA;
