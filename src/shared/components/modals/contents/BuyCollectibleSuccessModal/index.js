// Dependencies
import React, { useCallback } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

// Assets
import SuccessfullyLottie from '../../../../assets/lotties/sucessfully.json';

// Components
import BaseModalContainer from '../../BaseModalContainer';
import Button from '@components/buttons/MainButton';

// Styled Components
import { Container, SubTitle, Title } from '@styled-components/modals';
import { Body, styles } from './styles';
import { Medium } from '@styled-components/text';

function BuyCollectibleSuccessModal({
  data: {
    projectId,
    amount = 1
  },
  closeModal
}) {
  const router = useRouter();

  const goToMyInventory = useCallback(() => {
    router.push('/inventory');
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
					<Title>You have just buy {amount} collectible(s)</Title>
					<SubTitle>
						You will now be able to <Medium>sell</Medium> or <Medium>rent</Medium> your collectible, and you will be able to see it in your inventory.
					</SubTitle>
					<Button
						onClick={goToMyInventory}
						customStyleContainer={styles.button}
						caption={'See my inventory'}
					/>
				</Body>
			</Container>
		</BaseModalContainer>
  );
}

export default BuyCollectibleSuccessModal;
