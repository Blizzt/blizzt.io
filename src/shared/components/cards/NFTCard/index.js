// Dependencies
import React, { useMemo } from 'react';

// Styled Components
import {
  Item,
  Data,
  Title,
  Price,
  Label,
  Unavailable,

  styles
} from './styles';

// Components
import TokenPrice from '@components/indicators/PriceIndicator';
import MainImage from '@components/images/MainImage';
import GradeLabel from '@components/labels/GradeLabel';

// Types
import { imageAspectRatio } from '@types/images';

function NFTCard({
  pictureUrl,
  title,
  units,
  forSale = {},
  forRent = {},
  onClick = () => {}
}) {
  const renderPrice = useMemo(() => {
  	const unAvailable = (!Object.keys(forRent).length && !Object.keys(forSale).length);

    if (unAvailable) {
      return (
				<Price columns={'1fr'}>
					<Unavailable>Without stock</Unavailable>
				</Price>
      );
    }

    return (
			<Price>
				{Object.keys(forSale).length > 0 && (
					<div>
						<Label>Sale price</Label>
						<TokenPrice
							currency={forSale.paymentToken}
							value={forSale.price}
							dollars={forSale.priceFiat}
						/>
					</div>
				)}
				{Object.keys(forRent).length > 0 && (
					<div>
						<Label>Rent per hour</Label>
						<TokenPrice
							currency={forRent.paymentToken}
							value={forRent.price}
							dollars={forRent.priceFiat}
						/>
					</div>
				)}
			</Price>
    );
  }, [forSale, forRent]);

  return (
		<Item onClick={onClick}>
			<MainImage
				radius={4}
				aspectRatio={imageAspectRatio.ONE}
				source={pictureUrl}
			/>
			<Data>
				<Title>{title}</Title>
				<GradeLabel mintedAmount={units} customStyleContainer={styles.gradeLabel} />
			</Data>
			{renderPrice}
		</Item>
  );
}

export default NFTCard;
