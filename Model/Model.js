//defining monggose schema
var mongoose = require('mongoose');
//declaring the schema object
var Schema = mongoose.Schema;

var blogSchema = new Schema({

    title: { type: String, required: true },
    subTitle: { type: String },
    content: { type: String, default: '', required: true },
    author: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
    last_modified: { type: Date },
    tags: []

});

mongoose.model('Blog', blogSchema);