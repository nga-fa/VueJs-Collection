const mongoose = require('mongoose');

const MailSchema = mongoose.Schema({
    email: String,
    code: String,
    format: {type: Boolean, Defaults: false},
    validDomain: {type: Boolean, Defaults: false},
    mailSent: {type: Boolean, Defaults: false},
    verified: {type: Boolean, Defaults: false}
}, {
    timestamps: true
});

module.exports = mongoose.model('Mail', MailSchema);
