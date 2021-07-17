// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 6px -4px #000;
  overflow: hidden;
  padding: 18px;
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 18px;
	grid-row-gap: 18px;
  grid-auto-rows: minmax(min-content, max-content);
  height: min-content;
`;

export const Section = styled.div``;

export const List = styled.ul`
	margin-top: 8px;
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 4px;
	grid-column-gap: 4px;
`;

export const Item = styled.li`
  padding: 14px 10px;
	cursor: pointer;
	border-radius: 8px;
	user-select: none;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
	&:hover {
		background: ${common.colors.BASE_LIGHT};
	}

  &:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.h4`
  padding: 8px 10px;
  background: ${common.colors.PRIMARY_LIGHT};
  border-radius: 4px;
  font-size: 12px;
  font-family: ${common.fonts.BOLD};
  color: ${common.colors.PRIMARY};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-family: ${common.fonts.REGULAR};
  color: ${common.colors.BLACK};
`;
