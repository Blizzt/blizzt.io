// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20vh 0;
`;

export const Title = styled.h1`
  font-family: ${common.fonts.BOLD};
  font-size: 22px;
  margin-top: 22px;
  text-align: center;
`;

export const SubTitle = styled.span`
  max-width: 600px;
  display: block;
  margin-top: 22px;
  font-family: ${common.fonts.LIGHT};
  line-height: 30px;
  text-align: center;
`;
