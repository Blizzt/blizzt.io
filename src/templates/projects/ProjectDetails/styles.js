// Dependencies
import styled from 'styled-components';
import { PageContainer, PageMargin } from '@styled-components/pagination';
import { isMobile } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const styles = {
  navigationList: {
    borderLeft: `1px dashed ${common.colors.GRAY_SEMI_LIGHT}`
  },
  fundingIndicator: {
    marginTop: '2rem'
  }
};

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
`;

export const Left = styled.div``;

export const Right = styled.div``;

export const ContainerInner = styled.div`
  padding: 32px;
`;

export const Header = styled.div`
	display: grid;
	grid-template-columns: 1fr 0.8fr;
  overflow: hidden;
	
	${isMobile(`
		grid-template-columns: 1fr;
	`)}
`;

export const Data = styled.div`
  padding: 2em;
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
  grid-template-columns: 1fr 0.4fr;
	padding: 8px;
  box-shadow: rgb(226 229 231) 0px -12px 10px -9px;
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
	margin-left: 12px;
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
  width: 48px;
  height: 48px;
`;
