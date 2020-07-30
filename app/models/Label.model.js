module.exports = (Schema,model) => {
    var LabelSchema = new Schema({
        name: String,
    });

    return  model('Label', LabelSchema);
}