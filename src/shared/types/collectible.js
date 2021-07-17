// Dependencies
import React from 'react';

// Assets
import {
  PricetagOutline,
  DuplicateOutline,
  WalletOutline,
  AlarmOutline,
  CartOutline,
  HandLeftOutline
} from 'react-ionicons';

// Utils
import { common } from '@styled-components/common';

export const gradeTypesId = {
  BASIC: 'basic',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  VERY_RARE: 'very-rare',
  EXTREMELY_RARE: 'extremely-rare',
  UNIQUE: 'unique'
};

export const gradeTypesData = {
  [gradeTypesId.BASIC]: {
    name: 'Basic Collectable',
    color: common.colors.BLACK,
    identColor: common.colors.BLACK,
    description: 'The basic grade is a collectible that has a circulation of more than 500 units. It is generally common to find this collectible for sale or rent.'
  },
  [gradeTypesId.UNCOMMON]: {
    name: 'Uncommon Collectable',
    color: common.colors.GRADE_UNCOMMON,
    identColor: common.colors.WHITE,
    description: 'The rare grade indicates that the collectible has a limited circulation, but that its quantity is between 200 to 5000. Finding collectibles with this grade is less likely than those of basic grades.'
  },
  [gradeTypesId.RARE]: {
    name: 'Rare Collectible',
    color: common.colors.RARE,
    identColor: common.colors.WHITE,
    description: 'Rare collectibles are those that have a low circulation, between 100 to 200 units. Therefore, the chances of finding them for sale or rent are more limited.'
  },
  [gradeTypesId.VERY_RARE]: {
    name: 'Very Rare Collectible',
    color: common.colors.VERY_RARE,
    identColor: common.colors.WHITE,
    description: 'These collectibles are within a limited quantity of stock, usually issued in quantities of 50 to 100 pieces.'
  },
  [gradeTypesId.EXTREMELY_RARE]: {
    name: 'Extremely Rare Collectible',
    color: common.colors.EXTREMELY_RARE,
    identColor: common.colors.WHITE,
    description: 'These collectibles are as rare as collector\'s items, the chances of finding such items are extremely low. Only 2 to 50 in total are available.'
  },
  [gradeTypesId.UNIQUE]: {
    name: 'Unique Collectible',
    color: common.colors.UNIQUE_COLLECTIBLE,
    identColor: common.colors.WHITE,
    description: 'This collectible is unique, so there is no more than 1 item issued in total. This collectible have an extreme significance for the project.'
  }
};

export const operationsId = {
  LISTING_SALE: 1, // Listado para venta
  LISTING_RENT: 2, // Listado para alquiler
  COLLECTION_CREATED: 3, // Creación de NFT
  COLLECTION_SELL: 4, // Venta NFT
  COLLECTION_DIP: 5, // Le alquilan el NFT al usuario
  COLLECTION_BUY: 6, // Compra NFT
  COLLECTION_RENT: 7 // Alquila un NFT
};

export const operationData = {
  [operationsId.LISTING_SALE]: {
    icon: (
      <PricetagOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Listing for Sale'
  },
  [operationsId.LISTING_RENT]: {
    icon: (
      <PricetagOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Listing for Rent'
  },
  [operationsId.COLLECTION_CREATED]: {
    icon: (
      <DuplicateOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Create Item'
  },
  [operationsId.COLLECTION_SELL]: {
    icon: (
      <WalletOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Sell Item'
  },
  [operationsId.COLLECTION_DIP]: {
    icon: (
      <AlarmOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Have rented'
  },
  [operationsId.COLLECTION_BUY]: {
    icon: (
      <CartOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Buy Item'
  },
  [operationsId.COLLECTION_RENT]: {
    icon: (
      <HandLeftOutline
        width={'22px'}
        height={'22px'}
      />
    ),
    label: 'Rent Item'
  }
};
