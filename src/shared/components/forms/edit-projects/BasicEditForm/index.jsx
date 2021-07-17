// Dependencies
import React, { useMemo, useRef } from 'react';
import { useFormik } from 'formik';

// Styled Components
import {
  Layout,
  Body
} from './styles';
import { Medium } from '@styled-components/text';

// Types
import { categories } from '@types/categories';

// Components
import InputText from '@components/inputs/TextInput';
import MainSelector from '@components/selectors/MainSelector';
import InputFile from '@components/inputs/InputFile';
import FormColumn from '@forms-components/FormColumn';
import FormFooter from '@forms-components/FormFooter';
import Button, { buttonTypesId } from '@components/buttons/MainButton';

// Hooks
import useFormValidation from '../../../../hooks/useFormValidation';

// Assets
import { SaveOutline } from 'react-ionicons';

// Validations
import validationSchema from './validation';
import { common } from '@styled-components/common';

function BasicEditForm({
  project,
  initialValues: {
    name,
    photo,
    categoryId,
    description
  },
  onSubmit = () => {}
}) {
  // Ref
  const actionButtonRef = useRef(null);

  // Formik
  const formik = useFormik({
    initialValues: {
    	name,
      photo,
      categoryId,
      description
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values, formikHelpers, actionButtonRef.current);
    }
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  const renderTitle = useMemo(() => (
		<FormColumn
			title={'Project title'}
			paragraphs={[
			  'Write a clear and concise title that will help people quickly understand the essence of your project.'
			]}
			fields={[
				<InputText
					key={'1'}
					label={'Name'}
					error={getErrorFromField('name')}
					placeholder={project.name}
					maxLength={32}
					value={formik.values.name}
					onChangeText={name => changeValue('name', name)}
				/>,
				<InputText
					key={'2'}
					label={'Description'}
					textarea={true}
					placeholder={project.description}
					maxLength={290}
					error={getErrorFromField('description')}
					value={formik.values.description}
					onChangeText={description => changeValue('description', description)}
				/>
			]}
		/>
  ), [project, formik.values.name, formik.values.description]);

  const renderCategory = useMemo(() => (
		<FormColumn
			title={'Project category'}
			paragraphs={[
			  'Choose the category that most closely aligns with your project.',
			  'Think of where backers may look to find it. Reach a more specific community by also choosing a subcategory.',
			  'You’ll be able to change the category and subcategory even after your project is live.'
			]}
			fields={[
				<MainSelector
					key={'1'}
					items={categories}
					selected={formik.values.categoryId}
					value={formik.values.categoryId}
					onChange={category => changeValue('categoryId', category.id)}
				/>
			]}
		/>
  ), [formik.values.categoryId]);

  const renderImage = useMemo(() => (
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
					onChange={({ file }) => {
					  changeValue('photo', file);
					}}
				/>
			]}
		/>
  ), [formik.values.photo]);

  return (
		<Layout onSubmit={formik.handleSubmit}>
			<Body>
				{renderTitle}
				{renderCategory}
				{renderImage}
			</Body>

			<FormFooter
				actions={[
					<Button
						key={'save-changes'}
						ref={actionButtonRef}
						type={isValidForm ? buttonTypesId.PRIMARY : buttonTypesId.DISABLED}
						caption={'Save Changes'}
						leftElement={(
							<SaveOutline
								width={'22px'}
								height={'22px'}
								color={common.colors.WHITE}
							/>
						)}
						onClick={formik.handleSubmit}
					/>
				]}
			/>
		</Layout>
  );
}

export default BasicEditForm;
