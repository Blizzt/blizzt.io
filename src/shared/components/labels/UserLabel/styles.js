// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';
import { isConditional } from '@styled-components/functions';
import { userRolesId } from '@types/user';

export const Layout = styled.div`
  display: flex;
  align-items: center;
`;

export const Picture = styled.div`
  width: 24px;
  height: 24px;
`;

export const Username = styled.span`
  padding-left: 14px;
  font-family: ${common.fonts.MEDIUM};
  
  ${props => `
    ${isConditional(props.role === userRolesId.USER, `
      color: ${common.colors.ROLE_USER};
    `)}
    
    ${isConditional(props.role === userRolesId.ADMINISTRATOR, `
      color: ${common.colors.ROLE_ADMIN};
    `)}
  
    ${isConditional(props.role === userRolesId.PARTNER, `
      color: ${common.colors.ROLE_PARTNER};
    `)}
    
    ${isConditional(props.role === userRolesId.STUDIO, `
      color: ${common.colors.ROLE_STUDIO};
    `)}      
  `}
`;
