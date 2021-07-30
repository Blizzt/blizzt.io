
// Dependencies
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

// Assets
import Successfully from '../../../../assets/lotties/sucessfully.json';

// Components
import Button from '@components/buttons/MainButton';
import BaseModalContainer from '../../BaseModalContainer';

// Styled Components
import { Container, SubTitle, Title } from '@styled-components/modals';
import { Body, Action } from './styles';
import { Medium } from '@styled-components/text';

function SellMyCollectibleSuccessModal({ closeModal }) {
  // Hooks
  const { query, push } = useRouter();

  return (
		<BaseModalContainer width={'500px'}>
			<Container>
				<Player
					autoplay
					keepLastFrame={true}
					src={Successfully}
					style={{ height: '300px', width: '300px' }}
				/>
				<Body>
					<Title>Your collectible has been put up for sale.</Title>
					<SubTitle>
						Now other people <Medium>can buy it</Medium> and you can generate income with it
					</SubTitle>

					<Action>
						<Button
							caption={'Continue'}
							onClick={async() => {
							  closeModal();
							  await push(`/projects/${query.projectId}/${query.nftId}`);
							}}
						/>
					</Action>

				</Body>
			</Container>
		</BaseModalContainer>
  );
}

export default SellMyCollectibleSuccessModal;
