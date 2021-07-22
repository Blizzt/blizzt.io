import gql from 'graphql-tag';

export const OBTAIN_USER_FROM_WALLET = gql`
  mutation ObtainUserFromWallet($wallet: String!) {
    obtainUserFromWallet(wallet: $wallet) {
     token,
      user {
        id
        address
        username
        photoUrl
        role
        
        projects {
          title
          description
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      address
      username
      role
      photoUrl
    }
  }
`;
