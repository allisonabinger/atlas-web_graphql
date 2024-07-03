const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    weight: Number,
    description: String,
});

// export model defined as Task and base it to schema taskSchema
module.exports = mongoose.model('Project', projectSchema);
