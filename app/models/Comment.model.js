module.exports = (Schema, model) => {
    var CommentSchema = new Schema({
        author: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        description: String,
        date: Date,
        issue: {
            type: Schema.Types.ObjectId,
            ref: "Issue"
        }
    });

    return model('Comment', CommentSchema);
}

