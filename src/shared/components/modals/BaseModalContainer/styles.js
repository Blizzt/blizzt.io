// Dependencies
import styled from 'styled-components';
import { ModalContainer } from '../../../styled-components/modals';

export const Layout = styled(ModalContainer)`
	max-width: ${props => props.width || 'auto'};
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	border-radius: 8px;
	margin: 0 auto;
  overflow: hidden;
	z-index: 1000;
`;

export const Header = styled.div`
  padding: 2em 2em 0em;
  display: flex;
  align-items: center;
  justify-content: space-between;
	width: 100%;
`;

export const Body = styled.div`
	flex-grow: 1;
  overflow: auto;
`;

export const Title = styled.h3`
	font-size: 16px;
`;

export const Button = styled.button`
	cursor: pointer;
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0;
  border: none;
  background: none;
`;
