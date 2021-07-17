
// Dependencies
import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

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

function BuyCollectibleModal({ closeModal, data: { onSubmit, item } }) {
  const formik = useFormik({
    initialValues: {
      amount: '1'
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .min(1, 'The amount cannot be less than 1.')
        .max(item.amount, `The amount cannot be more than ${item.amount}.`)
        .required('You must indicate the amount to buy')
    }),
    onSubmit: (values, formikActions) => {
    	formik.setSubmitting(true);
      onSubmit(values, formikActions);
    }
  });

  const currentTransaction = useMemo(() => {
    return parseFloat((item.price * formik.values.amount).toString()).toFixed(6);
  }, [item.price, formik.values.amount]);

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
						<Image radius={8} source={item.image} aspectRatio={imageAspectRatio.ONE} />
					</Picture>
					<Data>
						<InfoList
							data={[
							  {
							    label: 'Collectible Name',
							    value: item.name
							  },
							  {
							    label: 'Quantity Available',
							    value: item.amount
							  },
							  {
							    label: 'Price',
							    value: item.price
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
						value={formik.values.amount}
						error={getErrorFromField('amount')}
						onChangeText={amount => changeValue('amount', amount)}
					/>
				</Field>

				{(isValidForm) && (
					<Transaction>
						<InfoList
							data={[
							  {
							    label: 'Amount of collectibles',
							    value: formik.values.amount
							  },
							  {
							    label: 'Total cost',
							    value: currentTransaction
							  }
							]}
						/>
					</Transaction>
				)}

				<Actions>
					<MainButton
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
