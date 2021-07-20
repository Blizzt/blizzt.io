// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div``;

export const Header = styled.div`
  padding: 12px;
  background: #ffffff;
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  border-bottom: 0;
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
	
	${props => `
		${isConditional(props.withIcon, `
			margin-left: 12px;
		`)}
	`}
`;

export const Icon = styled.img``;

export const Table = styled.table`
  border-collapse: collapse;
	border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
	width: 100%;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: ${common.colors.GRAY_LIGHT} ;
  }
`;

export const TableCell = styled.td`
	${props => `
		${isConditional(props.type === 'head', `
			background: white;
			font-size: 12px;
			text-transform: uppercase;
			padding: 8px;
    	font-family: ${common.fonts.MEDIUM};
		`)}
		
		${isConditional(props.type === 'body', `
		  padding: 12px 8px;
			font-size: 14px;
			line-height: 18px;
		`)}
	`}
`;

export const EmptyMessage = styled.p`
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  border-top: 0;
  margin: 0;
  padding: 42px 12px;
  text-align: center;
	font-family: ${common.fonts.LIGHT};
  color: ${common.colors.GRAY_MEDIUM};
  font-size: 14px;
`;

export const Value = styled.div`
	display: flex;
	align-items: center;
	height: 30px;
  font-size: 13px;
`;
