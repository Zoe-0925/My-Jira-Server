const gql = require('graphql-tag');
//const { gql } = require('apollo-server-express');


const ProjectResolver = require("./resolvers/Project.resolver.js")

const {
   GraphQLObjectType,
   GraphQLInt,
   GraphQLString,
   GraphQLList,
   GraphQLSchema
} = require('graphql');

const ProjectType = new GraphQLObjectType({
   name: 'Project',
   fields: () => ({
      name: { type: GraphQLString },
      key: { type: GraphQLString },
      category: { type: GraphQLString },
      lead: { type: GraphQLString },
      members: { type: new GraphQLList(UserType) },
      image: { type: GraphQLString },
      issues: { type: new GraphQLList(IssueType) },
      default_assignee: { type: GraphQLString },
      start_date: { type: GraphQLString },
   })
});

const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      projects: { type: new GraphQLList(ProjectType) }
   })
});

const LabelType = new GraphQLObjectType({
   name: 'Label',
   fields: () => ({
      name: { type: GraphQLString },
   })
});

const IssueType = new GraphQLObjectType({
   name: 'Issue',
   fields: () => ({
      project:{ type: ProjectType },
      name: { type: GraphQLString },
      issueType: { type: GraphQLString },
      //enum: ['Epic', 'Task', "Subtask"]
      summary: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      //enum: ['In Progress', 'Completed', "Not Started"],
      //default: "Not Started"
      assignee: { type: UserType },
      labels: [{ type: LabelType }],
      startDate: { type: GraphQLString },
      dueDate: { type: GraphQLString },
      reporter: { type: UserType },
      parent: { type: GraphQLString },
      chilren: [{ type: GraphQLString }],
      comments: [{ type: CommentType }]
   })
});

const CommentType = new GraphQLObjectType({
   name: 'Comment',
   fields: () => ({
      author: { type: GraphQLString },
      date: { type: GraphQLString },
      description: { type: GraphQLString },
      issue: { type: IssueType }
   })
});

// Root Query
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      projects: {
         type: new GraphQLList(ProjectType),
         args: {
            id: { type: GraphQLString }
         },
         resolve(parent, args) {
            return ProjectResolver.Query.findByUserId(parent, args)
         }
      },
      projectById: {
         type: ProjectType,
         args: {
            id: { type: GraphQLString }
         },
         resolve(parent, args) {
            return ProjectResolver.Query.findOne(parent, args)
         }
      },
      epicsAndTasks: {
         type: new GraphQLList(IssueType),
         resolve(parent, args) {

            return []

         }
      },
      taskAndSubTask: {
         type: new GraphQLList(RocketType),
         args: {
            id: { type: GraphQLString }
         },

         resolve(parent, args) {

            return

         }
      },
      issueAndComments: {
         type: IssueType,
         args: {
            id: { type: GraphQLInt }
         },
         resolve(parent, args) {

            return
         }
      }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery
});

//TODO
//How do I enable create from here?!...

//type Mutation {
//   create(name: String!, key: String!, category: String, userId: String!, image: String): Project
//   update(id: ID!, name: String!, key: String!, category: String, image: String, default_assignee: String, lead: String): Project
//   delete(id: ID!): Project
//}



