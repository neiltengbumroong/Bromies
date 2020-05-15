const mongoose = require('mongoose');

var broteFormSchema = mongoose.Schema({
    name: String,
    content: String,
    created: String,
    likes: Number
}, {versionKey: false});

module.exports = broteFormSchema;
