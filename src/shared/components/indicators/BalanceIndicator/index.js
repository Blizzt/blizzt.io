// Dependencies
import React from 'react';
import NumberFormat from 'react-number-format';

// Styled Components
import {
  Layout,
  Token,
  CoinIcon,
  Count
} from './styles';

// Assets
import BlizztIcon from '@assets/images/blizzt-logo-token.svg';

function BalanceIndicator({ balance }) {
  return (
		<Layout>
			<Token>
				<CoinIcon src={BlizztIcon} />
			</Token>
			<Count>
				<NumberFormat
					value={balance}
					displayType={'text'}
					thousandSeparator={true}
				/>
			</Count>
		</Layout>
  );
}

export default BalanceIndicator;
