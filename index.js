const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./app/loggers/logger")
const requestLogger = require("./app/loggers/requestLogger")
const expressRequestId = require('express-request-id')();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const {typeDefs} = require('./app/GraphQLSchemas/Schema.js');
const resolvers = require("./app/resolvers/Project.resolver.js")
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

var winston = require('winston');
require('winston-timer')(winston);


mongoose.connect(`mongodb+srv://${process.env.USERNAME}:<${process.env.PASSWORD}>@cluster0-8vkls.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

require("./app/routes/Project.routes")(app);

app.use(expressRequestId);

app.use(cors({
  origin: "http://localhost:3000"
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});



// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use(requestLogger);

//Add 404 not found 
app.use((req, res) => {
  return res.status(404).render("404", {
    title: "404"
  });
});

//Prevent displaying the error trace to the user
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  console.error(error)
  return res.status(500).render("500", {
    title: "500"
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT).on("listening", () => {
  logger.info(`Server is running on port ${PORT}.`);
});



//Syntax for winston timer:
//winston.start_log('long-running-task', 'info'); 
/* ... */
//winston.stop_log('long-running-task', 'warn');



