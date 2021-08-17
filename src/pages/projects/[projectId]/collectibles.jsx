// Dependencies
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';

// Templates
import ProjectDetailsTemplate from '@templates/projects/ProjectDetails';

// Components
import RewardsList from '@components/lists/RewardsList';

// API
import createApolloClient from '../../../../apollo.client';

function ProjectDetailsCollectibles({ project }) {
  // Hooks
  const router = useRouter();

  /**
   * @function onClickCollectible():
   * @description Function that is triggered by pressing edit collectible.
   */
  const onClickCollectible = useCallback((item) => {
    router.push(`/projects/${project.id}/${item.nftId}`);
  }, []);

  console.log({ project });

  return (
    <ProjectDetailsTemplate
      project={project}
      title={`${project.name} - Collectibles`}
    >
      <RewardsList
        collectibles={project.nfts}
        onClick={onClickCollectible}
      />
    </ProjectDetailsTemplate>
  );
}

export const GET_PROJECT_COLLECTIBLES = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      title
      description
      photoUrl
      createdAt

      nfts {
        nftId
        IPFSAddress
        metadata
        mintedAmount


        latestOffers {
          forRent {
            id
            price
            
            fiat {
              usd
            }

            currency {
              id
            }
          }
          
          forSale {
            id
            price

            fiat {
              usd
            }

            currency {
              id
            }
          }
        }
      }

      creator {
        id
        address
        username
        photoUrl
      }
    }
  }
`;

export async function getServerSideProps({ params: { projectId } }) {
  const client = createApolloClient();
  const { data: { project } } = await client.query({
    query: GET_PROJECT_COLLECTIBLES,
    variables: {
      projectId
    }
  });

  return {
    props: {
      project
    }
  };
}

export default ProjectDetailsCollectibles;
