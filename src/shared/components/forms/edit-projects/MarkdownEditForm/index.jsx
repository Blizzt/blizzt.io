// Dependencies
import React, { useMemo, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { useFormik } from 'formik';

// Assets
import {
  CreateOutline,
  EyeOutline,
  DocumentsOutline,
  SaveOutline
} from 'react-ionicons';

// Styled Components
import {
  Layout,
  Header,
  Grid,
  Column,
  ColumnTitle,
  Body
} from './styles';

// Components
import MainToggle from '../../../toggles/MainToggle';
import MarkdownViewContainer from '@containers/MarkdownViewContainer';
import FormFooter from '@components/forms/components/FormFooter';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

// Types
import { viewModeTypesId } from './types';

// Utils
import { common } from '@styled-components/common';

// Hooks
import useFormValidation from '../../../../hooks/useFormValidation';

// Validation
import validationSchema from './validationSchema';

function MarkdownEditForm({
  onSubmit = () => {},
  document = ''
}) {
  // Ref
  const actionButtonRef = useRef(null);

  // Modes
  const [currentViewMode, changeViewMode] = useState(viewModeTypesId.DUAL_MODE);

  // Form
  const formik = useFormik({
    initialValues: {
      document: document || ''
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values, formikHelpers, actionButtonRef.current);
    }
  });

  const [isValidForm, changeValue] = useFormValidation(formik);

  const renderEditingViewMode = useMemo(() => (
  	<>
			<ColumnTitle>Markdown</ColumnTitle>
			<MDEditor
				preview={'edit'}
				height={620}
				extraCommands={[]}
				textareaProps={{
				  placeholder: 'Start writing what your project looks like.'
				}}
				value={formik.values.document}
				onChange={text => changeValue('document', text)}
			/>
		</>
  ), [formik.values.document]);

  const renderViewingMode = useMemo(() => (
  	<>
			<ColumnTitle>Preview</ColumnTitle>
			<MarkdownViewContainer document={formik.values.document} />
		</>
  ), [formik.values.document]);

  const renderViewingCanvas = useMemo(() => {
  	switch (currentViewMode) {
      case viewModeTypesId.DUAL_MODE:
        return (
					<Grid>
						<Column>
							{renderEditingViewMode}
						</Column>
						<Column>
							{renderViewingMode}
						</Column>
					</Grid>
        );

      case viewModeTypesId.VIEWING_MODE:
        return renderViewingMode;

      case viewModeTypesId.EDITING_MODE:
  		default:
  			return renderEditingViewMode;
    }
  }, [currentViewMode, formik.values.document]);

  return (
  	<Layout onSubmit={formik.handleSubmit}>
			<Header>
				<MainToggle
					onClickOption={changeViewMode}
					initialActiveIndex={1}
					elements={[
					  {
					    icon: (
								<CreateOutline
									width={'22px'}
									height={'22px'}
								/>
					    ),
					    value: viewModeTypesId.EDITING_MODE
					  },
					  {
					    icon: (
								<DocumentsOutline
									width={'22px'}
									height={'22px'}
								/>
					    ),
					    value: viewModeTypesId.DUAL_MODE
					  },
					  {
					    icon: (
								<EyeOutline
									width={'22px'}
									height={'22px'}
								/>
					    ),
					    value: viewModeTypesId.VIEWING_MODE
					  }
					]}
				/>
			</Header>
			<Body>
				{renderViewingCanvas}
			</Body>

			<FormFooter
				actions={[
					<MainButton
						ref={actionButtonRef}
						key={'save-changes'}
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

export default MarkdownEditForm;
