// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Project = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
  padding: 12px;
  border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	user-select: none;
	
	&:hover {
		background-color: ${common.colors.PRIMARY_LIGHT};
		border-color: ${common.colors.PRIMARY};
	}
`;

export const ProjectImage = styled.div`
	width: 100px;
`;

export const ProjectName = styled.h4`
	font-weight: normal;
	font-family: ${common.fonts.MEDIUM};
  font-size: 14px;
	line-height: 26px;
  color: ${common.colors.PRIMARY};
`;

export const ProjectDetails = styled.div`
	display: flex;
	flex-direction: column;
  padding: 0 18px;
`;

export const ProjectCount = styled.span`
	font-size: 12px;
	font-family: ${common.fonts.MEDIUM};
`;
