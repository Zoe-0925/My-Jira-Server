const User = require("../models").users;

exports.UserType = gql`
   type User {
  name: String!
  email: String!
  password: String
 }
`
