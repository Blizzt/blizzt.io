// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import SectionTitle from '@components/titles/SectionTitle';
import PromotionEditForm from '@components/forms/edit-projects/PromotionEditForm';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// API
import ProjectAPI from '@api/project';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

function EditMyProject(props) {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = null, mutate } = useSWR(`/projects/${projectId}`, { initialData: props.project });

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
  }, [projectId, project, account, chainId]);

  return (
    <EditMyProjectTemplate
      project={project}
      title={`${project.name} - Edit promotion`}
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
  const { data: project } = await ProjectAPI.getById(projectId);
  return {
    props: {
      project
    }
  };
}

export default EditMyProject;
