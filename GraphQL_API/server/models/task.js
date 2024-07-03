const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: String,
    weight: Number,
    description: String,
    projectId: String
});

// export model defined as Task and base it to schema taskSchema
module.exports = mongoose.model('Task', taskSchema);
