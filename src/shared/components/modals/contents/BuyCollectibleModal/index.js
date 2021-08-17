
// Dependencies
import React, { useMemo, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NumberFormat from 'react-number-format';
import { useWeb3React } from '@web3-react/core';

// Components
import BaseModalContainer from '@components/modals/BaseModalContainer';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';
import NumberInput, { numberInputType } from '@components/inputs/NumberInput';
import InfoList from '@components/lists/InfoList';
import Image from '@components/images/MainImage';

// Types
import { imageAspectRatio } from '@types/images';

// Styled Components
import {
  Actions,
  Summary,
  Data,
  Picture,
  Field,
  Transaction
} from './styles';
import { Container } from '@styled-components/modals';

// Hooks
import useFormValidation from '@hooks/useFormValidation';

// Operations
import NFT from '@contracts/operations/NFT';

function BuyCollectibleModal({ closeModal, data: { offer, collectible } }) {
  // Hooks
  const actionButtonRef = useRef(null);

  const { chainId } = useWeb3React();

  const formik = useFormik({
    initialValues: {
      quantity: ''
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number()
        .min(1, 'The amount cannot be less than 1.')
        .max(offer.quantity, `The amount cannot be more than ${offer.quantity}.`)
        .required('You must indicate the amount to buy')
    }),
    onSubmit: ({ quantity }, formikActions) => {
    	formik.setSubmitting(true);
      actionButtonRef.current.changeToLoading('Executing transaction');

      NFT.buy(chainId, offer.id, quantity).then(() => {
        actionButtonRef.current.changeToComplete('NFT Successfully Acquired');
      }).catch((e) => {
      	console.error(e);
        actionButtonRef.current.changeToError('Operation failed');
      });
    }
  });

  const currentTransaction = useMemo(() => {
    return parseFloat((offer.price * formik.values.quantity).toString());
  }, [offer.price, formik.values.quantity]);

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
		<BaseModalContainer
			width={'580px'}
			onClickClose={closeModal}
			title={'Buy collectible'}
		>
			<Container padding={'2em'}>
				<Summary>
					<Picture>
						<Image radius={8} source={collectible.image} aspectRatio={imageAspectRatio.ONE} />
					</Picture>
					<Data>
						<InfoList
							data={[
							  {
							    label: 'Collectible Name',
							    value: collectible.name
							  },
							  {
							    label: 'Quantity Available',
							    value: offer.quantity
							  },
							  {
							    label: 'Price',
							    value: offer.price
							  }
							]}
						/>
					</Data>
				</Summary>
				<Field>
					<NumberInput
						label={'How many collectibles do you want to buy?'}
						placeholder={'Type amount here'}
						type={numberInputType.COUNT}
						value={formik.values.quantity}
						error={getErrorFromField('quantity')}
						onChangeText={quantity => changeValue('quantity', quantity)}
					/>
				</Field>

				{(isValidForm) && (
					<Transaction>
						<InfoList
							data={[
							  {
							    label: 'Amount of collectibles',
							    value: formik.values.quantity
							  },
							  {
							    label: 'Total cost',
							    value: (
										<NumberFormat
											value={currentTransaction}
											displayType={'text'}
											thousandSeparator={true}
										/>
							    )
							  }
							]}
						/>
					</Transaction>
				)}

				<Actions>
					<MainButton
						ref={actionButtonRef}
						type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						isSubmitting={formik.isSubmitting}
						caption={'Buy collectible'}
						onClick={formik.handleSubmit}
					/>
				</Actions>

			</Container>
		</BaseModalContainer>
  );
}

export default BuyCollectibleModal;
