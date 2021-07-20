// Dependencies
import React, { useMemo, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

// Styles
import {
  Layout,
  Label,
  Column,
  Block,
  PriceRow,

  ViewingHeader,
  ViewingAction,
  Summary,
  SummaryText,

  styles
} from './styles';
import { Medium } from '@styled-components/text';

// Components
import TokenLabel, { tokenPriceType } from '@components/labels/TokenLabel';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

// Assets
import SummaryLottie from '../../../assets/lotties/summary.json';

// Types
import { currencyTypesId } from '@types/web3';

// Utils
const viewModesId = {
  BUYER: 'buyer',
  OWNER: 'owner'
};

function NFTActionCard({
  userAddress = null,
  ownedAmount = null,
  itemsForRent = [],
  itemsForSale = [],
  onClickBuy = () => {},
  onClickRent = () => {},
  onClickRentMyNFT = () => {},
  onClickSell = () => {}
}) {
  // State
  const hasCollectibles = useMemo(() => (ownedAmount > 0), [ownedAmount]);
  const itemForBuy = useMemo(() => itemsForSale.length > 0 ? (itemsForSale).filter(e => e.nftOwner !== userAddress[0])[0] : null, [userAddress, itemsForSale]);
  const itemForRent = useMemo(() => itemsForRent.length > 0 ? (itemsForRent).filter(e => e.nftOwner !== userAddress[0])[0] : null, [userAddress, itemsForRent]);

  const [currentViewMode, setCurrentViewMode] = useState(hasCollectibles ? viewModesId.OWNER : viewModesId.BUYER);

  const renderViewingHeader = useMemo(() => (
  	<ViewingHeader>
			{(itemForBuy || itemForRent) && (
				<ViewingAction
					onClick={() => setCurrentViewMode(viewModesId.BUYER)}
					isActive={currentViewMode === viewModesId.BUYER}
				>
					Buy / Rent
				</ViewingAction>
			)}

			{hasCollectibles && (
				<ViewingAction
					onClick={() => setCurrentViewMode(viewModesId.OWNER)}
					isActive={currentViewMode === viewModesId.OWNER}
				>
					Sell / Rent
				</ViewingAction>
			)}
		</ViewingHeader>
  ), [itemForBuy, itemForRent, hasCollectibles, currentViewMode]);

  const renderBuyer = useMemo(() => {
  	return (
			<Layout>
				<Column>
					<Block>
						<Label>Current price</Label>
						<PriceRow>
							<TokenLabel
								type={tokenPriceType.NORMAL}
								currency={itemForBuy ? itemForBuy.paymentToken : currencyTypesId.ETH}
								value={!itemForBuy ? '0.000000' : itemForBuy.price}
								dollars={!itemForBuy ? '0.00' : itemForBuy.priceFiat}
							/>
						</PriceRow>
					</Block>
					<Block>
						<Label>Rental price</Label>
						<PriceRow>
							<TokenLabel
								type={tokenPriceType.NORMAL}
								currency={itemForRent ? itemForRent.paymentToken : currencyTypesId.ETH}
								value={!itemForRent ? '0.000000' : itemForRent.price}
								valueLabel={'/ hour'}
								dollars={!itemForRent ? '0.00' : itemForRent.priceFiat}
							/>
						</PriceRow>
					</Block>
				</Column>
				<Column>
					<MainButton
						caption={'Buy Now'}
						type={itemForBuy ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						onClick={() => onClickBuy(itemForBuy)}
					/>
					<MainButton
						customStyleContainer={styles.rentButton}
						type={itemForRent ? buttonTypesId.SECONDARY : buttonTypesId.DISABLED}
						caption={'Rent collectible'}
						onClick={() => onClickRent(itemForRent)}
					/>
				</Column>
			</Layout>
    );
  }, [itemForRent, itemForBuy]);

  const renderOwner = useMemo(() => (
		<Layout>
			<Summary>
				<Player
					autoplay
					loop
					src={SummaryLottie}
					style={{ height: '80px', width: '80px' }}
				/>
				<SummaryText>You have a total of <Medium>{ownedAmount} collectible(s)</Medium> ready to sell or rent.</SummaryText>
			</Summary>
			<Column>
				<MainButton
					caption={'Start selling'}
					onClick={onClickSell}
				/>
				<MainButton
					customStyleContainer={styles.rentButton}
					type={buttonTypesId.SECONDARY}
					caption={'Rent collectible'}
					onClick={onClickRentMyNFT}
				/>
			</Column>
		</Layout>
  ), []);

  return (
  	<>
			{renderViewingHeader}
			{currentViewMode === viewModesId.BUYER ? renderBuyer : renderOwner}
		</>
  );
}

export default NFTActionCard;
