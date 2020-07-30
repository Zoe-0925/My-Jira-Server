const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error：'));

var Schema = mongoose.Schema;
var model = mongoose.model
db.projects = require("./Project.model.js")(Schema, model);
db.users = require("./User.model.js")(Schema, model);
db.labels = require("./Label.model.js")(Schema, model);
db.epics = require("./Epic.model.js")(Schema, model);
db.tasks = require("./Task.model.js")(Schema, model);
db.subtasks = require("./Subtask.model.js")(Schema, model);

module.exports = db;



