// Dependencies
import React, { useCallback, useContext } from 'react';
import Web3 from 'web3';
import { getUnixTime } from 'date-fns';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';

// Layouts
import PageLayout from '@layouts/PageLayout';

// Styled Components
import {
  Layout,
  Body
} from './styles';
import { PageMargin } from '@styled-components/pagination';

// Components
import RentCollectibleForm from '@components/forms/RentCollectibleForm';

// Types
import { currencyTypesData } from '@types/web3';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

// Context
import { ThemeContext } from '@styled-components/index';
import { modalTypesId } from '@types/ui';

function RentCollectible({
  title,
  collectible,
  putOnRentNFT = () => {}
}) {
  // Hooks
  const { account } = useWeb3React();
  const sign = usePersonalSign();

  // Context
  const { openModal } = useContext(ThemeContext);

  const onRentCollectible = useCallback(async({ values: offer, formikHelpers, actionButtonRef }) => {
    formikHelpers.setSubmitting(true);
    actionButtonRef.changeToLoading('Creating sales offers...');

    // Web3 Instance
    const web3 = new Web3(window.ethereum);

    // Format Price
    const priceFormatted = parseFloat(web3.utils.toWei(offer.price.toString()) / 3600).toFixed(0);

    // Get Metamask Signature Request
    const rentParams = web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'uint24', 'uint256', 'address', 'uint256'],
      [
        collectible.project.collectionAddress,
        collectible.nftId,
        offer.amount,
        priceFormatted,
        currencyTypesData[offer.currency].code,
        getUnixTime(offer.until)
      ]);
    const fingerprint = await sign(rentParams);

    // 2. Verify Data Signed and Signature
    if (verifyMessage(rentParams, fingerprint) === account) {
      putOnRentNFT({
        variables: {
          nftId: collectible.nftId,
          projectId: collectible.project.id,
          offer: {
            amount: Number(offer.amount),
            price: offer.price,
            currencyId: currencyTypesData[offer.currency].id,
            until: offer.until
          },
          signature: {
            message: rentParams,
            fingerprint
          }
        }
      }).then(({ data: { putOnRentNFT: data } }) => {
        actionButtonRef.changeToComplete('Offer published successfully');
        openModal(modalTypesId.RENT_MY_COLLECTIBLE_SUCCESS);
      }).catch(() => {
        actionButtonRef.changeToError('Offer not published');
      });
    }
  }, [collectible, account]);

  return (
    <PageLayout title={title}>
      <Layout>
        <PageMargin>
          <Body>
            <RentCollectibleForm
              ownedAmount={collectible.acquired}
              onSubmit={onRentCollectible}
              onCancel={() => {}}
            />
          </Body>
        </PageMargin>
      </Layout>
    </PageLayout>
  );
}

export default RentCollectible;
