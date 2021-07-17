// Dependencies
import React from 'react';

// Templates
import ProjectAddTemplate from '@templates/projects/ProjectAdd';

// Layouts
import AuthLayout from '@layouts/AuthLayout';

function AddProject() {
  return (
    <AuthLayout>
      <ProjectAddTemplate />
    </AuthLayout>
  );
}

export default AddProject;
