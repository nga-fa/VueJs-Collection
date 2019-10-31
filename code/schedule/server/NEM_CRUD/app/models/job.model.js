const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);