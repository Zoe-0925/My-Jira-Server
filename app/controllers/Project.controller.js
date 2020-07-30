const db = require("../models");
const Project = db.projects
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(200).send({
            message: "The content body can not be empty."
        });
        return;
    }

    // Create a project
    const project = new Project({
        name: req.body.name,
        key: uuidv4(),
        category: req.body.category || "",
        lead: req.body.lead,
        members: [req.body.lead],
        image: req.body.image || "",
        default_assignee: "Project Lead",
    });
    try {
        await project.save()
        res.send(project);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Project."
        });
    }
}

// Retrieve all projects involving a particular user
exports.findByUserId = (req, res) => {
    Project.find({ members: req.params.id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving projects."
            });
        });
}

// Retrieve a single project with id
exports.findOne = (req, res) => {
    Project.find({ key: req.params.id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving projects."
            });
        });
}

// Update a project by id from the database.
exports.update = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body)
        await project.save({
            message: "Project was updated successfully."
        })
        res.send(project)
    } catch (err) {
        res.status(500).send({
            message: "Error updating Review with id=" + id
        })
    }
}

// Remove a member from a project by id.
exports.removeMember = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId, req.body)

        project.members.filter(req.params.userId)

        await project.save({
            message: "Project was updated successfully."
        })
        res.send(project)
    } catch (err) {
        res.status(500).send({
            message: "Error updating Review with id=" + id
        })
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(200).send({
            message: "The content body can not be empty."
        });
        return;
    }
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) res.status(404).send("No item found")
        res.status(200).send({
            message: "Project was deleted successfully!"
        })
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Project with id=" + id
        })
    }
}

// Delete all Projects of a particular lead from the database.
exports.deleteByLeadId = async (req, res) => {
    try {
        const project = await Project.deleteMany({ lead: req.params.id })
        if (!project) res.status(404).send("No item found")
        res.status(200).send({
            message: "Projects were deleted successfully!"
        })
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Projects"
        })
    }
};


