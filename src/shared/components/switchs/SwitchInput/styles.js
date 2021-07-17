// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Indicator = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${common.colors.GRAY_SEMI_LIGHT};
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 4px;
  transition: all 0.2s cubic-bezier(0.76, 0.03, 0.04, 1.1);
`;

export const Title = styled.label`
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
`;

export const Label = styled.div`
	margin-left: 16px;
	font-family: ${common.fonts.MEDIUM};
	font-size: 13px;
	color: ${common.colors.BLACK};
  transition: all 0.2s cubic-bezier(0.76, 0.03, 0.04, 1.1)
`;

export const Input = styled.div`
	width:  80px;
	background-color: ${common.colors.WHITE};
	height: 38px;
	border-radius: 4px;
	position: relative;
	border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  transition: all 0.2s cubic-bezier(0.76, 0.03, 0.04, 1.1)
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	
  ${props => `
		${isConditional(props.active, `
			${Input} {
				background-color: ${common.colors.PRIMARY_LIGHT};
				border: 1px solid ${common.colors.PRIMARY};
			}
			
			${Label} {
				color: ${common.colors.PRIMARY};
			}
			
			${Indicator} {
				left: 62%;
				width: 20px;
				background: #007aff;
			}
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
