// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  border: 1px dashed  ${common.colors.GREEN_SOFT};
  padding: 22px;
  border-radius: 8px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Current = styled.h3`
  font-size: 18px;
  color: ${common.colors.GREEN_SOFT};
  font-family: ${common.fonts.BOLD};
`;

export const Max = styled.p`
  font-size: 13px;
  padding: 0;
  margin: 4px 0 0;
  font-family: ${common.fonts.REGULAR};
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
`;

export const Bottom = styled.div`
  margin-top: 1.6rem;
`;
