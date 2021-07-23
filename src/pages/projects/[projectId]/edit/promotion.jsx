// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useMutation, useQuery } from '@apollo/react-hooks';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import PromotionEditForm from '@components/forms/edit-projects/PromotionEditForm';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

// API
import { EDIT_PROJECT, GET_PROJECT_DETAILS_FOR_EDIT } from '@api/project';

function EditMyProject({ projectId }) {
  const [editProject] = useMutation(EDIT_PROJECT);

  console.log({ projectId });

  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_DETAILS_FOR_EDIT, {
    variables: {
      id: projectId
    }
  });

  // Web3
  const { account, chainId } = useWeb3React();
  const sign = usePersonalSign();

  const onEditPromotion = useCallback(async(values, formikHelpers, actionButtonRef) => {
    try {
      // 1. Signature Message
      const dataToSign = 'You are about to make changes to your project, so we need to verify your identity. Please sign this message to continue.';
      const signature = await sign(dataToSign);

      // 2. Verify Data Signed and Signature
      if (verifyMessage(dataToSign, signature) === account) {
        editProject({
          variables: {
            id: projectId,
            data: {
              isPublic: values.isPublic,
              details: {
                web: values.web,
                kickstarter: values.kickstarter,
                steam: values.steam,
                playstation: values.playstation,
                xbox: values.xbox,
                android: values.android,
                ios: values.ios,
                twitch: values.twitch,
                youtube: values.youtube,
                facebook: values.facebook,
                twitter: values.twitter,
                instagram: values.instagram,
                vk: values.vk,
                discord: values.discord,
                reddit: values.reddit,
                telegram: values.telegram
              }
            }
          }
        }).then(() => {
          actionButtonRef.changeToComplete('Changes are saved');
          formikHelpers.resetForm({
            values,
            isValidating: false
          });
        });
      } else {
        return new Error({
          code: 1,
          message: 'Not authorized'
        });
      }
    } catch (e) {
      switch (e.code) {
        case 4001: {
          actionButtonRef.changeToError('Signature rejected');
          formikHelpers.setSubmitting(false);
          break;
        }
        default: {
          actionButtonRef.changeToError('Changes not applied');
          formikHelpers.setSubmitting(false);
          break;
        }
      }
    }
  }, [projectId, project, account, chainId]);

  if (loading) {
    return null;
  }

  return (
    <EditMyProjectTemplate
      project={project}
      title={`${project.title} - Edit promotion`}
    >
      <SectionTitle
        title={'Basic information about your project'}
        description={'From here you can modify all the essential information about your project, such as its name, cover image and more.'}>
        <PageMargin>
          <PromotionEditForm
            onSubmit={onEditPromotion}
            project={project}
          />
        </PageMargin>
      </SectionTitle>
    </EditMyProjectTemplate>
  );
}

export async function getServerSideProps({ params: { projectId } }) {
  return {
    props: {
      projectId
    }
  };
}

export default EditMyProject;
