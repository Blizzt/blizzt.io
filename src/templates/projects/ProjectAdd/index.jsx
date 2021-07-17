// Dependencies
import React, { useCallback, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

// Styled Components
import { PageContainer, PageMargin } from '@styled-components/pagination';

// Components
import AddProjectForm from '@components/forms/AddProjectForm';

// API:
import ProjectAPI from '@api/project';

// Types
import { modalTypesId } from '@types/ui';

// Context
import { ThemeContext } from '@styled-components/index';
import AuthLayout from '@layouts/AuthLayout';
import PageLayout from '@layouts/PageLayout';

function ProjectAddTemplate() {
  // Get Hooks
  const {
    chainId,
    account
  } = useWeb3React();

  // Context
  const { openModal } = useContext(ThemeContext);

  const onAddProject = useCallback(async({ values: project, formikHelpers, actionButtonRef }) => {
    formikHelpers.setSubmitting(true);
    actionButtonRef.changeToLoading('Adding project...');

    try {
      const response = await ProjectAPI.create(project, { account, chainId });

      if (response && response.statusCode === 201) {
        const { data: { _id } } = response;
        actionButtonRef.changeToComplete('Project successfully created!');

        openModal(modalTypesId.CREATE_MY_PROJECT_SUCCESS, {
          projectId: _id
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [chainId, account, openModal]);

  return (
    <PageLayout title={'Create a project'}>
      <PageContainer>
        <PageMargin>
          <AddProjectForm onSubmit={onAddProject} />
        </PageMargin>
      </PageContainer>
    </PageLayout>
  );
}

export default ProjectAddTemplate;
