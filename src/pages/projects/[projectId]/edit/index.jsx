// Dependencies
import React, { useCallback } from 'react';
import { verifyMessage } from '@ethersproject/wallet';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Templates
import EditMyProjectTemplate from '@templates/projects/ProjectEdit';

// Components
import MarkdownEditForm from '@components/forms/edit-projects/MarkdownEditForm';
import SectionTitle from '@components/titles/SectionTitle';

// API
import ProjectAPI from '@api/project';

// Styled Components
import { PageMargin } from '@styled-components/pagination';

// Hooks
import usePersonalSign from '@hooks/usePersonalSign';

function EditMyProject(props) {
  // Hooks
  const router = useRouter();
  const { projectId } = router.query;

  // Project Data
  const { data: project = {}, mutate } = useSWR(`/projects/${projectId}`, { initialData: props.project });

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
        await mutate(`/projects/${projectId}`, {
          ...project,
          document: values.document
        }, false);

        const response = await ProjectAPI.edit(project._id, {
          document: values.document,
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

  return (
    <EditMyProjectTemplate project={project} title={`${project.name} - Edit information`}>
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
  const { data: project } = await ProjectAPI.getById(projectId);
  return {
    props: {
      project
    }
  };
}

export default EditMyProject;
