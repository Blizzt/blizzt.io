// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Block = styled.div`
	padding: 55px;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
`;

export const Title = styled.h4`
  font-size: 16px;
  line-height: 18px;
  font-family: ${common.fonts.MEDIUM};
`;

export const Paragraph = styled.p`
  line-height: 24px;
  font-size: 14px;
	font-family: ${common.fonts.LIGHT};
`;

export const Field = styled.div`
  line-height: 24px;
  font-size: 14px;
	font-family: ${common.fonts.LIGHT};
`;

export const Column = styled.div`
	display: grid;
	grid-template-columns: 0.8fr 1fr;
	grid-column-gap: 22px;
	grid-row-gap: 22px;
	
	${props => `
		${isConditional(props.separator, `
		  border-bottom: 1px solid #e6e6e6;
		  
		  &:last-child {
				border-bottom: none;
			}
		`)}
	
		${isConditional(props.vertical, `
			grid-template-columns: 1fr;
			
			
			${Block} {
				padding-bottom: 0 !important;
				
				&:last-child {
					padding-top: 0;
				}
			}
		`)}
	`}
`;
