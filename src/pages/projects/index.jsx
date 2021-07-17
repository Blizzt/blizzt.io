// Dependencies
import React from 'react';
import useSWR from 'swr';

// Templates
import ProjectsTemplate from '@templates/projects/Projects';

function Projects() {
  const { data: projects } = useSWR('/projects');

  return (
    <ProjectsTemplate projects={projects} />
  );
}

export default Projects;
