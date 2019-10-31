const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendAm = (mail, confirmUrl) => {

    let sent = false

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
            console.log("Error: "+ e)
            sent = false
        });

    return sent;

}
