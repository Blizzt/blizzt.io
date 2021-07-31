// Dependencies
import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import usePersonalSign from '@hooks/usePersonalSign';
import { verifyMessage } from '@ethersproject/wallet';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import BasicEditForm from '@components/forms/edit-projects/BasicEditForm';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// API
import { EDIT_PROJECT } from '@api/project';
import createApolloClient from '../../../../../apollo.client';

function EditMyProjectDetails({ project }) {
  const [editProject] = useMutation(EDIT_PROJECT);

  // Hooks
  const { account, chainId } = useWeb3React();
  const sign = usePersonalSign();

  const onEditProjectDetails = useCallback(async(values, formikHelpers, actionButtonRef) => {
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
              title: values.title,
              photoUrl: values.photoUrl,
              categoryId: values.categoryId,
              description: values.description
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
      title={`${project.title} - Edit project details`}>
      <SectionTitle
        title={'Basic information about your project'}
        description={'From here you can modify all the essential information about your project, such as its name, cover image and more.'}>
        <PageMargin>
          <BasicEditForm
            project={project}
            initialValues={{
              title: project.title,
              photoUrl: project.photoUrl,
              categoryId: project.category.id,
              description: project.description
            }}
            onSubmit={onEditProjectDetails}
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
      description
      photoUrl
      createdAt

      category {
        id
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

export default EditMyProjectDetails;
