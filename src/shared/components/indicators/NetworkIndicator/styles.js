// Dependencies
import styled from 'styled-components';
import { isConditional } from '@styled-components/functions';
import { networkTypes } from '@types/web3';
import { common } from '@styled-components/common';

export const styles = {
  tooltipArrow: {
    right: '14px'
  },
  tooltipContainer: {
    right: '0',
    width: '400px',
    padding: '10px'
  }
};

export const NetworkInfo = styled.div`
	padding: 12px;
`;

export const Title = styled.h2`
  font-size: 16px;
  padding-bottom: 10px;
	font-family: ${common.fonts.BOLD};
  line-height: 24px;
	
	${props => `
		${isConditional(props.chainType === networkTypes.UNSUPPORTED, `
		  border-bottom: 4px solid ${common.colors.RED};
		`, isConditional(props.chainType === networkTypes.TESTNET, `
			border-bottom: 4px solid ${common.colors.YELLOW};
    `, `border-bottom: 4px solid ${common.colors.GREEN};
		`))}
	`}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-family: ${common.fonts.REGULAR};
  line-height: 24px;
  margin: 12px 0 0;
`;

export const Layout = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
	border-radius: 4px;

  ${props => isConditional(props.chainType === networkTypes.UNSUPPORTED, `
		background-color: ${common.colors.RED_LIGHT};
	`, isConditional(props.chainType === networkTypes.TESTNET, `
  background-color: ${common.colors.YELLOW_LIGHT};
  `, `background-color: ${common.colors.GREEN_LIGHT};
	`))}
`;
