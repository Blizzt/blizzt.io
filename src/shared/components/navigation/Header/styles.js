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
  position: relative;
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

export const Menu = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  transition: all 250ms ease-in-out;
  opacity: 0;
  visibility: hidden;

  &:before {
    content: "";
    left: 0;
    right: 0;
    top: -24px;
    height: 24px;
    position: absolute;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${common.colors.BLACK};
  font-family: ${common.fonts.BOLD};
  padding: 0 22px;

  cursor: pointer;
  user-select: none;
  
  &.with-menu-wrapper {
    
    ${Menu} {
      opacity: 0;
      visibility: hidden;
      transform: rotateX(-15deg);
    }
    
    &:hover {
      
      > span > svg {
        fill: ${common.colors.PRIMARY};
        color: ${common.colors.PRIMARY};
      }
      
      background: ${common.colors.PRIMARY_LIGHT};
      box-shadow: inset 0 -5px 0px -2px ${common.colors.PRIMARY};
      color: ${common.colors.PRIMARY};
      
      ${Menu} {
        opacity: 1;
        visibility: visible;
        transform: rotateX(0deg);
        transform-origin: 50% -50px;
      }
    }
  }

  &.selected {
    color: ${common.colors.PRIMARY};
  }

  ${props => isConditional(props.hot, `
  	&.selected {
  		color: ${common.colors.PRIMARY};
  	}
	`)}
  
  ${props => isConditional(props.special, `
		color: #685180;
    background: linear-gradient(135deg, #357ae0 0%, #b537cb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	`)}
`;

export const HotItem = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 6px;
`;

export const ItemText = styled.span`
  padding-left: 12px;
  font-family: "Inter Bold", sans-serif;
  text-transform: uppercase;
  font-size: 12px;
`;
