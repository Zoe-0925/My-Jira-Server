const Project = require('../models/Project.model.js');
const { promisify } = require('../helpers.js');


const resolvers = {
    userProjects: (args) => promisify(Project.find({ "members.id": args.id })),
};

module.exports=resolvers;