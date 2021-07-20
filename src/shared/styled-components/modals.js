
import styled from 'styled-components';
import { common } from '@styled-components/common';

/**
 * @name BackDrop
 * @description This component renders a backdrop to be used within any
 * pop-up message on the screen such as modals or menus.
 */
export const BackDrop = styled.div`
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
  	
  @media screen and (min-width: 0px) and (max-width: ${common.sizing.MAX_MOBILE_WIDTH}px) {
    display: flex;
    flex-grow: 1;
  }
`;

/**
 * @name ModalContainer
 * @description Assign a default style for all content to be
 * rendered floating on the screen.
 */
export const ModalContainer = styled.div`
	background: ${common.colors.WHITE};
	margin: 22px;
`;

export const Title = styled.h1`
	text-align: center;
	font-family: ${common.fonts.MEDIUM};
	font-size: 20px;
	color: ${common.colors.BLACK};
`;

export const SubTitle = styled.p`
  text-align: center;
  margin: 12px 0 0;
  font-family: 'Inter Light', sans-serif;
  font-size: 15px;
  line-height: 26px;
	color: ${common.colors.BLACK};
`;

export const Container = styled.div`
  padding: ${props => props.padding ? props.padding : '4em'};
`;
