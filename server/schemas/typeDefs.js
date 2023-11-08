

const typeDefs = `

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    photos: [Photo]
  }

  type Auth {
    token: String!
  }

  type Query {
    me(userId:ID!): User
    comments: Comment
    photos: Photo
  }

  type Photo {
    title: String!
    photoId: String!
    description: String!
    imagelink: String!
    date: String!
    comments: [Comment]
  }

  type Comment {
    editPhoto: String
    user: String!
    date: String!
    text: String!
    likes: Int!
    dislikes: Int!
    commentId: String!
  }

  input userInput {
    _id: ID
    name: String!
    email: String!
    password: String!
    photos: [String]
  }

  input photoInput {
    title: String!
    description: String!
    imagelink: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(name: String!, email: String!, password: String!): Auth

    addPhoto(photo: photoInput!): User

    removePhoto(photoId: ID!): User

    addComment(photoId: ID!, comment: String!): Photo

    removeComment(photoId: ID!, commentId: ID!): Photo
  }

`

module.exports = typeDefs;
