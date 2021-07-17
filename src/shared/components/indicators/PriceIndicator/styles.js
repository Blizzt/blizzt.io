// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { tokenPriceType } from './index';
import { common } from '@styled-components/common';

export const PriceData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Icon = styled.img``;

export const PriceValue = styled.div`
  font-size: 16px;
  font-family: ${common.fonts.BOLD};
`;

export const SubLabel = styled.div`
	font-size: 12px;
	font-family: ${common.fonts.REGULAR};
	width: 100%;
	color: ${common.colors.PRIMARY};
	
	&:before {
		content: "[";
	}
	
	&:after {
		content: "]";
	}
`;

export const Layout = styled.div`
  display: flex;
	align-items: center;
	
	${props => `
		${isConditional(props.type === tokenPriceType.TABLE, `
				${PriceData} {
					flex-direction: row;
					align-items: center;
				}
				
				${PriceValue} {
					font-size: 13px;
					font-family: ${common.fonts.MEDIUM};
				}
				
				${Icon} {
					width: 22px;
					height: 22px;
					margin-right: 12px;
				}
				
				${SubLabel} {
					margin-left: 8px;
					font-size: 12px;
				}
		`)}
		
		${isConditional(props.type === tokenPriceType.NORMAL, `
				${PriceData} {
					flex-direction: column;
					align-items: flex-start;
				}
				
				${PriceValue} {
					font-size: 15px;
					font-family: ${common.fonts.MEDIUM};
				}
				
				${Icon} {
					width: 32px;
					height: 32px;
					margin-right: 12px;
				}
								
				${SubLabel} {
					margin-top: 4px;
					font-size: 12px;
				}
		`)}
		
		${isConditional(props.type === tokenPriceType.SMALL, `
				${PriceData} {
					flex-direction: column;
					align-items: flex-start;
				}
				
				${PriceValue} {
					font-size: 14px;
					font-family: ${common.fonts.MEDIUM};
				}
				
				${Icon} {
					width: 24px;
					height: 24px;
					margin-right: 6px;
				}
								
				${SubLabel} {
					font-size: 11px;
				}
		`)}
	`}
`;
