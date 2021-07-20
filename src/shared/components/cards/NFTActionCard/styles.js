// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const styles = {
  rentButton: {
    marginLeft: 8
  }
};

export const Layout = styled.div`
	background-color: ${common.colors.WHITE};
	border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
	padding: 32px;
	border-radius: 0 4px 4px 4px;
`;

export const Label = styled.h3`
  font-size: 12px;
	text-transform: uppercase;
  font-family: ${common.fonts.BOLD};
	line-height: 16px;
`;

export const Column = styled.div`
	display: grid;
	margin-bottom: 32px;
	grid-template-columns: 1fr 1fr;
	
	&:last-child {
		margin-bottom: 0;
	}
`;

export const Block = styled.div``;

export const PriceRow = styled.div`
	margin-top: 12px;
	display: flex;
	flex-direction: row;
`;

export const Rate = styled.span`
	font-size: 14px;
	line-height: 24px;
`;

export const ViewingHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
`;

export const ViewingAction = styled.button`
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  font-family: ${common.fonts.MEDIUM};
  border-bottom: none;
  padding: 16px 8px;
  text-transform: uppercase;
  font-size: 12px;
  
  ${props => `
    ${isConditional(props.isActive, `
      background: white;
      box-shadow: 0 2px 0px -1px white;
      cursor: default;
      color: ${common.colors.PRIMARY};
    `, `
      cursor: pointer;
      color: ${common.colors.BLACK};
    `)}
  `}
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const SummaryText = styled.p`
  padding-left: 22px;
  color: ${common.colors.BLACK};
  font-size: 14px;
  line-height: 22px;
`;
