// Dependencies
import React from 'react';
import NumberFormat from 'react-number-format';

// Styled Components
import {
  Layout,
  Icon,
  PriceData,
  PriceValue,
  SubLabel
} from './styles';
import { Medium } from '@styled-components/text';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';

export const tokenPriceType = {
  SMALL: 'small',
  TABLE: 'table',
  NORMAL: 'normal'
};

function PriceIndicator({
  value,
  fiat = null,
  valueLabel = null,
  type = tokenPriceType.SMALL,
  currency = currencyTypesId.ETH
}) {
  return (
		<Layout type={type}>
			<Icon src={currencyTypesData[currency].image} alt={`${value}`} />
			<PriceData>
				<PriceValue>
					<NumberFormat
						value={value}
						displayType={'text'}
						thousandSeparator={true}
					/>
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

export default PriceIndicator;
