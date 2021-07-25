// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const List = styled.ul`
	display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  padding: 8px 16px;
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
  padding: 16px 18px;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 2px;

	color: ${common.colors.BLACK};
  border-left-width: 4px;
	border-left-style: solid;
	border-left-color: transparent;
	transition: all 0.1s ease-in-out;
	
  &:hover {
    background: #f2f3f5;
  }
	
	&.selected {
		border-left-width: 4px;
    border-left-color: ${common.colors.PRIMARY};
    background: #f2f3f5;
		color: ${common.colors.PRIMARY};
		
		svg {
      color: ${common.colors.PRIMARY};
      fill: ${common.colors.PRIMARY};
		}
	}
`;

export const Title = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  padding: 16px;
  font-family: ${common.fonts.MEDIUM};
  color: ${common.colors.PRIMARY_DARKEN};
`;

export const Layout = styled.div``;
