// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 32px;
  grid-column-gap: 32px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 14em 0;
  color: #b9b9b9;
`;

export const EmptyLabel = styled.p`
	font-family: ${common.fonts.LIGHT};
  color: #b9b9b9;
	padding: 2em 0;
`;
