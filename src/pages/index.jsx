// Dependencies
import React from 'react';
import useSWR from 'swr';

// Templates
import MainTemplate from '@templates/MainTemplate';

function Main() {
  const { data: latestProjects } = useSWR('/projects');

  return (
    <MainTemplate
      title={'Blizzt.io | Blockchain Technology for Developers and Gamers'}
      latestProjects={latestProjects}
    />
  );
}

export default Main;
