// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const styles = {
  inputTextContainer: {
    border: 0,
    marginTop: 0,
    borderRadius: 0,
    backgroundColor: common.colors.WHITE
  },

  inputTextInput: {
    padding: '14px 12px',
    fontSize: 13,
    color: common.colors.BLACK
  },

  inputCode: {
    fontFamily: common.fonts.CODE_BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11
  },

  inputValue: {
    fontFamily: common.fonts.CODE_BOLD,
    fontSize: 13
  }
};

export const Layout = styled.div`
  user-select: none;
	border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${common.colors.WHITE};
  align-items: center;
  padding: 10px 14px;
  border-radius: 4px 4px 0 0;
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
	border-bottom: 0;
`;

export const List = styled.ul``;

export const Item = styled.li`
  display: grid;
  grid-template-columns: 78px 1fr 1fr 1fr 1fr;
	
	&:nth-of-type(odd) {
    background-color: #fff5fa ;
  }
	
	&:last-child {
		border-bottom: 0;
	}
	
	${props => `
		${isConditional(props.type === 'footer', `
			align-items: center;
			justify-content: center;
			border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
			border-bottom: 0;
			border-top-style: dashed;
		`, `
			border-left: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
			border-right: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
		`)}	
	`}
`;

export const ListHead = styled.li`
  display: grid;
  grid-template-columns: 78px 1fr 1fr 1fr 1fr;
  background: #efefef;
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
	border-bottom: 0;
`;

export const Row = styled.div`
	${props => `
		${isConditional(props.type === 'head', `
			color: ${common.colors.BLACK};
			padding: 10px 12px;
			font-size: 10px;
			text-transform: uppercase;
			font-family: ${common.fonts.BOLD};
			letter-spacing: 1px;
		`, `
			padding: 10px 12px;
		`)}
		
		${isConditional(props.type === 'type', `
			color: ${common.colors.GRAY_HARD};
			font-size: 10px;
			text-transform: uppercase;
			font-family: ${common.fonts.BOLD};
			letter-spacing: 1px;
			background-color: ${common.colors.GRAY_LIGHT}
		`)}
		
		${isConditional(props.type === 'key', `
			color: ${common.colors.BLACK};
			font-size: 10px;
			text-transform: uppercase;
			font-family: ${common.fonts.CODE_REGULAR};
			letter-spacing: 1px;
		`)}
		
		${isConditional(props.dataType === 'boolean', `
			color: ${common.colors.PRIMARY} !important;
			font-family: ${common.fonts.CODE_REGULAR};
		`)}
		
		${isConditional(props.dataType === 'number', `
			color: ${common.colors.PRIMARY} !important;
			font-family: ${common.fonts.CODE_REGULAR};
		`)}
		
		${isConditional(props.dataType === 'string', `
			font-family: ${common.fonts.CODE_REGULAR};
			color: ${common.colors.BLACK};
		`)}
	`}
`;

export const PropertyTitle = styled.h4`
  color: ${common.colors.BLACK};
	font-size: 13px;
	line-height: 18px;
	font-family: ${common.fonts.REGULAR};
`;

export const InputRow = styled(Row)`
	padding: 0;
	display: flex;
	align-items: center;
	height: 100%;
	
	${props => `		
		${isConditional(props.type === 'message', `
			padding: 10px 12px;
			background-color: ${common.colors.PRIMARY_LIGHT};
			font-size: 12px;
			font-family: ${common.fonts.MEDIUM};
			color: ${common.colors.PRIMARY};
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
			border-top: 0;
		`)}	
		
		${isConditional(props.type === 'type', `
			justify-content: center;
		`)}
	`}
`;

export const MessageItem = styled.div``;
