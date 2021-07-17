// Dependencies
import styled from 'styled-components';
import { PageContainer, PageMargin } from '@styled-components/pagination';
import { common } from '@styled-components/common';

export const Layout = styled(PageContainer)``;

export const TopNavigatorFrame = styled.div`
  background: ${common.colors.PRIMARY_LIGHT};
`;

export const Navigator = styled(PageMargin)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0%, 100%));
  flex-direction: row;
  position: relative;
  z-index: 2;
  user-select: none;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 170px;
  padding: 18px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: rgb(228 231 233);
  color: ${common.colors.BLACK};

  &:first-child {
    border-radius: 4px 0 0 0;
  }

  &:last-child {
    border-radius: 0 4px 0 0;
  }
  
  &.active {
    background-color: ${common.colors.WHITE} !important;
  }
`;

export const Label = styled.div`
	font-family: ${common.fonts.MEDIUM};
  font-size: 13px;
  text-transform: uppercase;
`;

export const Icon = styled.span`
  font-size: 16px;
  margin-right: 14px;
  position: relative;
`;

export const Container = styled.div``;

export const Header = styled(PageMargin)`
  padding: 30px 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Picture = styled.div`
  width: 120px;
`;

export const Data = styled.div`
  margin-left: 22px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-family: ${common.fonts.MEDIUM};
  color: ${common.colors.PRIMARY};
`;

export const CreatedAt = styled.span`
  font-size: 14px;
  line-height: 26px;
  font-family: ${common.fonts.REGULAR};
  color: ${common.colors.GRAY_HARD};
`;
