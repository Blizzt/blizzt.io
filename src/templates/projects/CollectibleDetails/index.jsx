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

// Types
import { imageAspectRatio } from '@types/images';

// Assets
import { CartOutline, FlashOutline, HourglassOutline } from 'react-ionicons';

// Utils
import { shortenHex } from '@utils/web3';
import { format, fromUnixTime } from 'date-fns';
import ProjectSummaryCard from '@components/cards/ProjectSummaryCard';

function CollectibleDetailsTemplate({
  title,
  project,
  collectible,
  onClickProjectDetails = () => {}
}) {
  const { account } = useWeb3React();

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
        accessor: 'nftOwner'
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
      address: shortenHex(sale.nftOwner),
      amount: sale.amount,
      value: (
        <TokenLabel
          value={sale.price}
          dollars={sale.priceFiat}
          currency={sale.paymentToken}
        />
      )
    }) ?? []),
    [collectible.forSale]
  );

  const rentData = useMemo(
    () => collectible?.forRent.map((rent) => ({
      nftOwner: shortenHex(rent.nftOwner),
      expirationDate: format(fromUnixTime(rent.expirationDate), 'MM/dd/yyyy hh:mm'),
      amount: rent.amount,
      value: (
        <TokenLabel
          value={rent.price}
          dollars={rent.priceFiat}
          currency={rent.paymentToken}
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
                source={`https://ipfs.io/ipfs/${collectible.image.split('//')[1]}`}
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
                name={project.name}
                collectiblesCount={project.collectiblesCount}
                onClick={() => {}}
                pictureUrl={project.photo}
              />
              <Block>
                <NFTActionCard
                  userAddress={account}
                  ownedAmount={collectible.ownedAmount}
                  itemsForRent={collectible.forRent}
                  itemsForSale={collectible.forSale}
                  onClickBuy={() => {}}
                  onClickRent={() => {}}
                  onClickSell={() => {}}
                  onClickRentMyNFT={() => {}}
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

export default CollectibleDetailsTemplate;
