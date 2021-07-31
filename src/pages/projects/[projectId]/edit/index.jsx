// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import MarkdownEditForm from '@components/forms/edit-projects/MarkdownEditForm';
import SectionTitle from '@components/titles/SectionTitle';

// API
import { EDIT_PROJECT } from '@api/project';
import createApolloClient from '../../../../../apollo.client';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

function EditMyProject({ project }) {
  const [editProject] = useMutation(EDIT_PROJECT);

  // Hooks
  const { account, chainId } = useWeb3React();
  const sign = usePersonalSign();

  const onEditMarkdown = useCallback(async(values, formikHelpers, actionButtonRef) => {
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
              document: values.document
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
    <EditMyProjectTemplate project={project} title={`${project.title} - Edit information`}>
      <SectionTitle
        title={'The details of your idea matter.'}
        description={'Describe your idea so that players and investors can know about it.'}>
        <PageMargin>
          <MarkdownEditForm
            onSubmit={onEditMarkdown}
            document={project.document}
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
      document
      photoUrl
      createdAt
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
