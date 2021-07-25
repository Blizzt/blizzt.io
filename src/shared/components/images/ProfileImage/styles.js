// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { imageAspectRatio } from '@types/images';

export const Layout = styled.div`
  position: relative;
  overflow: hidden;
	border-radius: ${props => props.radius}px;
  padding-bottom: 56.2%;
  width: 100%;
	
	&:after {
		content: "";
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
		position: absolute;
    border-radius: ${props => props.radius}px;
	}
	
	${props => `
		${isConditional(props.aspectRatio === imageAspectRatio.ONE, `
		  padding-bottom: 100%;
		`)}
		${isConditional(props.aspectRatio === imageAspectRatio.THREE, `
			display: flex;
			justify-content: center;
	  `)}
	`}
`;

export const Source = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  vertical-align: bottom;
`;
