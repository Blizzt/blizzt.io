// Dependencies
import React, { useMemo, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  itemForRent = null,
  itemForSale = null,
  onClickBuy = () => {},
  onClickRent = () => {}
}) {
  // Hooks
  const router = useRouter();

  // State
  const hasCollectibles = useMemo(() => (ownedAmount > 0), [ownedAmount]);
  const [currentViewMode, setCurrentViewMode] = useState(hasCollectibles ? viewModesId.OWNER : viewModesId.BUYER);

  const renderViewingHeader = useMemo(() => (
  	<ViewingHeader>
			{(itemForSale || itemForRent) && (
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
  ), [itemForSale, itemForRent, hasCollectibles, currentViewMode]);

  const renderBuyer = useMemo(() => {
  	return (
			<Layout>
				<Column>
					<Block>
						<Label>Current price</Label>
						<PriceRow>
							<TokenLabel
								type={tokenPriceType.NORMAL}
								currency={itemForSale ? itemForSale.currency.id : currencyTypesId.ETH}
								value={!itemForSale ? '0.000000' : itemForSale.price}
								fiat={!itemForSale ? '0.00' : itemForSale.fiat.usd}
							/>
						</PriceRow>
					</Block>
					<Block>
						<Label>Rental price</Label>
						<PriceRow>
							<TokenLabel
								type={tokenPriceType.NORMAL}
								currency={itemForRent ? itemForRent.currency.id : currencyTypesId.ETH}
								value={!itemForRent ? '0.000000' : itemForRent.price}
								valueLabel={'/ hour'}
								fiat={!itemForRent ? '0.00' : itemForRent.fiat.usd}
							/>
						</PriceRow>
					</Block>
				</Column>
				<Column>
					<MainButton
						caption={'Buy Now'}
						type={itemForSale ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						onClick={() => onClickBuy(itemForSale)}
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
  }, [itemForRent, itemForSale]);

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
				<Link href={`${router.asPath}/sell`}>
					<MainButton
						caption={'Start selling'}
					/>
				</Link>
				<Link href={`${router.asPath}/rent`}>
					<MainButton
						customStyleContainer={styles.rentButton}
						type={buttonTypesId.SECONDARY}
						caption={'Rent collectible'}
					/>
				</Link>
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
