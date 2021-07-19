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
			{collectibles.map(({ metadata: { name, description, image }, ...item }, index) => (
				<NFTCard
					key={`--nft-item-${index.toString()}`}
					pictureUrl={image}
					title={name}
					description={description}
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
