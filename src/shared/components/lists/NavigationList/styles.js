// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const List = styled.nav`
	display: grid;
	grid-template-columns: repeat(${props => props.columns}, minmax(0%, 100%));
`;

export const Label = styled.div`
  font-size: 14px;
  font-family: ${common.fonts.BOLD};
  color: inherit;
`;

export const Icon = styled.div`
	margin-right: 16px;
`;

export const Item = styled.a`
  padding: 14px 18px;
  min-height: 64px;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
	justify-content: center;
	color: ${common.colors.BLACK};
  border-bottom-width: 4px;
	border-bottom-style: solid;
	border-bottom-color: transparent;
	transition: all 0.1s ease-in-out;
	
  &:hover {
    background: #f2f3f5;
  }
	
	&.selected {
		border-bottom-width: 4px;
    border-bottom-color: ${common.colors.PRIMARY};
    background: #f2f3f5;
		color: ${common.colors.PRIMARY};
		
		svg {
      color: ${common.colors.PRIMARY};
      fill: ${common.colors.PRIMARY};
		}
	}
`;
