// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Input = styled.div`
	width: 100%;
	border: 1px solid #e0e0e0;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
  align-items: center;
	user-select: none;
	cursor: pointer;
	border-radius: 4px;
	transition: ${common.transitions.FAST};
  background-color: white;
`;

export const Label = styled.span`
  display: flex;
  width: 100%;
  padding: 18px;
  font-size: 14px;
`;

export const Icon = styled.div`
  width: 22px;
  margin-right: 18px;
`;

export const Container = styled.div`
  z-index: 500;
  position: absolute;
  top: 61px;
  width: 100%;
  background: white;
  overflow-y: hidden;
  visibility: hidden;
  opacity: 0;
  border-radius: 0 0 8px 8px;
  border: 1px solid ${common.colors.PRIMARY};
  border-top-color: transparent;
	transition: all 150ms;
`;

export const List = styled.ul`
  padding: 12px;
  transition: ${common.transitions.FAST};
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 6px;
	grid-row-gap: 6px;
  overflow-y: scroll;
  max-height: 280px;
`;

export const Item = styled.li`
	user-select: none;
  cursor: pointer;
	border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
	
	&:hover {
		color: ${common.colors.PRIMARY};
		background: ${common.colors.PRIMARY_LIGHT};
	}
	
	${props => `
		${isConditional(props.active, `
			color: ${common.colors.PRIMARY};
			background: ${common.colors.PRIMARY_LIGHT};
		`)}
	`}
`;

export const Text = styled.div`
  padding: 14px;
  font-size: 14px;
`;

export const SelectedCheck = styled.div`
	width: 22px;
	margin-right: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	
	> svg > path {
		stroke: ${common.colors.PRIMARY};
	}
`;

export const Layout = styled.div`
	width: 100%;
	position: relative;
	${props => `
		
		${isConditional(props.opened, `
			${Input} {
				border-color: ${common.colors.PRIMARY};
				border-bottom-color: transparent;
				border-radius: 8px 8px 0 0;
				color: ${common.colors.PRIMARY} !important;
				background: white;
			}
			
			${Icon} {
				> svg > path {
					stroke: ${common.colors.PRIMARY};
				}
			}
			
			${Container} {
				visibility: visible;
				opacity: 1;
			}
		
		`)}
	`}
	
`;
