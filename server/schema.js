const mongoose = require('mongoose');

var broteFormSchema = mongoose.Schema({
    name: String,
    content: String,
    created: String
});

module.exports = broteFormSchema;
