// Dependencies
import styled from 'styled-components';
import { PageMargin } from '@styled-components/pagination';

export const Content = styled(PageMargin)`
	display: grid;
	grid-template-columns: 284px 1fr;
	margin-top: 42px;
	padding-bottom: 42px;
	grid-column-gap: 34px;
	grid-row-gap: 34px;
  grid-auto-rows: minmax(min-content, max-content);
  height: min-content;

  @media (min-width: 0px) AND (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0%, 100%));
  grid-column-gap: 34px;
  grid-row-gap: 34px;
  grid-auto-rows: minmax(min-content, max-content);

  @media (min-width: 0px) AND (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(0%, 100%));
  }

  @media (min-width: 1000px) AND (max-width: 1550px) {
    grid-template-columns: repeat(2, minmax(0%, 100%));
  }
`;

export const RightContent = styled.div``;

export const LeftContent = styled.div`
  @media (min-width: 0px) AND (max-width: 1000px) {
    position: fixed;
		left: -296px;
		top: 0;
		bottom: 0;
		width: 296px;
		z-index: 1000;
  }
`;

export const Section = styled.section``;
