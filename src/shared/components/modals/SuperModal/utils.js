// Types
import { modalTypesId } from '@types/ui';

// Modals
import RentCollectibleModal from '../contents/RentCollectibleModal';
import RentCollectibleSuccessModal from '../contents/RentCollectibleSuccessModal';

import SellMyCollectibleSuccessModal from '../contents/SellMyCollectibleSuccessModal';
import RentMyCollectibleSuccessModal from '../contents/RentMyCollectibleSuccessModal';

import CreateMyCollectibleProcessModal from '../contents/CreateMyCollectibleProcessModal';
import CreateMyProjectSuccessModal from '../contents/CreateMyProjectSuccessModal';

import BuyCollectibleModal from '../contents/BuyCollectibleModal';
import BuyCollectibleSuccessModal from '../contents/BuyCollectibleSuccessModal';

export const getModalById = contentId => {
  switch (contentId) {
    case modalTypesId.RENT_COLLECTIBLE:
      return RentCollectibleModal;

    case modalTypesId.RENT_COLLECTIBLE_SUCCESS:
      return RentCollectibleSuccessModal;

    case modalTypesId.SELL_MY_COLLECTIBLE_SUCCESS:
      return SellMyCollectibleSuccessModal;

    case modalTypesId.RENT_MY_COLLECTIBLE_SUCCESS:
      return RentMyCollectibleSuccessModal;

    case modalTypesId.CREATE_MY_PROJECT_SUCCESS:
      return CreateMyProjectSuccessModal;

    case modalTypesId.CREATE_MY_COLLECTIBLE_PROCESS:
      return CreateMyCollectibleProcessModal;

    case modalTypesId.BUY_COLLECTIBLE:
      return BuyCollectibleModal;

    case modalTypesId.BUY_COLLECTIBLE_SUCCESS:
      return BuyCollectibleSuccessModal;

    default:
      return null;
  }
};
