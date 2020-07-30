const db = require("../models");
const Review = db.reviews

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(200).send({
            message: "The content body can not be empty."
        });
        return;
    }

    // Create a Review
    const review = {
        id: req.body.id,
        dateTime: req.body.dateTime,  //TODO check if this can be parsed correctly
        title: req.body.title,
        overallRating: req.body.overallRating,
        fitRating: req.body.fitRating,
        strengthRating: req.body.strengthRating,
        comfortRating: req.body.comfortRating,
        productId: req.body.productId,
        body: req.body.body,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail
    };

    // Save Tutorial in the database
    Review.create(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Review."
            });
        });
};

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
    Review.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reviews."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Review.findByPk(id)  //TODO: check to see if pk can be manually generated
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Review with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Review.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Review with id=" + id
            });
        });
};

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Review.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Review.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Reviews were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all reviews."
            });
        });
};

// Find all reviews of a particular product
exports.findByProductId = (req, res) => {
    const productId = req.params.productId
    var condition = productId ? { productId: productId } : null;

    Review.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reviews."
            });
        });
};