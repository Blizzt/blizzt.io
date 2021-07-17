// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const styles = {
  gradeLabel: {
    fontSize: '12px',
    padding: '4px 0px'
  }
};

export const Item = styled.li`
  background: white;
  padding: 22px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
	
  &:hover {
    box-shadow: 0 8px 24px -14px #0000007a;
    transform: translateY(-4px);
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
	justify-content: center;
`;

export const Title = styled.h2`
  font-family: ${common.fonts.REGULAR};
  font-size: 16px;
  color: ${common.colors.BLACK};
  margin-top: 22px;
`;

export const Price = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr 1fr'};
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  padding: 14px 0 0;
  border-top: 1px dashed #e4e4e4;
  height: 100%;
`;

export const Unavailable = styled.span`
  font-size: 12px;
  padding-top: 5px;
  text-transform: uppercase;
	text-align: center;
	color: ${common.colors.GRAY_MEDIUM};
`;

export const Label = styled.p`
  margin: 0;
  font-size: 10px;
  text-transform: uppercase;
  color: ${common.colors.PRIMARY};
  font-family: ${common.fonts.BOLD};
  padding: 8px 4px;
`;
