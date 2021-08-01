// Dependencies
import Web3 from 'web3';
import gql from 'graphql-tag';
import { NetworkStatus } from 'apollo-client';

// API
import createApolloClient from '../../../../apollo.client';

// Contracts
import NFTMarketplace from '@contracts/abis/NFTMarketplace.json';
import IERC20 from '@contracts/abis/IERC20.json';
import Addresses from '@contracts/addresses';

// Types
import { currencyTypesData, currencyTypesId } from '@types/web3';
import { offerStatesId } from '@types/offers';

const GET_OFFER_BY_ID = gql`
  query GetOffer($id: Int!) {
    offer(id: $id) {
      id
      price
      state
      quantity
      
      message
      fingerprint
      
      currency {
        id
      }
    }
  }
`;

const BUY_NFT = gql`
  mutation buyNFT(
    $offerId: Int!
    $amount: Int!
  ) {
    buyNFT(offerId: $offerId, amount: $amount) {
      id
    }
  }
`;

const NFT = {
  buy: function(chainId, offerId, quantity) {
    return new Promise(async(resolve, reject) => {
      // API initialization.
      const API = await createApolloClient();

      // We get the updated offer information.
      const { data: { offer }, networkStatus } = await API.query({
        query: GET_OFFER_BY_ID,
        variables: {
          id: Number(offerId)
        }
      });

      // Error if the offer cannot be obtained
      if (networkStatus === NetworkStatus.error) {
        return reject(new Error('Unable to get current offer.'));
      }

      // Error if offer has changed to INACTIVE status during checkout.
      if (offer.state === offerStatesId.INACTIVE) {
        return reject(new Error('The offer is already inactive'));
      }

      // Error if the number of available NFTs has changed and is less than requested.
      if (quantity > offer.quantity) {
        return reject(new Error('The offer no longer has the required quantity'));
      }

      // We initialize Web3
      const web3 = new Web3(window.ethereum);

      const {
        methods: {
          sellERC1155
        }
      } = new web3.eth.Contract(NFTMarketplace, Addresses[chainId].NFTMarketplace);

      const buyLength = (offer.message.length / 2) - 1;
      const paramLength = web3.utils.asciiToHex(buyLength.toString());

      const buyItem = sellERC1155(offer.message, paramLength, Number(quantity), offer.fingerprint);
      const price = offer.price * quantity;

      const isEthereum = currencyTypesData[offer.currency.id].code === currencyTypesData[currencyTypesId.ETH].code;

      console.log({ isEthereum });

      if (!isEthereum) {
        const {
          methods: {
            allowance,
            approve
          }
        } = new web3.eth.Contract(IERC20, currencyTypesData[offer.currency.id].code);

        const allowedAmountFx = await allowance(window.ethereum.selectedAddress, Addresses[chainId].NFTMarketplace);
        console.log({ allowedAmountFx });

        const allowedAmount = await allowedAmountFx.call({
          from: window.ethereum.selectedAddress
        });

        console.log({ allowedAmount });

        if (web3.utils.toWei(price.toString()) > allowedAmount) {
          const approveFx = await approve(Addresses[chainId].NFTMarketplace, web3.utils.toWei(price.toString()));
          const tx = approveFx.send({
            from: window.ethereum.selectedAddress
          });

          console.log(tx);
        }
      }

      const tx = await buyItem.send({
        from: window.ethereum.selectedAddress,
        value: isEthereum ? web3.utils.toWei(price.toString()) : 0
      });

      const { networkStatus: buyNetworkStatus } = await API.query({
        query: BUY_NFT,
        variables: {
          offerId: offer.id,
          amount: Number(quantity)
        }
      });

      if (buyNetworkStatus === NetworkStatus.error) {
        /* Critical error: You have made the purchase but it has not been transacted.
           Evaluate how this error can be considered, and to what extent it can be resolved. */
      }

      resolve(true);
    });
  }
};

export default NFT;
