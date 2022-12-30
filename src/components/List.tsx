import styled from '@emotion/styled';
import { Flex } from '@toss/emotion-utils';
import { HTMLAttributes, ReactNode } from 'react';
import { Arrow } from '../icons';
import { COLOR } from '../themes/color';
import Txt from './Txt';

function List(props: { children: ReactNode }) {
  return <ListWrapper {...props} />;
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

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ItemWrapper = styled.li<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 19px 0;
  background-color: ${props => (props.selected ? COLOR.GREY6 : 'transparent')};
`;

export default List;
