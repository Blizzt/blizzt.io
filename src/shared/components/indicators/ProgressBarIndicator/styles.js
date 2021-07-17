// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div``;

export const Value = styled.div`
  width: ${props => props.width}%;
  background: ${common.colors.PRIMARY};
  background: -moz-linear-gradient(left,  '#005fc5' 0%, '#0171ec' 100%);
  background: -webkit-linear-gradient(left,  '#005fc5' 0%, '#0171ec' 100%);
  background: linear-gradient(to right,  '#005fc5' 0%, '#0171ec' 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fb0c78', endColorstr='#fe4136',GradientType=1 );
  height: 100%;
`;

export const Base = styled.div`
  height: 8px;
  background: #e5e9ea;
  border-radius: 8px;
  overflow: hidden;
	
	${props => isConditional(props.isEmpty, `
		${Value} {
			width: 0%;
		}
	`)}
`;

export const Label = styled.div`
  font-size: 12px;
  color: ${common.colors.PRIMARY};
  font-family: ${common.fonts.BOLD};
`;

export const Icon = styled.div`
  margin-right: 8px;
`;

export const Block = styled.div`
  margin-bottom: 12px;
	display: flex;
	flex-direction: row;
  align-items: center;
	padding-top: 12px;
	border-top: 1px dashed ${common.colors.GRAY_LIGHT};
`;
