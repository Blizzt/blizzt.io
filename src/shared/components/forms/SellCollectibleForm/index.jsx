// Dependencies
import React, { useRef } from 'react';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

// Styles
import { Layout, styles } from './styles';
import { Medium } from '@styled-components/text';
import { FormBody } from '@styled-components/pagination';

// Types
import { currencyTypesId } from '@types/web3';

// Hooks
import useFormValidation from '@hooks/useFormValidation';

// Components
import FormColumn from '@forms-components/FormColumn';
import NumberInput, { numberInputType } from '@components/inputs/NumberInput';
import SwitchInput from '@components/switchs/SwitchInput';
import FormFooter from '@forms-components/FormFooter';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

function SellCollectibleForm({
  ownedAmount,
  handleSubmitCancel = () => {},
  onSubmit = () => {}
}) {
  // Hooks
  const actionButtonRef = useRef(null);

  // Formik
  const formik = useFormik({
    initialValues: {
      amount: 1,
      price: 0,
      currency: currencyTypesId.ETH,
      isBundlePack: false
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
              value={formik.values.amount}
              onChangeText={amount => changeValue('amount', amount)}
              placeholder={ownedAmount}
              error={getErrorFromField('amount')}
            />
          ]}
        />

        <FormColumn
          title={'Price and distribution'}
          paragraphs={[
            'You must also indicate if the price will be applied individually to each collectible or will be for a specific quantity.',
            'If you indicate that it will be individual, the price will be applied to each collectible. That is, you will issue a certain amount of individual sales of each NFT at the price you specify.',
            'Otherwise if it is a package, you will apply that price to the set of collectibles, i.e. you will sell the amount of NFTs for the price you specify.'
          ]}
          fields={[
            <NumberInput
              key={'price'}
              type={numberInputType.PRICE}
              label={formik.values.isBundlePack ? `Price for ${formik.values.amount} collectible(s)` : 'Price per unit'}
              placeholder={100}
              value={formik.values.price}
              error={getErrorFromField('price')}
              onChangeText={price => changeValue('price', price)}
              currency={formik.values.currency}
              onChangeCurrency={currency => changeValue('currency', currency)}
            />,
            <SwitchInput
              key={'isBundlePack'}
              label={'Type of distribution'}
              checked={formik.values.isBundlePack}
              valueLabel={formik.values.isBundlePack ? 'Price per package' : 'Price per unit'}
              onChange={isBundlePack => changeValue('isBundlePack', isBundlePack)}
            />
          ]}
        />
      </FormBody>

      <FormFooter
        actions={[
          !formik.isSubmitting && (
            <MainButton
              key={'decline-action'}
              type={formik.isSubmitting ? buttonTypesId.DISABLED : buttonTypesId.SECONDARY}
              caption={'Cancel'}
              onClick={handleSubmitCancel}
            />
          ),
          <MainButton
            key={'sell-action'}
            ref={actionButtonRef}
            customStyleContainer={styles.sellButton}
            isSubmitting={formik.isSubmitting}
            type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
            caption={'Start selling now'}
            onClick={formik.handleSubmit}
          />
        ]}
      />
    </Layout>
  );
}

export default SellCollectibleForm;
