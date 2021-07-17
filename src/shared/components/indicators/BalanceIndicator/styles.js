// Dependencies
import styled from 'styled-components';
import { common } from '@styled-components/common';

export const Layout = styled.div`
	display: flex;
	align-items: center;
	background-color: ${common.colors.PRIMARY_LIGHT};
	padding: 8px 12px;
	border-radius: 4px;
`;

export const Token = styled.div`
	margin-right: 8px;
`;

export const CoinIcon = styled.img`
	width: 22px;
`;

export const Count = styled.span`
	font-family: ${common.fonts.MEDIUM};
	font-size: 14px;
	color: ${common.colors.PRIMARY};
`;
