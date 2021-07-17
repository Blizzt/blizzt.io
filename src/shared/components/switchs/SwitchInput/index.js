// Dependencies
import React from 'react';

// Styles
import {
  Layout,
  Title,
  Input,
  Label,
  Indicator,
  Inline,
  Description
} from './styles';

function SwitchInput({
  checked,
  label,
  valueLabel,
  onChange,
  description = null
}) {
  return (
		<Layout active={checked}>
			<Title>{label}</Title>
      {description && <Description>{description}</Description>}
			<Inline>
				<Input onClick={() => onChange(!checked)}>
					<Indicator />
				</Input>
				<Label>
					{valueLabel}
				</Label>
			</Inline>
		</Layout>
  );
}

export default SwitchInput;
