
// Dependencies
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Loader from 'react-loader-spinner';

// Assets
import CapitalInvestment from '@assets/lotties/capital-investment.json';

// Components
import BaseModalContainer from '../../BaseModalContainer';

// Styled Components
import { Container, SubTitle, Title } from '@styled-components/modals';
import { Body, LoadContainer } from './styles';
import { Medium } from '@styled-components/text';

// Config
import { common } from '@styled-components/common';

function CreateMyCollectibleProcessModal() {
  return (
		<BaseModalContainer width={'500px'}>
			<Container>
				<Player
					autoplay
					loop
					src={CapitalInvestment}
					style={{ height: '300px', width: '300px' }}
				/>
				<Body>
					<Title>We are creating your collectible</Title>
					<SubTitle>
						This process may take some time, <Medium>thank you for your patience.</Medium>
					</SubTitle>

					<LoadContainer>
						<Loader
							width={22}
							type="Oval"
							height={22}
							color={common.colors.PRIMARY}
						/>
					</LoadContainer>
				</Body>
			</Container>
		</BaseModalContainer>
  );
}

export default CreateMyCollectibleProcessModal;
