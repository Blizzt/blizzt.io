// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';
import { isConditional } from '@styled-components/functions';
import { PageMargin } from '@styled-components/pagination';

export const styles = {
  discardButton: {
    marginRight: '12px'
  }
};

export const Layout = styled.header`
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	z-index: 100;
	height: 60px;
	display: flex;
	position: fixed;
	align-items: center;
	justify-content: space-between;
	background-color: ${common.colors.WHITE};
	box-shadow: 0 -8px 10px 4px #00000078;
`;

export const Title = styled.div`
  white-space: nowrap;
  color: ${common.colors.BLACK};
  font-family: ${common.fonts.MEDIUM};
  font-size: 15px;
`;

export const Container = styled(PageMargin)`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 0fr 1fr 0fr;
  grid-column-gap: 22px;
`;

export const Branding = styled.div`
	display: flex;
	align-items: center;
	margin-right: 22px;
  cursor: pointer;
`;

export const ImageSource = styled.img`
	width: 38px;
	height: 38px;
  border-radius: 6px;
`;

export const Left = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Right = styled(Left)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 18px;
  grid-column-gap: 18px;
`;

export const Center = styled(Left)``;

export const Navigator = styled.div`
	display: flex;
	height: 100%;
	flex-direction: row;
  vertical-align: middle;
  white-space: nowrap;
`;

export const Item = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 4px solid transparent;
	position: relative;
  
  color: ${common.colors.BLACK};
  font-family: ${common.fonts.BOLD};
  font-size: 14px;
  padding: 0 22px;
  
  cursor: pointer;
  user-select: none;

  &.selected {
		color: ${common.colors.PRIMARY};
    border-bottom-color: ${common.colors.PRIMARY};
	}

  ${props => isConditional(props.hot, `
  	&.selected {
  		color: ${common.colors.PRIMARY};
			border-bottom-color: ${common.colors.PRIMARY};
  	}
	`)}
	
	${props => isConditional(props.special, `
		color: ${common.colors.PRIMARY};
		background-color: ${common.colors.PRIMARY_LIGHT};
		border-top: 4px solid ${common.colors.PRIMARY};
		
		&.selected {
			color: ${common.colors.PRIMARY};
			border-bottom-color: transparent;
  	}
	`)}
`;

export const HotItem = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 6px;
`;
