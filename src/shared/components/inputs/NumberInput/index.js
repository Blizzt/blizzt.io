// Dependencies
import React, { useCallback, useMemo, useRef, useState } from 'react';

// Styled Components
import {
  Label,
  Input,
  Layout,
  Container,
  Description,
  Coin,
  IconContainer,

  CoinList,
  CoinItem,
  CoinName
} from './styles';

// Components
import FormErrorText from '@forms-components/FormErrorText';

// Assets
import {
  DiceOutline,
  ChevronDownOutline
} from 'react-ionicons';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';

// Hooks
import useOnClickOutside from '@hooks/useOnClickOutside';

// Utils
import { common } from '@styled-components/common';

export const numberInputType = {
  PRICE: 'price',
  COUNT: 'count'
};

export default function NumberInput({
  label,
  value = 1,
  description,
  placeholder,
  currency = currencyTypesId.ETH,
  error = null,
  onChangeText = () => {},
  onChangeCurrency = () => {},
  type = numberInputType.PRICE
}) {
  // Refs
  const menuRef = useRef(null);

  // States
  const [isCoinMenuEnabled, setCoinMenuEnabled] = useState(false);

  // Price Type Input
  const isPriceInput = useMemo(() => type === numberInputType.PRICE, [type]);

  // Hooks
  useOnClickOutside(menuRef, () => setCoinMenuEnabled(false));

  const onClickCoin = useCallback((coinId) => {
  	setCoinMenuEnabled(false);
  	onChangeCurrency(coinId);
  }, [onChangeCurrency]);

  const renderCoinList = useMemo(() => (
		<CoinList>
			{Object.keys(currencyTypesData).map((currency, index) => (
				<CoinItem
					key={`--currency-token-${index.toString()}`}
					onClick={() => onClickCoin(currency)}
				>
					<Coin
						src={currencyTypesData[currency].image}
					/>
					<CoinName>{currencyTypesData[currency].name}</CoinName>
				</CoinItem>
			))}
		</CoinList>
  ), [menuRef]);

  const onClickCurrency = useCallback(() => {
  	if (isPriceInput) {
  		setCoinMenuEnabled(!isCoinMenuEnabled);
    }
  }, [isPriceInput, isCoinMenuEnabled]);

  return (
		<Layout>
			{label && <Label>{label}</Label>}
			{description && <Description>{description}</Description>}
			<Container>
				<IconContainer onClick={onClickCurrency} pointer={isPriceInput} ref={menuRef}>
					{isPriceInput ? (
						<>
							<Coin src={currencyTypesData[currency].image} />
							<ChevronDownOutline
                className={'chevron-right'}
								width={'12px'}
								height={'12px'}
								color={common.colors.BLACK}
							/>
              {(isPriceInput && isCoinMenuEnabled) && renderCoinList}
						</>
					) : (
						<DiceOutline
							width={'24px'}
							height={'24px'}
						/>
					)}
				</IconContainer>
				<Input
					placeholder={placeholder}
					value={value}
					onChange={e => onChangeText(e.target.value)}
				/>
			</Container>
			{error && <FormErrorText text={error} />}
		</Layout>
  );
}
