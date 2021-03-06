const Project = require('../models/Project.model');
const User = require('../models/User.model');
const { promisify } = require('../helpers');

const resolvers = {
    async projects() {
        return await Project.find();
    },

    project: (_, args) => promisify(Project.findById(args.id)),
    user: (_, args) => promisify(User.findById(args.id)),
    userByEmail: (_, args) => promisify(User.find({ email: args.email })),
    userLogin: () => promisify(User.find({ email: args.email, password: args.password })),
    label: (_, args) => promisify(Label.find({ assignee: args.id })),
    epics: (_, args) => promisify(Issue.find({ assignee: args.id, issueType: "Epic" })),
    tasks: (_, args) => promisify(Issue.find({ assignee: args.id, issueType: "Task" })),
    subtasks: (_, args) => promisify(Issue.find({ assignee: args.id, issueType: "Subtask" })),
    issue: (_, args) => promisify(Issue.findById(args.id)),
};

module.exports = resolvers;


