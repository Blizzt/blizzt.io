// Dependencies
import React, { useCallback, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

// Styled Components
import { PageContainer, PageMargin } from '@styled-components/pagination';

// Components
import AddProjectForm from '@components/forms/AddProjectForm';

// Types
import { modalTypesId } from '@types/ui';

// Context
import { ThemeContext } from '@styled-components/index';

// Layouts
import PageLayout from '@layouts/PageLayout';

function ProjectAddTemplate({ createProject = () => {} }) {
  const {
    chainId,
    account
  } = useWeb3React();

  // Context
  const { openModal } = useContext(ThemeContext);

  const onAddProject = useCallback(({ values: project, formikHelpers, actionButtonRef }) => {
    formikHelpers.setSubmitting(true);
    actionButtonRef.changeToLoading('Adding project...');

    createProject({
      variables: {
        title: project.name,
        categoryId: project.categoryId,
        description: project.description,
        photo: project.photo
      }
    }).then(({ data: { createProject: project } }) => {
      actionButtonRef.changeToComplete('Project successfully created!');
      openModal(modalTypesId.CREATE_MY_PROJECT_SUCCESS, {
        projectId: project.id
      });
    }).catch(() => {
      actionButtonRef.changeToError('Project not created');
    });
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
