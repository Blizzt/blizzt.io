// Dependencies
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';

// Layouts
import PageLayout from '@layouts/PageLayout';

// Styled Components
import {
  Layout,
  Body,
  Block,
  Name,
  Title,
  Description,
  LinearGrid,

  Properties,
  Property,
  PropertyName,
  PropertyValue,

  ExpirationDate

} from './styles';
import { PageMargin } from '@styled-components/pagination';
import { common } from '@styled-components/common';

// Components
import MainImage from '@components/images/MainImage';
import GradeLabel from '@components/labels/GradeLabel';
import FormField from '@forms-components/FormField';
import Collapsible from '@components/foldouts/Collapsible';
import MainTable from '@components/tables/MainTable';
import TokenLabel, { tokenPriceType } from '@components/labels/TokenLabel';
import NFTActionCard from '@components/cards/NFTActionCard';
import ProjectSummaryCard from '@components/cards/ProjectSummaryCard';
import UserLabel from '@components/labels/UserLabel';

// Types
import { imageAspectRatio } from '@types/images';

// Assets
import { CartOutline, FlashOutline, HourglassOutline } from 'react-ionicons';

// Utils
import Fetch from '@components/utils/Fetch';
import TimeRemaining from '@components/utils/TimeRemaining';

function CollectibleDetailsTemplate({
  title,
  project,
  collectible,

  onClickBuy = () => {},
  onClickRent = () => {}
}) {
  // Attributes
  const renderAttributesList = useMemo(() => (
    (collectible.attributes.filter(e => e.trait_type !== 'birthday') || []).map((attribute, index) => (
      <Property key={`--attributes-list-${index.toString()}`}>
        <PropertyName>{attribute.trait_type}</PropertyName>
        <PropertyValue>{attribute.value} {attribute.max_value && ` / ${attribute.max_value}`}</PropertyValue>
      </Property>
    ))
  ), [collectible.attributes]);

  const saleColumns = useMemo(
    () => [
      {
        Header: 'From',
        accessor: 'address'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Sale price',
        accessor: 'value'
      }
    ],
    []
  );

  const rentColumns = useMemo(
    () => [
      {
        Header: 'From',
        accessor: 'address'
      },
      {
        Header: 'Available until',
        accessor: 'expirationDate'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Price per Hour',
        accessor: 'value'
      }
    ],
    []
  );

  const saleData = useMemo(
    () => collectible?.forSale.map((sale) => ({
      address: (
        <UserLabel
          address={sale.user.address}
          username={sale.user.username}
          photoUrl={sale.user.photoUrl}
          role={sale.user.role}
        />
      ),
      amount: sale.quantity,
      value: (
        <TokenLabel
          type={tokenPriceType.TABLE}
          value={sale.price}
          fiat={sale.fiat.usd}
          currencyId={sale.currency.id}
        />
      )
    }) ?? []),
    [collectible.forSale]
  );

  const rentData = useMemo(
    () => collectible?.forRent.map((rent) => ({
      address: (
        <UserLabel
          address={rent.user.address}
          username={rent.user.username}
          photoUrl={rent.user.photoUrl}
          role={rent.user.role}
        />
      ),
      expirationDate: (
        <TimeRemaining to={rent.maxExpirationDate}>
          {({ remaining }) => (
            <ExpirationDate>{remaining}</ExpirationDate>
          )}
        </TimeRemaining>
      ),
      amount: rent.quantity,
      value: (
        <TokenLabel
          type={tokenPriceType.TABLE}
          value={rent.price}
          fiat={rent.fiat.usd}
          currencyId={rent.currency.id}
        />
      )
    }) ?? []),
    [collectible.forRent]
  );

  return (
    <PageLayout title={title}>
      <Layout>
        <PageMargin>
          <Body>
            <LinearGrid>
              <MainImage
                aspectRatio={imageAspectRatio.ONE}
                source={collectible.image}
                radius={4}
              />
              <Block>
                <Title>
                  <Name>{collectible.name}</Name>
                  <GradeLabel mintedAmount={collectible.mintedAmount} />
                </Title>
                {collectible.description ? (
                  <FormField
                    label={'Description'}
                    paragraphs={[
                      <Description key={'description'}>{collectible.description}</Description>
                    ]}
                  />
                ) : (
                  <Description none>
                    This collectible has no description available.
                  </Description>
                )}
              </Block>

              <Collapsible
                icon={
                  <FlashOutline
                    width={'22px'}
                    height={'22px'}
                    color={common.colors.BLACK}
                  />
                }
                title={'Properties'}
              >
                <Properties>
                  {renderAttributesList}
                </Properties>
              </Collapsible>

            </LinearGrid>
            <LinearGrid>
              <ProjectSummaryCard
                name={project.title}
                nftsCount={project.nftsCount}
                onClick={() => {}}
                pictureUrl={project.photoUrl}
              />
              <Block>
                <Fetch
                  gql={GET_NFT_ACTIONS}
                  variables={{
                    projectId: project.id,
                    nftId: collectible.nftId
                  }}
                  onRender={({ nft = {} }) => (
                    <NFTActionCard
                      ownedAmount={nft?.acquired}
                      itemForRent={nft?.latestOffers.forRent}
                      itemForSale={nft?.latestOffers.forSale}
                      onClickBuy={offer => onClickBuy({ offer, collectible })}
                      onClickRent={offer => onClickRent({ offer, collectible })}
                    />
                  )}
                />
              </Block>
              <MainTable
                title={'Listing for sale'}
                emptyMessage={'There are no collectibles for sale available right now.'}
                icon={
                  <CartOutline
                    width={'22px'}
                    height={'22px'}
                    color={common.colors.BLACK}
                  />
                }
                data={saleData}
                columns={saleColumns}
              />
              <MainTable
                title={'Listing for rent'}
                emptyMessage={'There are no collectibles for rent available right now.'}
                icon={
                  <HourglassOutline
                    width={'20px'}
                    height={'20px'}
                    color={common.colors.BLACK}
                  />
                }
                data={rentData}
                columns={rentColumns}
              />
            </LinearGrid>
          </Body>
        </PageMargin>
      </Layout>
    </PageLayout>
  );
}

export const GET_NFT_ACTIONS = gql`
  query GetNFT($projectId: ID!, $nftId: Int!) {
    nft(projectId: $projectId, nftId: $nftId) {
      acquired

      # Latest Offers
      latestOffers {
        forRent {
          
          # Offer Details
          id
          price
          quantity
          maxExpirationDate
          
          # Signature Identity
          message
          fingerprint
          
          # Fiat Currencies
          fiat {
            usd
          }

          # Crypto Currencies
          currency {
            id
          }
        }
                
        forSale {

          # Offer Details
          id
          price
          quantity

          # Signature Identity
          message
          fingerprint
          
          # Fiat Currencies
          fiat {
            usd
          }

          # Crypto Currencies
          currency {
            id
          }
        }
      }
    }
  }
`;

export default CollectibleDetailsTemplate;
