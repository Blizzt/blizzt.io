// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div``;

export const Button = styled.button`
	background: ${common.colors.WHITE};
	width: 56px;
	height: 46px;
	border: none;
	
	&:first-child {
		border-radius: 4px 0 0 4px;
	}
	
	&:last-child {
		border-radius: 0 4px 4px 0;
	}
	
	cursor: pointer;
	
	${props => `
		${isConditional(props.isActive, `
			background-color: ${common.colors.PRIMARY};
			
			svg {
				fill: ${common.colors.WHITE};
				color: ${common.colors.WHITE};
			}
		`, `
			background-color: ${common.colors.PRIMARY_LIGHT};
			
			svg {
				fill: ${common.colors.PRIMARY};
				color: ${common.colors.PRIMARY};
			}
		`)}
	`}
`;
