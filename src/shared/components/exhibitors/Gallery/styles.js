// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  min-height: 28rem;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
`;

export const Bottom = styled.div`
  background: black;
  padding: 22px;
  width: 100%;
  min-height: 0%;
  transition: all 250ms;
  background: linear-gradient(to bottom, rgb(0 0 0 / 0%) 0%,rgb(0 0 0 / 66%) 100%);
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: white;
  font-size: 16px;
  font-family: ${common.fonts.MEDIUM};
`;

export const Platforms = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 12px 0;
`;

export const Platform = styled.li`
  font-size: 12px;
  color: #fff;

  margin-right: 12px;

  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.14);

  &:last-child {
    margin-right: 0;
  }
`;

export const Description = styled.p`
  color: #fff;
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 1.4rem;
  font-family: ${common.fonts.LIGHT};
`;

export const Item = styled.div`
  background-color: #000;
  display: flex;
  flex-grow: 1;
  border-radius: 8px;
  align-items: flex-end;
  overflow: hidden;
  transition: opacity, background 250ms ease-in-out;
  user-select: none;

  ${props => `
    background: url("${props.image}");
    background-size: cover;
    background-position: center;
        
    ${isConditional(props.primary, `
      ${Bottom} {
        padding: 2.4rem;
        background: linear-gradient(to bottom,rgb(0 0 0 / 0%) 0%,rgb(0 0 0 / 66%) 60%);
      }
      
      ${Title} {
        font-size: 24px;
        font-family: ${common.fonts.BOLD};
      }
    `, `
      opacity: 0.8;
      cursor: pointer;
      
      ${isConditional(props.isActive, `
        opacity: 1;
      
        ${Bottom} {
          background: ${props.accentColor}d6;
          min-height: 100%;
        }
        
        ${Title} {
          color: ${props.textColor};
        }
      `)}
      
      &:hover {
        opacity: 1;
      }
    
    `)}
   
  `}
`;
