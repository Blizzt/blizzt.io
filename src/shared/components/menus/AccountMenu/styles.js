
// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { common } from '@styled-components/common';

export const Layout = styled.div`
  position: absolute;
  top: -11px;
  right: 0;
  background: white;
  width: 520px;
  box-shadow: 0 2px 6px -2px #0000003b;
  padding: 28px;
  border-radius: 0 0 6px 6px;
  z-index: 100;

  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  grid-auto-rows: max-content;

  border: 1px solid gainsboro;
  border-top: 5px solid ${common.colors.PRIMARY};
`;

export const Row = styled.div``;

export const Block = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 32px;
  grid-column-gap: 32px;
  grid-auto-rows: max-content;
`;

export const Image = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 4px;
`;

export const Title = styled.h1`
  font-size: 14px;
  margin-bottom: 12px;
`;

export const Label = styled.h4`
  font-size: 11px;
  text-transform: uppercase;
`;

export const Balance = styled.h4`
  margin-top: 6px;
`;

export const Navigator = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled.a`
  margin-bottom: 12px;
  color: ${common.colors.BLACK};
  font-size: 14px;

  &:hover {
    color: ${common.colors.PRIMARY};
  }

  ${props => `
		${isConditional(props.red, `
			color: ${common.colors.RED};
			
			&:hover {
				color: ${common.colors.RED} !important;
			}
		`)}
	
	`}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Address = styled.span`
  font-size: 14px;
	cursor: pointer;
	color: ${common.colors.PRIMARY};
`;
