// Dependencies
import styled from 'styled-components';
import { PageMargin } from '@styled-components/pagination';

export const Container = styled(PageMargin)`
  z-index: 5;
  position: relative;
`;

export const BlurHeader = styled.div`
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  padding-top: 42px;
  transition: background 250ms;

  &:after {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.65) 0%, rgb(255, 255, 255) 50%);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0%, 100%));
  grid-column-gap: 34px;
  grid-row-gap: 34px;
  grid-auto-rows: minmax(min-content, max-content);
`;
