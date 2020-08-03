const Project = require('../models/Project.model.js');
const { promisify } = require('../helpers.js');

const resolvers = {
    projects: (args) => promisify(Project.find(members.includes(args.UserId))),
    project: (args) => promisify(Project.findById(args.id)),
};

module.exports=resolvers;