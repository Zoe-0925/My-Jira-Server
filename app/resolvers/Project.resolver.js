
const Project = require("../models").projects;



const { v4: uuidv4 } = require('uuid');

Module.exports = {
    Query: {
        findAll: () => {
            return Project.find({});
        },
        findByUserId: (parent, args) => {
            return Project.find({ members: args.id })
        },
        findOne: (parent, args) => {
            return Project.find({ key: args.id })
        },
    },
    Mutation: {
        create: (parent, args) => {
            let Project = new Project({
                name: args.name,
                key: args.key,
                category: args.category || "",
                lead: args.userId,
                members: [args.userId],
                image: args.image || "",
                default_assignee: "Project Lead",
                epics: []
            });
            return Project.save();
        },
        update: (parent, args) => {
            if (!args.id) return;
            return Project.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        name: args.name,
                        key: args.key,
                        category: args.category || "",
                        lead: args.userId,
                        members: [args.userId],
                        image: args.image || "",
                        default_assignee: "Project Lead",
                        epics: []
                    }
                }, { new: true }, (err, Project) => {
                    if (err) {
                        console.log('Something went wrong when updating the Project with id ' + args.id);
                    }
                }
            );
        },
        delete: (parent, args) => {
            if (!args.id) return;
            return Project.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        name: args.name,
                        producer: args.producer,
                        rating: args.rating,
                    }
                }, { new: true }, (err, Movie) => {
                    if (err) {
                        console.log('Something went wrong when updating the movie');
                    } else {
                    }
                }
            );
        },
    }
}