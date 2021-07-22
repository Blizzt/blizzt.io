// Dependencies
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

// Templates
import ProjectAddTemplate from '@templates/projects/ProjectAdd';

// Layouts
import AuthLayout from '@layouts/AuthLayout';

// API
import { withApollo } from '@api/apollo';
import { CREATE_PROJECT } from '@api/project';

function AddProject() {
  const [createProject, { data }] = useMutation(CREATE_PROJECT);

  return (
    <AuthLayout>
      <ProjectAddTemplate />
    </AuthLayout>
  );
}

export default withApollo({ ssr: true })(AddProject);
