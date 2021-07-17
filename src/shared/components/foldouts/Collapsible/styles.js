// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Header = styled.div`
  padding: 12px;
  background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
  cursor: pointer;
	user-select: none;
`;

export const Container = styled.div`
  overflow: hidden;
	transition: all 0.2s ease;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
`;

export const ToggleButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${common.colors.WHITE};
	border: none;
	height: 30px;
	width: 30px;
`;

export const Icon = styled.div`
	width: 20px;
	margin-right: 12px;
`;

export const ArrowIcon = styled.div`
	width: 22px;
	height: 22px;
  transition: all 0.2s ease;
	transform-origin: center;
`;

export const Layout = styled.div`
	border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};

  ${props => `
		${isConditional(!props.visible, `
			opacity: 0;
		`)}
		
		${isConditional(props.isCollapsed && props.visible, `
			${Container} {
				max-height: 0px;
				opacity: 0;
			}	
		`, `
			${Container} {
				opacity: 1;
				max-height: ${props.originalHeight}px;
			}
			
			${ArrowIcon} {
				transform: rotate(-180deg);
			}		
		`)}
	`}
`;
