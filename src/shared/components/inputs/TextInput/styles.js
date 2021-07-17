// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common'; ;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
	width: 100%;
	
	${props => `
		${isConditional(props.disabled, `
			opacity: 0.5;
			cursor: default;
		`)}
	`}
	
`;

export const Description = styled.p`
	font-size: 13px;
	font-family: ${common.fonts.REGULAR};
	line-height: 24px;
	padding: 0;
	margin: 4px 0;
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
`;

export const Container = styled.div`
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
	display: flex;
	flex-direction: row;
	position: relative;
`;

export const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
	font-size: 14px;
	font-family: ${common.fonts.LIGHT} !important;
	
	${props => `
		${isConditional(props.withIcon, `
			  padding: 14px 0;
		`, `
		  	padding: 14px;
		`)}
	`}
`;

export const TextArea = styled.textarea`
  border: none;
  padding: 14px;
  width: 100%;
  outline: none;
	resize: none;
	min-height: 180px;
	max-height: 240px;
  line-height: 20px;
  font-size: 14px;
  font-family: ${common.fonts.LIGHT} !important;
`;

export const MaxLengthIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0 14px;
  color: ${common.colors.PRIMARY};
	
	${props => isConditional(props.textarea, `
		position: absolute;
		bottom: 14px;
		right: 14px;
		padding: 0;
	`)};
`;

export const KeyIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
	margin-top: 8px;
`;

export const KeyIndicatorLabel = styled.span`
  font-size: 10px;
  padding-right: 10px;
  margin-top: 8px;
	text-transform: uppercase;
	font-family: "Inter SemiBold", sans-serif;
	color: ${common.colors.PRIMARY};
`;

export const Icon = styled.div`
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
