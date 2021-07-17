// Dependencies
import React from 'react';

// Assets
import {
  SearchOutline
} from 'react-ionicons';

// Styled Components
import {
  Layout,
  Icon,
  Input
} from './styles';

function SearchInput() {
  return (
		<Layout>
			<Icon>
				<SearchOutline
					width={'20px'}
					height={'20px'}
				/>
			</Icon>
			<Input
				placeholder={'Search projects o items'}
			/>
		</Layout>
  );
}

export default SearchInput;
