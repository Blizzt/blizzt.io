// Dependencies
import styled from 'styled-components';
import { PageMargin } from '@styled-components/pagination';
import { common } from '@styled-components/common';

export const Layout = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${common.colors.WHITE};
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  padding: 22px;
  box-shadow: 0 -2px 6px 2px #00000014;
	z-index: 5;
`;

export const Container = styled(PageMargin)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;
