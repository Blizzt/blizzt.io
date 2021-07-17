// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Grade = styled.span`
	color: ${props => props.color || '#000'};
  font-size: 13px;
	line-height: 18px;
	font-family: ${common.fonts.CODE_BOLD};
`;
