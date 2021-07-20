// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Item = styled.div`
  padding: 0 1rem;
  
  &:first-child {
    padding-left: 0;
  }
  
`;

export const Title = styled.h2`
  font-family: ${common.fonts.REGULAR};
  margin-bottom: 2rem;
`;
