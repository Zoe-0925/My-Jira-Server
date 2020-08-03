const Comment = require('../models/Comment.model.js');
const { promisify } = require('../helpers.js');

const resolvers = {
    Comment: (args) => promisify(Comment.find({ issueId: args.id })),
};

module.exports=resolvers;