// Dependencies
import styled from 'styled-components';
import { Card } from '@styled-components/pagination';
import { common } from '@styled-components/common';

export const Layout = styled(Card)`
  width: 100%;
	cursor: pointer;
	user-select: none;
	transition: all 0.2s ease-in-out;
	display: flex;
	flex-direction: column;
	
	&:hover {
    box-shadow: 0 8px 24px -14px #0000007a;
    transform: translateY(-4px);
	}
`;

export const Content = styled.div`
	padding: 28px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Category = styled.div`
  text-transform: uppercase;
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 11px;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  color: ${common.colors.PRIMARY};
`;

export const Title = styled.h3`
  font-family: ${common.fonts.REGULAR};
`;

export const Description = styled.div`
  font-family: ${common.fonts.LIGHT};
  font-size: 14px;
  line-height: 24px;
  margin: 8px 0 8px;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
	flex-grow: 1;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;
