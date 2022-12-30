import styled from '@emotion/styled';
import { Flex } from '@toss/emotion-utils';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Arrow } from '../icons';
import { COLOR } from '../themes/color';
import Txt from './Txt';

interface ListProps {
  children: ReactNode;
  height?: CSSProperties['height'];
}
function List({ children, height }: ListProps) {
  return <ListWrapper height={height}>{children}</ListWrapper>;
}

interface ItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  title: ReactNode;
  description: ReactNode;
  type?: 'arrow' | 'default';
  selected?: boolean;
}

function Item({ title, description, type = 'default', selected = false, ...props }: ItemProps) {
  return (
    <ItemWrapper selected={selected} {...props}>
      <Flex direction="column" style={{ gap: '6px' }}>
        <Txt color={selected ? 'ORANGE' : 'WHITE'} weight={selected ? 'bold' : 'normal'}>
          {title}
        </Txt>
        <Txt size="small">{description}</Txt>
      </Flex>
      {type === 'arrow' ? <Arrow direction="right" /> : null}
    </ItemWrapper>
  );
}

List.Item = Item;

export const ListWrapper = styled.ul<ListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.height};
  overflow-y: auto;
`;

export const ItemWrapper = styled.li<{ selected?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 19px 0;
  background-color: ${props => (props.selected ? COLOR.GREY6 : 'transparent')};
`;

export default List;
