// Dependencies
import styled from 'styled-components';

export const AlertView = styled.div`
	position: absolute;
  opacity: 0;
	visibility: hidden;
	right: 0;
	top: 140%;
	background-color: white;
  ${props => props.customContainerStyle};
  border-radius: 4px;
  box-shadow: 0 1px 5px -2px #0000007a;
	transition: all 0.2s ease-in-out;
	
  &:after {
		${props => props.customArrowStyle};
		
		content: "";
    width: 0;
    height: 0;
		top: -8px;
		position: absolute;
    border-style: solid;
    border-width: 0 7px 8px 7px;
    border-color: transparent transparent #fff transparent;
    line-height: 0;
    _border-color: #000000 #000000 #ffffff #000000;
    _filter: progid:DXImageTransform.Microsoft.Chroma(color='#000000');
	}
`;

export const Layout = styled.div`
	position: relative;
	user-select: none;
	
	&:hover {
		
		${AlertView} {
			opacity: 1;
			visibility: visible;
		}
	}
`;
