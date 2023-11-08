// Mutations unlike Queries are to change the existing data

import { gql } from '@apollo/client';

// The reason for the profile related mutations to have the book objects is because books will always be associated along with profile information

// For signing up

export const ADD_PROFILE = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addProfile(username: $username, email: $email, password: $password) {
    token
    profile {
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
}
`;

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    profile {
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
}
`;

// In order to add a book you need prfile information

export const ADD_BOOK = gql`
mutation AddBook($profileId: ID!, $book: BookInput!) {
  addBook(profileId: $profileId, book: $book) {
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

// 

export const REMOVE_PROFILE = gql`
mutation RemoveProfile($profileId: ID!) {
  removeProfile(profileId: $profileId) {
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

export const REMOVE_BOOK = gql`
mutation RemoveBook($book: String!) {
  removeBook(book: $book) {
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

