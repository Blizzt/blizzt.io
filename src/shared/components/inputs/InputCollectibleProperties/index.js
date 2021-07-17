// Dependencies
import React, { useMemo } from 'react';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

// Styled Components
import {
  Header,
  Layout,
  List,
  PropertyTitle,
  Item,
  ListHead,
  Row,
  InputRow,
  MessageItem,

  styles
} from './styles';

// Components
import InputText from '../TextInput';

// Hooks
import useFormValidation from '../../../hooks/useFormValidation';

function InputCollectibleProperties({ onChange = () => {}, properties = [] }) {
  const formik = useFormik({
    initialValues: {
      key: '',
      name: '',
      value: '',
      maxValue: ''
    },
    validate: async(values) => {
      try {
        const validationSchema = Yup.object().shape({
          key: Yup.string()
            .min(1, 'The key cannot be less than 1.')
            .required('You must enter a valid key'),

          name: Yup.string()
            .min(1, 'The name cannot be less than 1.')
            .required('You must enter a valid name'),

          value: Yup.string()
            .min(1, 'The value cannot be less than 1.')
            .required('You must enter a valid value'),

          maxValue: Yup.string()
            .min(1, 'The max value cannot be less than 1.')
        });

        await validateYupSchema(values, validationSchema, true);
      } catch (err) {
        return yupToFormErrors(err);
      }
    },
    onSubmit: (values, formikHelpers) => {
      const newProperties = properties;
      newProperties.push({
        type: getValueType,
        key: values.key,
        name: values.name,
        value: values.value,
        maxValue: values.maxValue
      });

      onChange(newProperties);
      formikHelpers.resetForm();
    }
  });

  const getValueType = useMemo(() => {
    const value = formik.values.value;

    if (value === 'false' || value === 'true') {
      return 'boolean';
    } else if (!isNaN(parseInt(value))) {
      return 'number';
    } else {
      return 'text';
    }
  }, [formik.values.value]);

  const [, changeValue] = useFormValidation(formik);

  const renderHeader = useMemo(() => (
  	<Header>
			<PropertyTitle>Number of Properties: {properties.length}</PropertyTitle>
		</Header>
  ), [properties.length]);

  const renderInput = useMemo(() => (
  	<>
			<Item type={'footer'}>
				<InputRow type={'type'}>{getValueType}</InputRow>
				<InputRow type={'key'}>
					<InputText
						value={formik.values.key}
						placeholder={'TYPE_ASSOC_KEY'}
						maxLength={32}
						onPressEnter={formik.handleSubmit}
						onChangeText={key => changeValue('key', key)}
						customStyleContainer={styles.inputTextContainer}
						customStyleInput={{ ...styles.inputTextInput, ...styles.inputCode }}
					/>
				</InputRow>
				<InputRow type={'label'}>
					<InputText
						value={formik.values.name}
						placeholder={'Property Name'}
						onChangeText={name => changeValue('name', name)}
						maxLength={16}
						onPressEnter={formik.handleSubmit}
						customStyleContainer={styles.inputTextContainer}
						customStyleInput={styles.inputTextInput}
					/>
				</InputRow>
				<InputRow type={'value'} dataType={'boolean'}>
					<InputText
						value={formik.values.value}
						placeholder={'Value'}
						maxLength={16}
						onPressEnter={formik.handleSubmit}
						onChangeText={value => changeValue('value', value)}
						customStyleContainer={styles.inputTextContainer}
						customStyleInput={{ ...styles.inputTextInput, ...styles.inputValue }}
					/>
				</InputRow>
				<InputRow type={'value'} dataType={'boolean'}>
					<InputText
						value={formik.values.maxValue}
						placeholder={'Max value'}
						maxLength={16}
						onPressEnter={formik.handleSubmit}
						onChangeText={maxValue => changeValue('maxValue', maxValue)}
						customStyleContainer={styles.inputTextContainer}
						disabled={getValueType !== 'number'}
						customStyleInput={{ ...styles.inputTextInput, ...styles.inputValue }}
					/>
				</InputRow>
			</Item>
			<MessageItem>
				<InputRow type={'message'}>
					When you have filled in the 3 fields, press the ENTER key to add it to the list.
				</InputRow>
			</MessageItem>
		</>
  ), [getValueType, formik.values.name, formik.values.key, formik.values.value, formik.values.maxValue]);

  const renderList = useMemo(() => (
  	<List>
			<ListHead>
				<Row type={'head'}>Type</Row>
				<Row type={'head'}>Assoc. Key</Row>
				<Row type={'head'}>Name</Row>
				<Row type={'head'}>Value</Row>
				<Row type={'head'}>Other Value</Row>
			</ListHead>
			{properties.map((property, index) => (
				<Item key={`--property-item-${index.toString()}`}>
					<Row type={'type'}>{property.type}</Row>
					<Row type={'key'}>{property.key}</Row>
					<Row type={'label'}>{property.name}</Row>
					<Row type={'value'} dataType={property.type}>{property.value}</Row>
					<Row type={'value'} dataType={property.type}>{property.maxValue}</Row>
				</Item>
			))}
			{renderInput}
		</List>
  ), [renderInput, properties]);

  return (
		<Layout>
			{renderHeader}
			{renderList}
		</Layout>
  );
}

export default InputCollectibleProperties;
