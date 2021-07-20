// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';
import { isConditional } from '@styled-components/functions';
import { animated } from 'react-spring';

export const Layout = styled(animated.div)`
  background: #ffffffe6;
  box-shadow: 0 0 6px 0 #676f7745;
  border-radius: 8px;
  cursor: default;
  z-index: 10;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px;
  width: max-content;
`;

export const Menu = styled.ul``;

export const Item = styled.li`
  padding: 14px 26px;
  display: flex;
  align-items: center;
  
  color: ${common.colors.BLACK};
  transition: all 0.1s ease-in-out;
  
  ${props => isConditional(props.selected, `
    border-radius: 5px;
    color: ${common.colors.PRIMARY};
    
    svg {
      color: ${common.colors.PRIMARY};
      fill: ${common.colors.PRIMARY}
    }
  `, `
  
  svg {
    color: ${common.colors.BLACK};
    fill: ${common.colors.BLACK};
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    background: #edf0f3;
    border-radius: 5px;
    color: ${common.colors.PRIMARY};

    svg {
      color: ${common.colors.PRIMARY};
      fill: ${common.colors.PRIMARY}
    }
  }
  `)}
`;

export const Text = styled.span`
  padding: 0 18px;
  font-family: ${common.fonts.MEDIUM};
  font-size: 14px;
  white-space: pre;
`;

export const Label = styled.h4`
  font-family: ${common.fonts.BOLD};
  font-size: 14px;
`;

export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 22px;
  grid-row-gap: 22px;
  grid-auto-rows: max-content;
  padding: 22px;
`;

export const Paragraph = styled.p`
  display: block;
  max-width: 500px;
  word-break: break-word;
  white-space: initial;
  width: 100%;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: ${common.colors.GRAY_HARD};
  transition: all 0.2s ease-in-out;
`;

export const Section = styled.li`
  width: 100%;
  cursor: pointer;
  
  ${Label} {
    svg {
      opacity: 0;
      position: relative;
      left: 2px;
      transition: all 0.2s ease-in-out;
      color: ${common.colors.BLACK};
      fill: ${common.colors.BLACK}
    }
  }
  
  &:hover {
    color: ${common.colors.PRIMARY};
    
    ${Paragraph} {
      color: ${common.colors.BLACK}
    }

    ${Label} {
      svg {
        opacity: 1;
        position: relative;
        left: 6px;
        color: ${common.colors.PRIMARY};
        fill: ${common.colors.PRIMARY}
      }
    }
  }
`;
