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
  forSale = null,
  forRent = null,
  onClick = () => {}
}) {
  const renderPrice = useMemo(() => {
    const unAvailable = (!forRent && !forSale);

    if (unAvailable) {
      return (
        <Price columns={'1fr'}>
          <Unavailable>Without stock</Unavailable>
        </Price>
      );
    }

    return (
      <Price>
        {forSale && Object.keys(forSale).length > 0 && (
          <div>
            <Label>Sale price</Label>
            <TokenPrice
              currency={forSale.currency.id}
              value={forSale.price}
              fiat={forSale.fiat.usd}
            />
          </div>
        )}
        {forRent && Object.keys(forRent).length > 0 && (
          <div>
            <Label>Rent per hour</Label>
            <TokenPrice
              currency={forSale.currency.id}
              value={forRent.price}
              fiat={forRent.fiat.usd}
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
