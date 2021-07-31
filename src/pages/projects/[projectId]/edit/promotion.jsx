// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useMutation } from '@apollo/react-hooks';

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
import { EDIT_PROJECT } from '@api/project';
import createApolloClient from '../../../../../apollo.client';
import gql from 'graphql-tag';

function EditMyProject({ project }) {
  const [editProject] = useMutation(EDIT_PROJECT);

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
            id: project.id,
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
  }, [project, account, chainId]);

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

export const GET_PROJECT_DETAILS = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      photoUrl
      createdAt
      isPublic
      
      details {
        web
        kickstarter
        steam
        playstation
        xbox
        android
        ios
        twitch
        youtube
        facebook
        twitter
        instagram
        vk
        discord
        reddit
        telegram
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId } }) {
  const client = createApolloClient();
  const { data: { project } } = await client.query({
    query: GET_PROJECT_DETAILS,
    variables: {
      id: projectId
    }
  });

  return {
    props: {
      project
    }
  };
}

export default EditMyProject;
