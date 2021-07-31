// Dependencies
import React, { useCallback, useContext } from 'react';
import Web3 from 'web3';
import { addMonths, getUnixTime } from 'date-fns';
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
import SellCollectibleForm from '@components/forms/SellCollectibleForm';

// Types
import { currencyTypesData } from '@types/web3';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

// Context
import { ThemeContext } from '@styled-components/index';
import { modalTypesId } from '@types/ui';

function SellCollectible({
  title,
  collectible,
  putOnSaleNFT = () => {}
}) {
  // Hooks
  const { account } = useWeb3React();
  const sign = usePersonalSign();

  // Context
  const { openModal } = useContext(ThemeContext);

  const onPutOnSaleCollectible = useCallback(async({ values: offer, formikHelpers, actionButtonRef }) => {
    formikHelpers.setSubmitting(true);
    actionButtonRef.changeToLoading('Creating sales offers...');

    // Web3 Instance
    const web3 = new Web3(window.ethereum);

    // Get metamask signature
    const sellParams = web3.eth.abi.encodeParameters(['address', 'uint256', 'uint24', 'uint256', 'address', 'bool', 'uint256'], [collectible.project.collectionAddress, collectible.nftId, offer.amount, web3.utils.toWei(offer.price.toString()), currencyTypesData[offer.currency].code, offer.isBundlePack, getUnixTime(addMonths(new Date(), 12))]);
    const fingerprint = await sign(sellParams);

    // 2. Verify Data Signed and Signature
    if (verifyMessage(sellParams, fingerprint) === account) {
      putOnSaleNFT({
        variables: {
          nftId: collectible.nftId,
          projectId: collectible.project.id,
          offer: {
            amount: Number(offer.amount),
            price: offer.price,
            isBundlePack: offer.isBundlePack,
            currencyId: currencyTypesData[offer.currency].id
          },
          signature: {
            message: sellParams,
            fingerprint
          }
        }
      }).then(() => {
        actionButtonRef.changeToComplete('Offer published successfully');
        openModal(modalTypesId.SELL_MY_COLLECTIBLE_SUCCESS);
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
            <SellCollectibleForm
              ownedAmount={collectible.acquired}
              onSubmit={onPutOnSaleCollectible}
              onCancel={() => {}}
            />
          </Body>
        </PageMargin>
      </Layout>
    </PageLayout>
  );
}

export default SellCollectible;
