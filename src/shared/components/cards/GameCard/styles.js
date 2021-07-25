// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  user-select: none;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
`;

export const Bottom = styled.div`
  padding: 22px;
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  border-top: none;
  border-radius: 0 0 4px 4px;
`;

export const Title = styled.h3`
  font-family: ${common.fonts.MEDIUM};
  margin-bottom: 12px;
  font-size: 18px;
  line-height: 22px;
`;

export const Category = styled.div`
  text-transform: uppercase;
  font-family: ${common.fonts.REGULAR};
  font-size: 11px;
  letter-spacing: 0.5px;
  color: ${common.colors.PRIMARY};
`;
