// Dependencies
import React from 'react';
import DatePicker from 'react-datepicker';

// Styled Components
import {
  Label,
  Layout
} from './styles';

// Components
import FormErrorText from '@forms-components/FormErrorText';

function InputDate({
  label,
  error,
  datePickerProps = {}
}) {
  return (
		<Layout>
			<Label>
				{label}
			</Label>
			<DatePicker {...datePickerProps} />
			{error && <FormErrorText text={error} />}
		</Layout>
  );
}

export default InputDate;
