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
import IPFSFetch from '@components/utils/IPFSFetch';

function RewardsList({ onClick = () => {}, collectibles = [] }) {
  const renderCollectiblesList = useMemo(() => (
		<List>
			{collectibles.map((item, index) => (
			  <IPFSFetch
          key={`--nft-item-${index.toString()}`}
          endpoint={item.IPFSAddress}
          metadata={item.metadata}
          onRender={({ data }) => (
            <>
              {console.log(data)}
              <NFTCard
                pictureUrl={data.image}
                title={data.name}
                description={data.description}
                forSale={item.latestOffers.forSale}
                forRent={item.latestOffers.forRent}
                units={item.mintedAmount}
                onClick={() => onClick(item)}
              />
            </>
          )}
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
