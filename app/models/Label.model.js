module.exports = (Schema,model) => {
    var LabelSchema = new Schema({
        name: String,
        userId:String
    });

    return  model('Label', LabelSchema);
}