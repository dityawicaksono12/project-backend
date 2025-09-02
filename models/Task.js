const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', ],
        default: 'To Do'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
}, { timestamp: true })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task