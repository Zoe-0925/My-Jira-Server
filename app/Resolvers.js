const Project = require('./models/Project.model.js');
const User = require('./models/User.model.js');
const Label = require('./models/Label.model.js');
const Issue = require('./models/Issue.model.js');
const { promisify } = require('./helpers');

const resolvers = {
    projects: (_, args) => promisify(Project.find(members.includes(args.UserId))),
    project: (_, args) => promisify(Project.findById(args.id)),
    userLogin: () => promisify(User.find({ email: args.email, password: args.password })),
    user: (_, args) => promisify(User.findById(args.id)),
    label: (_, args) => promisify(Label.find({ userId: args.id })),
    epics: (_, args) => promisify(Issue.find({ userId: args.id, issueType: "Epic" })),
    task: (_, args) => promisify(Issue.find({ userId: args.id, issueType: "Task" })),
    subtasks: (_, args) => promisify(Issue.find({ userId: args.id, issueType: "Subtask" })),
    issue: (_, args) => promisify(Issue.findById(args.id)),
};

export default resolvers;