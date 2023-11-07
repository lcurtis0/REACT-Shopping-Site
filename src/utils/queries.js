
// Queries unlike Mutations are to find and read the model data

import { gql } from '@apollo/client';

// To use useQuery we must use gql from the @apollo/client library. This parses the queries to be read by other files

// This will be for general profiles 

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
      password
      email
      books {
        title
        bookId
        authors
        description
        image
        link
      }
    }
  }
`;

// To get a single profile
// Used for saved books specific to that profile

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
      email
      password
      books {
        title
        bookId
        authors
        description
        image
        link
      }
    }
`;

// Having the single book

// export const QUERY_BOOK = gql`
//   query book($bookId: ID!){
//     book($bookId: ID!) {
//       _id
//       title
//     }
//   }
// `;

// For representing the user and their books

export const USER = gql`
query User {
  user {
    _id
    username
    email
    password
    books {
      title
      bookId
      authors
      description
      image
      link
    }
  }
}
`;
 