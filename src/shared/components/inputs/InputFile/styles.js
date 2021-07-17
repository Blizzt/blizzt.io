// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { imageAspectRatio } from '@types/images';
import { common } from '@styled-components/common';

export const Circle = styled.div`
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${common.colors.PRIMARY_LIGHT};
	transition: all 0.1s ease-in-out;
`;

export const Label = styled.div`
	margin-top: 22px;
  padding: 0 30px;
`;

export const Paragraph = styled.p`
	margin: 0;
	padding: 0;
	text-align: center;
	
	${props => `
		${isConditional(props.title, `
			font-family: ${common.fonts.MEDIUM};	
			font-size: 14px;	
		`)}
	
		${isConditional(props.subtitle, `
			font-family: ${common.fonts.REGULAR};		
			font-size: 12px;
		`)}
	`}
`;

export const Layout = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none !important;
  position: relative;

  &:hover {
    border-color: ${common.colors.PRIMARY};
  }

  ${props => `
		${isConditional(props.aspectRatio === imageAspectRatio.ONE, `
  		padding: 0 0 100%;
		`)}
		
		${isConditional(props.aspectRatio === imageAspectRatio.SIXTEEN, `
  		padding: 0 0 56.2%;
		`)}
			
		${isConditional(!props.isDragActive, `
		  border: 1px dashed #c1c1c1;
		  background: white;
		`, `
			border: 1px dashed ${common.colors.PRIMARY};
		  background: white;
		`)}
	`};
`;

export const Input = styled.input`
	display: none;
`;

export const Absolute = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
