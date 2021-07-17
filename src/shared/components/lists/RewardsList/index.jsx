// Dependencies
import React, { useMemo } from 'react';

// Styled Components
import {
  List,
  EmptyMessage,
  EmptyLabel
} from './styles';

// Components
import NFTCard from '../../cards/NFTCard';

function RewardsList({ onClick = () => {}, collectibles = [] }) {
  const renderCollectiblesList = useMemo(() => (
		<List>
			{collectibles.map((item, index) => (
				<NFTCard
					key={`--nft-item-${index.toString()}`}
					pictureUrl={item.image}
					title={item.name}
					description={item.description}
					forSale={item.forSale}
					forRent={item.forRent}
					units={item.mintedAmount}
					onClick={() => onClick(item)}
				/>
			))}
		</List>
  ), [collectibles]);

  const renderEmptyView = useMemo(() => (
		<EmptyMessage>
			<EmptyLabel>
				This project has no collectibles available.
			</EmptyLabel>
		</EmptyMessage>
  ), []);

  return collectibles.length ? renderCollectiblesList : renderEmptyView;
}

export default RewardsList;
