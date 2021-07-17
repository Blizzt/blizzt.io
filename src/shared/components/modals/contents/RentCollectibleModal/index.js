
// Dependencies
import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { addDays, differenceInHours, format, fromUnixTime } from 'date-fns';

// Components
import Button, { buttonTypesId } from '@components/buttons/MainButton';
import BaseModalContainer from '../../BaseModalContainer';
import NumberInput, { numberInputType } from '@components/inputs/NumberInput';
import InfoList from '@components/lists/InfoList';

import MainImage from '../../../images/MainImage';
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
import useFormValidation from '../../../../hooks/useFormValidation';
import InputDate from '../../../inputs/InputDate';

function RentCollectibleModal({ closeModal, data: { onSubmit, item } }) {
  const formik = useFormik({
    initialValues: {
      amount: 1,
      date: addDays(new Date(), 1)
    },
    validate: async(values) => {
      try {
        const validationSchema = Yup.object().shape({
          amount: Yup.number()
            .min(1, 'The amount cannot be less than 1.')
            .max(item.amount, `The amount cannot be more than ${item.amount}.`)
            .required('You must enter a valid amount'),

          date: Yup.date()
            .min(new Date())
            .max(new Date(fromUnixTime(item.expirationDate)), 'The rental date cannot exceed the expiration date.')
            .required('You must enter a valid date')
        });

        await validateYupSchema(values, validationSchema, true);
      } catch (err) {
        return yupToFormErrors(err);
      }
    },
    onSubmit: (values, formikActions) => {
    	formik.setSubmitting(true);
      onSubmit(values, formikActions);
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  const currentTransaction = useMemo(() => {
    const totalHours = differenceInHours(formik.values.date, new Date()) + 1;
    const price = Number(item.price);
    return {
    	total: parseFloat((totalHours * price) * formik.values.amount).toFixed(6),
      hours: totalHours
    };
  }, [formik.values.amount, formik.values.date]);

  return (
		<BaseModalContainer
			width={'580px'}
			onClickClose={closeModal}
			title={'Rent collectible'}
		>
			<Container padding={'2em'}>
				<Summary>
					<Picture>
						<MainImage radius={8} source={item.image} aspectRatio={imageAspectRatio.ONE} />
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
							    label: 'Collectible expiration',
							    value: format(fromUnixTime(item.expirationDate), 'PPpp')
							  }
							]}
						/>
					</Data>
				</Summary>
				<Field>
					<NumberInput
						label={'How many collectibles do you want to rent?'}
						placeholder={'1'}
						type={numberInputType.COUNT}
						value={formik.values.amount}
						error={getErrorFromField('amount')}
						onChangeText={amount => changeValue('amount', amount)}
					/>
				</Field>
				<Field>
					<InputDate
						label={'Even when you want them?'}
						error={getErrorFromField('date')}
						datePickerProps={{
						  dateFormat: 'MM/dd/yyyy - hh:mm',
						  showTimeSelect: true,
						  minDate: new Date(),
						  selected: formik.values.date,
						  onChange: (date) => changeValue('date', date)
						}}
					/>
				</Field>

				{(isValidForm && formik.values.date) && (
					<Transaction>
						<InfoList
							data={[
							  {
							    label: 'Amount of collectibles',
							    value: formik.values.amount
							  },
							  {
							    label: 'Ending date',
							    value: format(formik.values.date, 'PPpp')
							  },
							  {
							    label: 'Number of hours',
							    value: currentTransaction.hours
							  },
							  {
							    label: 'Price per hour',
							    value: item.price
							  },
							  {
							    label: 'Total cost',
							    value: currentTransaction.total
							  }
							]}
						/>
					</Transaction>
				)}

				<Actions>
					<Button
						type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						isSubmitting={formik.isSubmitting}
						caption={'Rent collectible'}
						onClick={formik.handleSubmit}
					/>
				</Actions>

			</Container>
		</BaseModalContainer>
  );
}

export default RentCollectibleModal;
