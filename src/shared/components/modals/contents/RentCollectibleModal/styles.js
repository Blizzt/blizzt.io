// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Body = styled.div`
  margin-top: 2em;
	padding: 0 2em;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Actions = styled.div`
	margin-top: 42px;
	display: flex;
	grid-column-gap: 32px;
	grid-row-gap: 32px;
	justify-content: flex-end;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
	margin-bottom: 2em;
`;

export const Data = styled.div`
  padding-left: 22px;
	width: 100%;
`;

export const Picture = styled.div`
  width: 140px;
`;

export const Field = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0 0 2em 0;
	
	&:last-child {
		padding: 0;
	}
`;

export const Transaction = styled.div`
	border-top: 2px dashed ${common.colors.GRAY_SEMI_LIGHT};
	padding-top: 22px;
`;
