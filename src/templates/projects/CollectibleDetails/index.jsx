// Dependencies
import React, { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

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
  PropertyValue

} from './styles';
import { PageMargin } from '@styled-components/pagination';
import { common } from '@styled-components/common';

// Components
import MainImage from '@components/images/MainImage';
import GradeLabel from '@components/labels/GradeLabel';
import FormField from '@forms-components/FormField';
import Collapsible from '@components/foldouts/Collapsible';
import MainTable from '@components/tables/MainTable';
import TokenLabel from '@components/labels/TokenLabel';
import NFTActionCard from '@components/cards/NFTActionCard';
import ProjectSummaryCard from '@components/cards/ProjectSummaryCard';

// Types
import { imageAspectRatio } from '@types/images';

// Assets
import { CartOutline, FlashOutline, HourglassOutline } from 'react-ionicons';

// Utils
import { shortenHex } from '@utils/web3';
import { format } from 'date-fns';
import Fetch from '@components/utils/Fetch';
import gql from 'graphql-tag';

function CollectibleDetailsTemplate({
  title,
  project,
  collectible
}) {
  // Hooks
  const { account } = useWeb3React();

  console.log({ project, collectible });

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
        Header: 'Availability',
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
      address: shortenHex(sale.user.address),
      amount: sale.quantity,
      value: (
        <TokenLabel
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
      address: shortenHex(rent.user.address),
      expirationDate: format(new Date(rent.maxExpirationDate), 'MM/dd/yyyy hh:mm'),
      amount: rent.quantity,
      value: (
        <TokenLabel
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
                      userAddress={account}
                      ownedAmount={nft?.acquired}
                      itemForRent={nft?.latestOffers.forRent}
                      itemForSale={nft?.latestOffers.forSale}
                      onClickBuy={() => {}}
                      onClickRent={() => {}}
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
                    width={'22px'}
                    height={'22px'}
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
          id
          price

          fiat {
            usd
          }

          currency {
            id
          }
        }

        forSale {
          id
          price

          fiat {
            usd
          }

          currency {
            id
          }
        }
      }
    }
  }
`;

export default CollectibleDetailsTemplate;
