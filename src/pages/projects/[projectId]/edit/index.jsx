// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useMutation, useQuery } from '@apollo/react-hooks';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import MarkdownEditForm from '@components/forms/edit-projects/MarkdownEditForm';
import SectionTitle from '@components/titles/SectionTitle';

// API
import { EDIT_PROJECT, GET_PROJECT_DETAILS_FOR_EDIT } from '@api/project';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

function EditMyProject({ projectId }) {
  const [editProject] = useMutation(EDIT_PROJECT);

  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_DETAILS_FOR_EDIT, {
    variables: {
      id: projectId
    }
  });

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
            id: projectId,
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
  }, [project, projectId, account, chainId]);

  if (loading) {
    return null;
  }

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

export async function getServerSideProps({ params: { projectId } }) {
  return {
    props: {
      projectId
    }
  };
}

export default EditMyProject;
