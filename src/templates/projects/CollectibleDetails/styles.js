// Dependencies
import styled from 'styled-components';
import { PageContainer } from '@styled-components/pagination';
import { isConditional, isMobile } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled(PageContainer)``;

export const Body = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 32px;
	grid-row-gap: 32px;
  padding: 36px 0;
	
	${isMobile(`
			grid-template-columns: 1fr;
	`)}
`;

export const Block = styled.div`
  width: 100%;
	
	${props => `
		${isConditional(props.table, `
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 32px;
			grid-row-gap: 32px;
		`)}
	`}
`;

export const Name = styled.h1`
  font-size: 20px;
  line-height: 30px;
`;

export const Title = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px dashed ${common.colors.GRAY_SEMI_LIGHT};
  padding-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
	
	${props => `
		${isConditional(props.none, `
		  padding: 4em 0;
			background: #f9f9f9;
			text-align: center;
			color: #b9b9b9;
		`, `
		  padding: 0;
  		margin: 0;
		`)}
	`}
`;

export const LinearGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  grid-auto-rows: minmax(min-content,max-content);
  height: min-content;
`;

export const Properties = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-column-gap: 12px;
  grid-row-gap: 12px;
`;

export const Property = styled.li`
  background: ${common.colors.PRIMARY_LIGHT};
  border-radius: 4px;
  border: 1px solid ${common.colors.PRIMARY};
  padding: 14px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
	cursor: default;
	user-select: none;
`;

export const PropertyName = styled.h2`
  text-transform: uppercase;
  font-size: 12px;
  color: ${common.colors.PRIMARY};
  font-family: ${common.fonts.BOLD};
  margin-bottom: 6px;
`;

export const PropertyValue = styled.span`
  font-size: 16px;
	line-height: 22px;
  color: ${common.colors.PRIMARY_PRESSED};
	font-family: ${common.fonts.CODE_REGULAR};
`;
