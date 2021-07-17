// Dependencies
import styled from 'styled-components';

import { common } from '@styled-components/common';

export const styles = {
  saveChangesButton: {
    marginLeft: 22
  }
};

export const Layout = styled.form``;

export const Header = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 12px;
`;

export const Grid = styled.div`
  display: flex;
	flex-direction: row;
`;

export const Body = styled.div`
  padding-bottom: 4em;
`;

export const ColumnTitle = styled.div`
	font-family: ${common.fonts.REGULAR};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 0;
  color: ${common.colors.GRAY_HARD};
`;

export const Column = styled.div`
	width: 50%;
	max-width: 50%;
  word-break: break-all;
	
	&:last-child {
		margin-left: 32px;
	}
`;
