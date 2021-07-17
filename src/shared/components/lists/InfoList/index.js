// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Column,
  Row,
  Separator,
  Label,
  Value
} from './styles';

function InfoList({ data = [] }) {
  return (
		<Layout>
			{data.map((item, index) => (
				<Column key={`--info-list-index-${index.toString()}`}>
					<Row>
						<Label>{item.label}</Label>
					</Row>
					<Separator />
					<Row>
						<Value>{item.value}</Value>
					</Row>
				</Column>
			))}
		</Layout>
  );
}

export default InfoList;
