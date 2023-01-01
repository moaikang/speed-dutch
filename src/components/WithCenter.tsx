import { Flex } from '@toss/emotion-utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function WithCenter({ children }: Props) {
  return (
    <Flex width="100%" justify="center">
      {children}
    </Flex>
  );
}

export default WithCenter;
