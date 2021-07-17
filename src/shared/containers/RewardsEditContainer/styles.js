// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { modeTypesId } from './index';
import { PageMargin } from '@styled-components/pagination';
import { animated } from 'react-spring';
import { common } from '@styled-components/common';

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 36px;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 4px;
  padding-bottom: 36px;
`;

export const Block = styled.div`
	display: flex;
	flex-direction: column;
	
	${props => `
		${isConditional(props.dir === 'right', `
				justify-content: flex-end;
				align-items: flex-end;
		`)}
	`}
`;

export const Title = styled.h3`
  font-size: 16px;
  line-height: 24px;
	font-family: ${common.fonts.MEDIUM};
	margin-bottom: 8px;
`;

export const FormContainer = styled(animated('div'))`
  position: relative;
  background-color: ${common.colors.WHITE};
  box-shadow: 0 -24px 20px -33px #0000006b;
	z-index: 20;
	display: none;
`;

export const Paragraph = styled.p`
  line-height: 18px;
  font-size: 14px;
	margin: 0;
  padding: 8px 0;
  font-family: ${common.fonts.LIGHT};
`;

export const ListContainer = styled(PageMargin)``;

export const Layout = styled.div`
  ${props => `
		${isConditional(props.mode === modeTypesId.CREATION_MODE, `
			${ListContainer} {
				user-select: none;
				max-height: 400px;
				overflow: hidden;
				cursor: not-allowed;
			}
		`)}
	`}
`;

export const BackDrop = styled(animated('div'))`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 2;
  background: #000000a3;
	opacity: 0;
	visibility: hidden;
`;
