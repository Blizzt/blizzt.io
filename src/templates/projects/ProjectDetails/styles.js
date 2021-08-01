// Dependencies
import styled from 'styled-components';
import { PageContainer, PageMargin } from '@styled-components/pagination';
import { isMobile } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled(PageContainer)`
  &:before {
    content: "";
    left: 0;
    top: 0;
    right: 0;
    height: 400px;
    z-index: 1;
    position: absolute;
    background-color: #25262724;
		backdrop-filter: blur(30px);
  }
	
  &:after {
    content: "";
    left: 0;
    top: 0;
    right: 0;
    height: 400px;
    z-index: 0;
    position: absolute;
    background: url(${props => props.background}) no-repeat;
    background-size: cover;
  }
`;

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const Container = styled(PageMargin)`
  margin-top: 4em;
	padding: 0;
  background: #FDFDFDFF;
  position: relative;
  z-index: 5;
  border-radius: 6px;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.09);
	
  ${isMobile(`
		border-radius: 0px;
	`)}

	@media screen and (min-width: 0px) and (max-width: 1400px) {
		border-radius: 0px;
	}
`;

export const Navigator = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 16px;
	border-left: 1px dashed ${common.colors.GRAY_SEMI_LIGHT};
	grid-auto-rows: minmax(min-content, max-content);
	padding: 22px 16px 0;
`;

export const ContainerInner = styled.div`
  padding: 32px;
`;

export const Header = styled.div`
	display: grid;
	grid-template-columns: 1fr 0.8fr;
  overflow: hidden;
  grid-auto-rows: minmax(min-content, max-content);
	
	${isMobile(`
		grid-template-columns: 1fr;
	`)}
`;

export const Data = styled.div`
  padding: 2em;

	${isMobile(`
		padding: 2rem 0 0;
	`)}
`;

export const Title = styled.h1`
  font-size: 20px;
  line-height: 28px;
  font-family: ${common.fonts.BOLD};
`;

export const Description = styled.p`
  font-family: ${common.fonts.LIGHT};
  font-size: 14px;
  line-height: 24px;
  margin-top: 8px;
  padding-bottom: 22px;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
	padding: 8px;
  box-shadow: rgb(226 229 231) 0px -12px 10px -9px;

	${isMobile(`
  	grid-template-columns: 1fr;
	`)}
`;

export const Author = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const AuthorImage = styled.div`
	overflow: hidden;
  width: 38px;
  height: 38px;
	border-radius: 100%;
`;

export const AuthorLabel = styled.span`
	margin: 0 14px;
	font-size: 14px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
	color: ${common.colors.PRIMARY};
`;

export const Address = styled.a`
  display: inline;
  color: black !important;
  font-size: 11px;
  margin-top: 4px;
  
  &:before {
    content: "[";
  }
  
  &:after {
    content: "]";
  }
`;

export const FundingImage = styled.img`
  width: 42px;
  height: 42px;
`;
