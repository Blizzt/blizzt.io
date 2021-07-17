// Dependencies
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import usePersonalSign from '@hooks/usePersonalSign';
import { verifyMessage } from '@ethersproject/wallet';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import BasicEditForm from '@components/forms/edit-projects/BasicEditForm';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// API
import ProjectAPI from '@api/project';

function EditMyProjectDetails() {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = null, mutate } = useSWR(`/projects/${projectId}`);

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
        await mutate(`/projects/${projectId}`, {
          ...project,
          ...values
        }, false);

        const response = await ProjectAPI.edit(project._id, {
          ...values,
          signature,
          dataToSign
        });

        if (response && response.statusCode === 200) {
          actionButtonRef.changeToComplete('Changes are saved');

          formikHelpers.resetForm({
            values,
            isValidating: false
          });
        }

        await mutate(`/projects/${projectId}`);
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
        case 1: {
          actionButtonRef.changeToError(e.message);
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

  if (!project) {
    return null;
  }

  return (
    <EditMyProjectTemplate
      project={project}
      title={`${project.name} - Edit project details`}>
      <SectionTitle
        title={'Basic information about your project'}
        description={'From here you can modify all the essential information about your project, such as its name, cover image and more.'}>
        <PageMargin>
          <BasicEditForm
            project={project}
            initialValues={{
              name: project.name,
              photo: project.photo,
              categoryId: project.categoryId,
              description: project.description
            }}
            onSubmit={onEditProjectDetails}
          />
        </PageMargin>
      </SectionTitle>
    </EditMyProjectTemplate>
  );
}

export default EditMyProjectDetails;
