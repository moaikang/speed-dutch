import styled from '@emotion/styled';
import React, { InputHTMLAttributes } from 'react';
import { Search } from '../icons';
import { COLOR } from '../themes/color';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = (props: Props) => {
  return (
    <Wrapper>
      <Search />
      <StyledInput placeholder="입력해주세요" {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  background-color: ${COLOR.GREY5};
  border-radius: 12px;
  padding: 9px 11px;
`;

const StyledInput = styled.input`
  margin-left: 8px;
  background: transparent;
  outline: none;
  border: none;
  color: ${COLOR.WHITE};
`;

export default SearchBar;
