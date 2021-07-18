// Dependencies
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

// Styled Components
import {
  Layout,
  ListContainer,
  Header,
  Block,
  Title,
  Paragraph,
  FormContainer,
  BackDrop
} from './styles';
import { PageMargin } from '@styled-components/pagination';
import { common } from '@styled-components/common';

// Components
import RewardsForm from '@components/forms/edit-projects/RewardsForm';
import RewardsList from '@components/lists/RewardsList';
import MainButton, { buttonTypesId } from '@components/buttons/MainButton';

// Assets
import { AddOutline } from 'react-ionicons';

export const modeTypesId = {
  CREATION_MODE: 'creation-mode',
  VIEWING_MODE: 'viewing-mode'
};

function RewardsEditContainer({ project, handleNFTCreationSubmit }) {
  // Refs
  const creationForm = useRef(null);

  // States
  const [mode, setMode] = useState(modeTypesId.VIEWING_MODE);

  // Memos
  const isCreativeMode = useMemo(() => mode === modeTypesId.CREATION_MODE, [mode]);

  // React Spring
  const backdropStyle = useSpring({
    visibility: isCreativeMode ? 'visible' : 'hidden',
    opacity: isCreativeMode ? 1 : 0
  });

  const creationFormStyle = useSpring({
    opacity: isCreativeMode ? 1 : 0,
    display: isCreativeMode ? 'block' : 'none'
  });

  /**
	 * @name onClickCreateNFT
	 * @description Event that runs when you press create NFT.
	 */
  const onClickCreateNFT = useCallback(() => {
    setMode(modeTypesId.CREATION_MODE);
    setTimeout(() => {
      window.scrollTo({
        top: creationForm.current.offsetTop - 80,
        behavior: 'smooth'
      });
    }, 100);
  }, [creationForm]);

  const onClickCollectible = useCallback((collectible) => {
    // router.push(`/projects/${project._id}/${collectible.nftId}`);
  }, []);

  const onSubmitCollectible = useCallback(async(collectible, formikHelpers, actionButtonRef) => {
    handleNFTCreationSubmit(collectible, formikHelpers, actionButtonRef, setMode);
  }, [setMode]);

  /**
	 * @name handleNFTCreationCancel
	 * @description Discard NFT creation.
	 */
  const handleNFTCreationCancel = useCallback(() => {
    setMode(modeTypesId.VIEWING_MODE);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
  	<Layout mode={mode}>
			<BackDrop style={backdropStyle} />
      <PageMargin>
        <ListContainer>
          <Header>
            <Block>
              <Title>NFTs are the base of your financing.</Title>
              <Paragraph>A non-fungible token or NFT is a special type of cryptographic token that represents something unique.</Paragraph>
              <Paragraph>Create your own unique NFTs so that they can function as investment collectibles to develop your idea with more resources.</Paragraph>
              <Paragraph>In the future, you can use these tokens interactively and integrate them into your project to enrich your content and provide usefulness to investors.</Paragraph>
            </Block>
            <Block dir={'right'}>
              <MainButton
                type={isCreativeMode ? buttonTypesId.DISABLED : buttonTypesId.PRIMARY}
                leftElement={
                  <AddOutline
                    width={'22px'}
                    height={'22px'}
                    color={isCreativeMode ? common.colors.GRAY_MEDIUM : common.colors.WHITE}
                  />
                }
                caption={'Add collectibles to my project'}
                onClick={onClickCreateNFT}
              />
            </Block>
          </Header>
          <RewardsList
            onClick={onClickCollectible}
            collectibles={project.collectibles}
          />
        </ListContainer>
      </PageMargin>
			{isCreativeMode && (
				<FormContainer style={creationFormStyle} ref={creationForm}>
					<PageMargin>
            <RewardsForm
              projectId={project._id}
              onSubmit={onSubmitCollectible}
              onCancel={handleNFTCreationCancel}
            />
					</PageMargin>
				</FormContainer>
			)}
		</Layout>
  );
}

export default RewardsEditContainer;
