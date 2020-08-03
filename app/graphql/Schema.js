const { makeExecutableSchema } = require('graphql-tools');
const Project = require('../resolvers/Project.resolver.js');
const Query = require('../resolvers/Query.resolver.js');
const User = require('../resolvers/User.resolver.js');
const Issue = require('../resolvers/Issue.resolver.js');
//const Label = require('./resolvers/Label.resolver.js');
const ISODate = require('../scalars/ISODate');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    project(id: ID!): Project
    user(id: ID!):User
    userLogin(query: UserAccount!): User
    label(id: ID!):[Label]
    epics(id: ID!):[Issue]
    tasks(id: ID!):[Issue]
    subtasks(id: ID!):[Issue]
    issue(id: ID!):Issue
  }

  type Project {
    _id: ID!
    name: String!
    key: String!
    category: String
    lead:User
    members:[User]
    image:String
    issues:[Issue]
    default_assignee: String
    start_date: ISODate
  }

  type User{
    _id: ID!
    name: String!
    email: String!
    password: String!
    projects:[Project]
  }

  type Label{
    _id: ID! 
    name: String
  }

  type Issue{
    _id: ID! 
    project:Project
    summary: String
    issueType: String
    description: String
    status: String
    assignee: User
    labels: [Label]
    startDate: ISODate
    dueDate: ISODate
    reporter: User
    parent: Issue,
    chilren: [Issue],
    comments: [Comment],
  }

type Comment{
  _id: ID! 
  author:User!
  description: String!
  date: ISODate
  issue:Issue
}

  input UserInput {
      id: String! 
      name:String
      email:String!
      password:String!
  }

  input IssueInput{
      userId: String!
      issueType:String!
      summary: String!
      labels:[String]
      description:[String]
  }

  input CommentInput{
      author:String!
      description:String!
      issue:String!
  }

  input UserId{
    id: String! 
  }

  input UserAccount{
    email: String! 
    password:String!
  }

  input UserEmail{
    email: String! 
  }

  scalar ISODate
`
//TODO
//Add mutation
const resolvers = { Query, Project, Issue, User, ISODate };

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
})


