// Dependencies
import styled from 'styled-components';

export const styles = {
  discardButton: {
    marginRight: 22
  }
};

export const Layout = styled.form`
  padding-bottom: 4em;
  
  > div:last-child {
    border-bottom: none;
  }
`;

export const FormRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 32px;
	grid-row-gap: 32px;
	width: 100%;
`;
