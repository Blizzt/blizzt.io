// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
`;

export const Title = styled.h1`
  font-family: ${common.fonts.BOLD};
  font-size: 15px;
  margin-top: 4rem;
  text-align: center;
`;

export const Indicator = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logotype = styled.img`
  position: absolute;
  width: 42px;
  height: 42px;
`;
