import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    type: String!
    description: String!
  }

  type Character {
    id: ID!
    name: String!
    items: [Item]!
  }

  type Location {
    id: ID!
    name: String!
    items: [Item]!
  }

  type Query {
    items: [Item]
    characters: [Character]
    locations: [Location]
  }
`;