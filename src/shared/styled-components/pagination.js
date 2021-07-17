// Dependencies
import styled from 'styled-components';
import { isConditional, isMobile } from './functions';

export const PageMargin = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	width: 100%;
	padding: 0 22px;
	display: flex;
	flex-direction: ${props => props.alignment ? props.alignment : 'column'};
`;

export const PageContainer = styled.div`
  height: 100%;
  padding-top: 60px;
`;

export const Card = styled.div`
  background: white;
  box-shadow: 0 2px 26px -8px #0000003b;
  border-radius: 8px;
  overflow: hidden;
`;

export const GlossyCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 10;
  position: relative;
  border-radius: 8px;
  padding: 52px;
  box-shadow: 0 2px 12px -6px rgba(0, 0, 0, 0.73);
	
	${isMobile(`
		padding: 32px;
	`)}
`;

export const TransformOnScroll = styled.main``;

export const TransformMargin = styled(PageMargin)`
	${props => `
		${isConditional(props.isTransformActive, `
			padding: 0 22px;
		`, `
		  padding: 0;
		`)}
	`}
`;
