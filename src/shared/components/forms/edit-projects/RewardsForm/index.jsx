// Dependencies
import React, { useRef } from 'react';
import { useFormik } from 'formik';

// Styled Components
import { Layout, styles } from './styles';
import { Medium } from '@styled-components/text';

// Components
import FormColumn from '@components/forms/components/FormColumn';
import FormFooter from '@components/forms/components/FormFooter';
import InputFile from '@components/inputs/InputFile';
import NumberInput, { numberInputType } from '@components/inputs/NumberInput';
import InputText from '@components/inputs/TextInput';
import InputCollectibleProperties from '@components/inputs/InputCollectibleProperties';
import Button, { buttonTypesId } from '@components/buttons/MainButton';

// Hooks
import useFormValidation from '../../../../hooks/useFormValidation';

// Validation
import validationSchema from './validation';

// Types
import { imageAspectRatio } from '@types/images';

function RewardsForm({ onSubmit = () => {}, onCancel = () => {}, projectId }) {
  // Ref
  const actionButtonRef = useRef(null);

  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      photo: null,
      amount: 100,
      externalUrl: `https://blizzt.io/projects/${projectId}`,
      properties: []
    },
    validationSchema,
    onSubmit: (values, formikActions) => {
      onSubmit(values, formikActions, actionButtonRef.current);
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
  	<>
			<Layout onSubmit={formik.handleSubmit}>
				<FormColumn
					title={'Name of item or collectible'}
					paragraphs={[
					  'Indicate the name of the item you are going to add, try to make it as simple and concise as possible so that it is easy to understand.',
					  'It can be a collectible or an object that you will be able to use in your game.',
						<Medium key={'1'}>Some examples of this would be &quot;Legendary Sword&quot;</Medium>,
						'It also indicates a brief and not too long description of the item or collectible.'
					]}
					fields={[
						<InputText
							key={'name'}
							label={'Name'}
							placeholder={'Legendary Sword'}
							maxLength={100}
							error={getErrorFromField('name')}
							onChangeText={name => changeValue('name', name)}
							value={formik.values.name}
						/>,
						<InputText
							key={'description'}
							label={'Description'}
							textarea
							error={getErrorFromField('description')}
							placeholder={'Legendary sword forged by the dwarves of Morrowind'}
							maxLength={2000}
							onChangeText={description => changeValue('description', description)}
							value={formik.values.description}
						/>
					]}
				/>
				<FormColumn
					title={'Reference web site'}
					paragraphs={[
					  'Indicate a link that will be used to reference your project on the blockchain.',
						<Medium key={'1'}>By default the link of your project within Blizzt will be used, but if you want you are free to add a custom website.</Medium>
					]}
					fields={[
						<InputText
							key={'external-url'}
							label={'External URL'}
							placeholder={`https://blizzt.io/projects/${projectId}`}
							error={getErrorFromField('externalUrl')}
							onChangeText={externalUrl => changeValue('externalUrl', externalUrl)}
							value={formik.values.externalUrl}
						/>
					]}
				/>
				<FormColumn
					title={'Photo of the collectible'}
					paragraphs={[
					  'Add a photo that represents your item and/or shows the game in-game.',
					  'The dimensions allowed are 360x360 pixels and cannot exceed 1 MB in total size.',
						<Medium key={'2'}>Pro Tip: Using transparencies will give you visual advantages within Blizzt.</Medium>
					]}
					fields={[
						<InputFile
							key={'1'}
							aspectRatio={imageAspectRatio.ONE}
							error={getErrorFromField('name')}
							onChange={({ file }) => changeValue('photo', file)}
						/>
					]}
				/>
				<FormColumn
					title={'Value and quantity'}
					paragraphs={[
					  'You can indicate the amount of emissions of this NFT and its price for all elements.',
						<Medium key={'1'}>Pro Tips: The less quantity there is of an item the more exclusive it will be considered by the public, so it would make more sense and reason for its value to be higher.</Medium>
					]}
					fields={[
						<NumberInput
							key={'amount'}
							type={numberInputType.COUNT}
							value={formik.values.amount}
							placeholder={'100'}
							label={'Amount of collectibles'}
							error={getErrorFromField('amount')}
							onChangeText={amount => changeValue('amount', amount)}
						/>
					]}
				/>
				<FormColumn
					title={'Collectible properties'}
					vertical={true}
					paragraphs={[
					  'Properties are basically metadata in which the user can store information within the NFT.',
					  'The metadata can be either a text, a number or a boolean.',
					  'They are useful if for example you want to add some classification of the collectible, such as rarity or a status.',
					  'You can also store information that you could use within your project to enhance the usability of the collectible.'
					]}
					fields={[
						<InputCollectibleProperties
							key={'properties'}
							properties={formik.values.properties}
							onChange={properties => changeValue('properties', properties)}
						/>
					]}
				/>
			</Layout>
			<FormFooter
				actions={[
				  !formik.isSubmitting && <Button
						key={'cancel'}
						onClick={onCancel}
						customStyleContainer={styles.discardButton}
						type={buttonTypesId.SECONDARY}
						caption={'Cancel'}
					/>,
					<Button
						key={'create'}
						ref={actionButtonRef}
						onClick={formik.handleSubmit}
						type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						caption={'Save collectible'}
					/>
				]}
			/>
		</>
  );
}

export default RewardsForm;
