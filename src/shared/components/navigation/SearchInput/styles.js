// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  background: #F1F3F4;
  border-radius: 6px;
  overflow: hidden;
  align-items: center;
  height: 48px;
`;

export const Icon = styled.div`
	padding: 0 10px;
  opacity: 0.4;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  padding: 0 18px 0 0;
	font-family: ${common.fonts.REGULAR};
	height: 100%;
	font-size: 14px;
	background: transparent;
	width: 100%;
`;
