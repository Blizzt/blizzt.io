// Dependencies
import React, { useCallback } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

// Assets
import SuccessfullyLottie from '../../../../assets/lotties/sucessfully.json';

// Components
import BaseModalContainer from '../../BaseModalContainer';
import MainButton from '@components/buttons/MainButton';

// Styled Components
import { Container, SubTitle, Title } from '@styled-components/modals';
import { Body, styles } from './styles';
import { Medium } from '@styled-components/text';

function RentCollectibleSuccessModal({
  data: {
    projectId,
		 amount = 1,
		 date = new Date()
  },
  closeModal
}) {
  const history = useRouter();

  const goToMyInventory = useCallback(() => {
    history.push('/inventory');
    closeModal();
  }, [projectId]);

  return (
		<BaseModalContainer width={'500px'}>
			<Container>
				<Player
					autoplay
					keepLastFrame={true}
					src={SuccessfullyLottie}
					style={{ height: '300px', width: '300px' }}
				/>
				<Body>
					<Title>You have just rented {amount} collectible(s)</Title>
					<SubTitle>
						It will be available until <Medium>{format(date, 'PPPp')}</Medium>
					</SubTitle>
					<MainButton
						onClick={goToMyInventory}
						customStyleContainer={styles.button}
						caption={'See my inventory'}
					/>
				</Body>
			</Container>
		</BaseModalContainer>
  );
}

export default RentCollectibleSuccessModal;
