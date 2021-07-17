
// Dependencies
import React, { useCallback } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

// Assets
import LeaderRocketLottie from '../../../../assets/lotties/leader-rocket.json';

// Components
import BaseModalContainer from '../../BaseModalContainer';
import MainButton from '@components/buttons/MainButton';

// Styled Components
import { Container, SubTitle, Title } from '@styled-components/modals';
import { Body, styles } from './styles';
import { Medium } from '@styled-components/text';

function CreateMyProjectSuccessModal({ data: { projectId }, closeModal }) {
  const history = useRouter();

  const onPressGoToProject = useCallback(() => {
    history.push(`/projects/${projectId}/edit`);
    closeModal();
  }, [projectId]);

  return (
		<BaseModalContainer width={'500px'}>
			<Container>
				<Player
					autoplay
					loop
					src={LeaderRocketLottie}
					style={{ height: '300px', width: '300px' }}
				/>
				<Body>
					<Title>Your project is ready</Title>
					<SubTitle>
						<Medium>You can start creating your NFTs</Medium> to be able to finance it, good luck!
					</SubTitle>
					<MainButton
						onClick={onPressGoToProject}
						customStyleContainer={styles.button}
						caption={'Show my Project'}
					/>
				</Body>
			</Container>
		</BaseModalContainer>
  );
}

export default CreateMyProjectSuccessModal;
