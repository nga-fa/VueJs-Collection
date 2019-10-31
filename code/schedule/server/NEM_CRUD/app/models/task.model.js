const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);