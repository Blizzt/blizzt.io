// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Container = styled.div`
  padding: 82px 22px 32px;
  border-bottom: 1px solid #e6e6e6;
`;

export const Title = styled.h1`
  font-size: 22px;
  line-height: 32px;
  font-family: ${common.fonts.REGULAR};
	color: ${common.colors.PRIMARY};
	margin-bottom: 6px;
`;

export const Description = styled.span`
  font-size: 16px;
  line-height: 22px;
  color: ${common.colors.GRAY_HARD};
  font-family: ${common.fonts.LIGHT};
`;

export const SectionField = styled.div`
	padding: 82px 0;
`;
