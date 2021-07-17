// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	
	.react-datepicker__input-container {
    border: 1px solid ${common.colors.GRAY_SEMI_LIGHT};
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    position: relative;
		padding: 0 !important;
		background-color: ${common.colors.WHITE};
		box-shadow: none;
	}

  .react-datepicker__input-container > input {
    border: 0;
    padding: 14px;
    font-size: 16px;
		background: transparent;
		width: 100%;
		outline: none;
	}
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: ${common.fonts.MEDIUM};
	padding-bottom: 10px;
`;
