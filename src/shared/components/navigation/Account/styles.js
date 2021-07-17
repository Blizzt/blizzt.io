// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 22px;
	
  align-items: center;
	position: relative;
`;

export const ImageSource = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 6px;
  overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
  margin-right: 8px;
`;

export const ProfileAction = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;
