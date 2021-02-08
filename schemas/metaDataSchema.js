import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type MetaData {
    _id: ID	
    name: String!
    size: Int!
    contentType: String!
    url: String!
    fields: String!
    loading: Boolean!
    error: Boolean!
  }
  
  input CreateMetaDataInput {
  	name: String!, 
  	size: Int!, 
  	contentType: String!
  }
  
  input UpdateLoadingStatusInput {
  	_id: ID, 
  	loading: Boolean!, 
  	error: Boolean!
  }
  
  type Query {
  	_empty: String
  }
	
  type Mutation {
    createMetaData(input: CreateMetaDataInput!): MetaData!
    updateLoadingStatus(input: UpdateLoadingStatusInput!): MetaData!
  }
`;

