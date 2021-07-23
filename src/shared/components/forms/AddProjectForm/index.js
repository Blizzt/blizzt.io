// Dependencies
import React, { useRef } from 'react';
import { useFormik } from 'formik';

// Styled Components
import {
  Actions,
  Layout
} from './styles';
import { Medium } from '@styled-components/text';
import { common } from '@styled-components/common';

// Assets
import { ArrowForward } from 'react-ionicons';

// Hooks
import useFormValidation from '../../../hooks/useFormValidation';

// Components
import MainSelector from '@components/selectors/MainSelector';
import Button, { buttonTypesId } from '@components/buttons/MainButton';
import FormColumn from '@forms-components/FormColumn';
import InputText from '@components/inputs/TextInput';
import InputFile from '@components/inputs/InputFile';
import Fetch from '@components/utils/Fetch';

// Validations
import validationSchema from './validation';
import { GET_ALL_CATEGORIES } from '@api/category';

function CreateProjectForm({
  onSubmit = () => {}
}) {
  // Refs
  const actionButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryId: null,
      photo: null
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
    	onSubmit({ values, formikHelpers, actionButtonRef: actionButtonRef.current });
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
		<Layout onSubmit={formik.handleSubmit}>
			<FormColumn
				title={'Project Name'}
				paragraphs={[
				  'Enter the name and description of your project.',
				  'Try to be concise and direct in your project description so that your audience can easily understand your idea.'
				]}
				fields={[
					<InputText
						key={'name'}
						label={'Name'}
						isSubmitting={formik.isSubmitting}
						value={formik.values.name}
						error={getErrorFromField('name')}
						maxLength={50}
						placeholder={'The Elders Scrolls VII'}
						onChangeText={name => changeValue('name', name)}
					/>,
					<InputText
						key={'description'}
						textarea={true}
						label={'Description'}
						isSubmitting={formik.isSubmitting}
						placeholder={'Open-world RPG game enriched with artificial intelligence and Unreal Engine 5.'}
						value={formik.values.description}
						error={getErrorFromField('description')}
						maxLength={1000}
						onChangeText={description => changeValue('description', description)}
					/>
				]}
			/>
			<FormColumn
				title={'Project category'}
				paragraphs={[
				  'Choose the appropriate category to which your project belongs.',
				  'Categorizing your project will make it easier for you to reach the right audience and increase your chances of getting investors to fund you.'
				]}
				fields={[
					<Fetch
						key={'category'}
						gql={GET_ALL_CATEGORIES}
						onRender={({ categories }) => (
							<>
								<MainSelector
									key={'category'}
									items={categories}
									isSubmitting={formik.isSubmitting}
									error={getErrorFromField('categoryId')}
									selected={formik.values.categoryId}
									onChange={category => changeValue('categoryId', category.id)}
								/>
							</>
						)}
					/>
				]}
			/>
			<FormColumn
				title={'Project image'}
				paragraphs={[
				  'Add an image that clearly represents your project. Choose one that looks good at different sizes — it’ll appear on your project page, across the Blizzt website and mobile apps, and (when shared) on social channels.',
					<Medium key={'1'}>Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.</Medium>,
					'Avoid images with banners, badges, or text — they are illegible at smaller sizes, can be penalized by the Facebook algorithm, and decrease your chances of getting Blizzt homepage and newsletter features.'
				]}
				fields={[
					<InputFile
						key={'1'}
						error={getErrorFromField('photo')}
						value={formik.values.photo}
						isSubmitting={formik.isSubmitting}
						onChange={({ file }) => {
						  changeValue('photo', file);
						}}
					/>
				]}
			/>
			<Actions>
				<Button
					ref={actionButtonRef}
					type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
					caption={formik.values.name.length > 1 ? `Let's start with — ${formik.values.name}` : 'Create Project'}
					onClick={formik.handleSubmit}
					rightElement={
						<ArrowForward
							width={'22px'}
							height={'22px'}
							color={isValidForm && !formik.isSubmitting ? common.colors.WHITE : common.colors.GRAY_MEDIUM}
						/>
					}
				/>
			</Actions>
		</Layout>
  );
}

export default CreateProjectForm;
