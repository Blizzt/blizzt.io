// Dependencies
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { addMonths } from 'date-fns';

// Styles
import { Layout, styles } from './styles';
import { Medium } from '@styled-components/text';
import { FormBody } from '@styled-components/pagination';

// Components
import FormColumn from '@forms-components/FormColumn';
import FormFooter from '@forms-components/FormFooter';
import NumberInput, { numberInputType } from '@components/inputs/NumberInput';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

// Hooks
import useFormValidation from '../../../hooks/useFormValidation';

// Validation
import InputDate from '../../inputs/InputDate';

// Types
import { currencyTypesId } from '@types/web3';

function RentCollectibleForm({
  ownedAmount,
  onCancel = () => {},
  onSubmit = () => {}
}) {
  // Hooks
  const actionButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      amount: 1,
      price: '',
      currency: currencyTypesId.ETH,
      until: addMonths(new Date(), 1)
    },
    validate: async(values) => {
      try {
        const validationSchema = Yup.object().shape({
          amount: Yup.number()
            .typeError(`You must enter a number between 1 and ${ownedAmount}`)
            .positive('You must enter a number greater than 1')
            .min(1, 'The amount cannot be less than 1')
            .max(ownedAmount, `The amount cannot be more than ${ownedAmount}`)
            .required('You must enter a valid amount'),

          price: Yup.number()
            .min(0.000001, 'The price cannot be less than 0.000001')
            .required('You must enter a valid price'),

          until: Yup.date()
            .min(new Date(), 'The date is invalid, please enter an appropriate date')
            .required('You must enter a valid date'),

          currency: Yup.string()
            .oneOf([currencyTypesId.ETH, currencyTypesId.DAI, currencyTypesId.USDT, currencyTypesId.BLIZ])
        });

        await validateYupSchema(values, validationSchema, true);
      } catch (err) {
        return yupToFormErrors(err);
      }
    },
    onSubmit: (values, formikHelpers) => {
      onSubmit({ values, formikHelpers, actionButtonRef: actionButtonRef.current });
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
    <Layout onSubmit={formik.handleSubmit}>
      <FormBody>
        <FormColumn
          title={'Quantity of collectibles'}
          paragraphs={[
            'Type the quantity of collectibles you are going to offer for sale.',
            <Medium key={'available'}>The maximum number of collectibles you have available is: {ownedAmount}</Medium>
          ]}
          fields={[
            <NumberInput
              key={'amount'}
              type={numberInputType.COUNT}
              label={'Quantity'}
              error={getErrorFromField('amount')}
              value={formik.values.amount}
              onChangeText={amount => changeValue('amount', amount)}
              placeholder={ownedAmount}
            />
          ]}
        />

        <FormColumn
          title={'Price and distribution'}
          paragraphs={[]}
          fields={[
            <NumberInput
              key={'price'}
              type={numberInputType.PRICE}
              label={'Price per hour'}
              placeholder={0.50}
              value={formik.values.price}
              error={getErrorFromField('price')}
              onChangeText={price => changeValue('price', price)}
              currency={formik.values.currency}
              onChangeCurrency={currency => changeValue('currency', currency)}
            />,
            <InputDate
              key={'expiration-date'}
              label={'Until when do you want to rent it?'}
              error={getErrorFromField('maxExpirationDate')}
              datePickerProps={{
                minDate: new Date(),
                selected: formik.values.until,
                onChange: (until) => changeValue('until', until)
              }}
            />
          ]}
        />
      </FormBody>

      <FormFooter
        actions={[
          (!formik.isSubmitting && (
            <MainButton
              key={'decline-action'}
              type={buttonTypesId.SECONDARY}
              caption={'Cancel'}
              onClick={onCancel}
            />
          )),
          <MainButton
            key={'rent-action'}
            ref={actionButtonRef}
            customStyleContainer={styles.rentButton}
            isSubmitting={formik.isSubmitting}
            type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
            caption={'Start renting now'}
            onClick={formik.handleSubmit}
          />
        ]}
      />
    </Layout>
  );
}

export default RentCollectibleForm;
