module.exports = (Schema, model) => {
    var UserSchema = new Schema({
        name: String,
        email: String,
        projects: Array,
        password: String,
        projects: [{
            type: Schema.Types.ObjectId,
            ref: "Project"
        }]
    });
    return model('User', UserSchema);
}