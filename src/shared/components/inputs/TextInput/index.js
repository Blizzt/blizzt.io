// Dependencies
import React, { useCallback } from 'react';

// Styled Components
import {
  Icon,
  Label,
  Input,
  Layout,
  TextArea,
  Container,
  Description,
  KeyIndicator,
  KeyIndicatorLabel,
  MaxLengthIndicator
} from './styles';

// Components
import FormErrorText from '@forms-components/FormErrorText';

// Assets
import { EnterOutline } from 'react-ionicons';

// Utils
import { common } from '@styled-components/common';

export default function InputText({
  label,
  description,
  placeholder,
  icon = null,
  onPressEnter = () => {},
  value = '',
  maxLength = null,
  textarea = false,
  onChangeText = () => {},
  withKeyIndicator = false,
  keyIndicatorText = null,
  error = null,
  customStyleContainer = {},
  customStyleInput = {},
  disabled = false
}) {
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      onPressEnter();
    }
  }, []);

  return (
		<Layout disabled={disabled}>
			{label && <Label>{label}</Label>}
			{description && <Description>{description}</Description>}
			<Container style={customStyleContainer}>
        {icon && (
          <Icon>
            {icon}
          </Icon>
        )}
				{textarea ? <TextArea
            withIcon={!!icon}
            style={customStyleInput}
						placeholder={placeholder}
						maxLength={maxLength}
						value={value ?? ''}
						onKeyDown={onKeyDown}
            disabled={disabled}
						onChange={e => onChangeText(e.target.value)}
					/> : <Input
            withIcon={!!icon}
            style={customStyleInput}
						placeholder={placeholder}
						maxLength={maxLength}
						value={value ?? ''}
						onKeyDown={onKeyDown}
            disabled={disabled}
						onChange={e => onChangeText(e.target.value)}
					/>
				}
				{maxLength && (
					<MaxLengthIndicator textarea={textarea}>{value.length}/{maxLength}</MaxLengthIndicator>
				)}
			</Container>
      {error && <FormErrorText text={error} />}
			{(withKeyIndicator && keyIndicatorText) && (
				<KeyIndicator>
					<KeyIndicatorLabel>{keyIndicatorText}</KeyIndicatorLabel>
					<EnterOutline
            width={'16px'}
            height={'16px'}
            color={common.colors.PRIMARY}
          />
				</KeyIndicator>
			)}
		</Layout>
  );
}
