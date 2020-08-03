const { makeExecutableSchema } = require('graphql-tools');
const Project = require('./resolvers/Project.resolver.js');
const Query = require('./resolvers/Query.resolver.js');
const User = require('./resolvers/User.resolver.js');
const Issue = require('./resolvers/Issue.resolver.js');
//const Label = require('./resolvers/Label.resolver.js');
const ISODate = require('./scalars/ISODate');

const typeDefs = `
type Query {
    projects(query: UserId!): [Project]
    project(id: ID!): Project
    userLogin(query: UserAccount!): User
    user(id: ID!):User
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
    epics:[Issue]
    default_assignee: String
    start_date: String
  }

  type User{
    _id: ID!
    name: String!
    email: String!
    projects: Array
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
    startDate: String
    dueDate: String
    reporter: User
    parent: Issue,
    chilren: [Issue],
    comments: [Comment],
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

module.exports= makeExecutableSchema({ typeDefs, resolvers });

