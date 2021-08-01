// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.span`
  font-size: 12px;
  font-family: 'Inter Regular', sans-serif;
  line-height: 23px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
`;

export const Container = styled.div`
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  border-radius: 4px;
  margin-top: 10px;
	display: flex;
	flex-direction: row;
	position: relative;
`;

export const Input = styled.input`
  border: none;
  padding: 14px;
  width: 100%;
  outline: none;
	font-size: 18px;
	font-family: ${common.fonts.REGULAR} !important;

	::placeholder {
		font-size: 14px;
	}
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  border-right: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
	position: relative;
	user-select: none;

	.chevron-right {
		position: absolute;
		right: 4px;
		top: 22px;
		opacity: 0.5;
	}
	
	${props => `
		${isConditional(props.pointer, `
			cursor: pointer;
		`)}
	`}
`;

export const Coin = styled.img`
	width: 26px;
	height: 26px;
`;

export const CoinList = styled.ul`
	position: absolute;
	left: 0;
	top: 100%;
	z-index: 2;
	background-color: ${common.colors.WHITE};
	border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
`;

export const CoinItem = styled.li`
	padding: 14px 22px 14px 14px;
	cursor: pointer;
	white-space: nowrap;

	&:hover {
		background: ${common.colors.GRAY_LIGHT};
	}
`;

export const CoinName = styled.span`
	margin-left: 12px;
`;
