// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.ul``;

export const Column = styled.li`
	display: grid;
	grid-template-columns: 0fr 1fr 0fr;
  align-items: center;
  justify-content: center;
  grid-row-gap: 22px;
  grid-column-gap: 22px;
`;

export const Row = styled.div``;

export const Separator = styled.pre`
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed ${common.colors.GRAY_SEMI_LIGHT};
`;

export const Label = styled.span`
  font-family: ${common.fonts.BOLD};
  font-size: 13px;
	white-space: nowrap;
`;

export const Value = styled.span`
  font-family: ${common.fonts.REGULAR};
  font-size: 13px;
	white-space: nowrap;
`;
