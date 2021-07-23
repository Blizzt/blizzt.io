// Dependencies
import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import usePersonalSign from '@hooks/usePersonalSign';
import { verifyMessage } from '@ethersproject/wallet';
import { useMutation, useQuery } from '@apollo/react-hooks';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import BasicEditForm from '@components/forms/edit-projects/BasicEditForm';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// API
import { EDIT_PROJECT, GET_PROJECT_DETAILS_FOR_EDIT } from '@api/project';

function EditMyProjectDetails({ projectId }) {
  const [editProject] = useMutation(EDIT_PROJECT);

  const { data: { project } = {}, loading } = useQuery(GET_PROJECT_DETAILS_FOR_EDIT, {
    variables: {
      id: projectId
    }
  });

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
            id: projectId,
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
  }, [project, projectId, account, chainId]);

  if (loading) {
    return null;
  }

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

export async function getServerSideProps({ params: { projectId } }) {
  return {
    props: {
      projectId
    }
  };
}

export default EditMyProjectDetails;
