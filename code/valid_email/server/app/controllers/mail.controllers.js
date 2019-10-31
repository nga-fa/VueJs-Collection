const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const writeJson = require('write-json');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Mail = require('../models/mail.model.js');

// Create and Save a new job
exports.create = (req, res) => {

    // check format

    // check domain

    // ping user

    let code = randomCode();
    let url = process.env.HOST_URL + "verify/" + code + '-' + req.body.email;

    sendAm(req.body.email, url);

    // Create a mail
    const mail = new Mail({
        email: req.body.email || "Empty email",
        code: code,
        format: ((req.body.email === undefined) ? false : req.body.format),
        validDomain: ((req.body.format === false) ? false : req.body.validDomain),
        mailSent: ((req.body.validDomain === false) ? false : req.body.mailSent),
        verified: ((req.body.mailSent === false) ? false : req.body.verified)
    });

    // Save Mail in the database
    mail.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Job."
        });
    });
};

// Retrieve and return all mails from the database.
exports.findAll = (req, res) => {
    Mail.find()
        .then(mails => {
            res.send(mails);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving jobs."
        });
    });
};

// Update a mail identified by the mail in the request
exports.update = (req, res) => {

    // Find mail and update it with the request body
    Mail.findByIdAndUpdate(req.params.email, {
        validDomain: req.body.validDomain,
        mailSent: req.body.mailSent,
        verified: req.body.verified
    }, {new: true})
        .then(mail => {
            if(!mail) {
                return res.status(404).send({
                    message: "Mail not found: " + req.params.email
                });
            }
            res.send(job);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found: " + req.params.email
            });
        }
        return res.status(500).send({
            message: "Error updating email " + req.params.email
        });
    });
};

exports.randomCode = () => {

    let rand = Math.floor((Math.random() * 1000) + 5114);
    return rand;

};

// Find a single mail with a mailId
exports.findOne = (req, res) => {
    Mail.findById(req.params.email)
        .then(mail => {
            if(!mail) {
                return res.status(404).send({
                    message: "Email address not found with id " + req.params.mailId
                });
            }
            res.send(mail);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mail not found with id " + req.params.mailId
            });
        }
        return res.status(500).send({
            message: "Error retrieving job with id " + req.params.mailId
        });
    });
};

// Method calls from within the server

// TODO:
// figure out a way to find by email
exports.findOne_ = (email) => {
    Mail.findById(email)
        .then(mail => {
            if(!mail) {
                return "Email address not found with id "
            }
            return mail;
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mail not found " + email
            });
        }
        return "Error retrieving mail " + email
        });
};

// // Delete a job with the specified jobId in the request
// exports.delete = (req, res) => {
//     Job.findByIdAndRemove(req.params.jobId)
//         .then(job => {
//             if(!job) {
//                 return res.status(404).send({
//                     message: "Job not found with id " + req.params.jobId
//                 });
//             }
//             res.status(200).send({message: "Job deleted successfully!"});
//         }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Job not found with id " + req.params.jobId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete job with id " + req.params.jobId
//         });
//     });
// }

///////////////////////////////////////////////////

const sendAm = (mail, confirmUrl) => {

    let sent = false;

    const msg = {
        to: mail,
        from: process.env.HOST_MAIL,
        subject: 'Email Verification',
        html:   '<strong>' +
            'Click the buttton below or follow the link beneath it to verify this email address' +
            '</strong><br>' +
            '<button>' +
            '<a target="_blank" href='+confirmUrl+'></a>' +
            '</button><br>' +
            '<a href='+confirmUrl+'></a>',
    };

    sgMail.send(msg)
        .then(r => {
            sent = true
        })
        .catch(e => {
            console.log("Error: "+ e);
            sent = false
        });

    return sent;

};

let worker = require('./serverWorker')

function saveFile(data){

    let date = new Date();
    let name = date.toISOString().toString();
    name = name.replace(/:/g, '-');
    name = "data\\output\\" + name.slice(0,-2) + ".json";

    require('write-json').sync(name, data);

    return name;
}

exports.verifyMail = async function(req,res) {

    await worker.verifier(req.body.email)
        .then((response) => {
            const name = saveFile(response.response);
            res.send(name);
        })
        .catch((e) => {
            console.log(e)
        })
};


