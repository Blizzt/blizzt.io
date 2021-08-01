// Dependencies
import React from 'react';
import NumberFormat from 'react-number-format';

// Styled Components
import {
  Layout,
  Icon,
  PriceData,
  PriceValue,
  SubLabel,
  Symbol
} from './styles';
import { Medium } from '@styled-components/text';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';

export const tokenPriceType = {
  SMALL: 'small',
  TABLE: 'table',
  NORMAL: 'normal'
};

function TokenLabel({
  value,
  fiat = null,
  valueLabel = null,
  type = tokenPriceType.SMALL,
  currencyId = currencyTypesId.ETH
}) {
  return (
		<Layout type={type}>
			<Icon src={currencyTypesData[currencyId].image} alt={`${value}`} />
			<PriceData>
				<PriceValue>
					<NumberFormat
						value={value}
						displayType={'text'}
						thousandSeparator={true}
					/>
          <Symbol>
            {currencyTypesData[currencyId].symbol}
          </Symbol>
					{valueLabel && <Medium>{valueLabel}</Medium>}
				</PriceValue>
				{fiat &&
					<SubLabel>
						<NumberFormat
							prefix={'$'}
							value={fiat}
							displayType={'text'}
							thousandSeparator={true}
						/>
					</SubLabel>
				}
			</PriceData>
		</Layout>
  );
}

export default TokenLabel;
