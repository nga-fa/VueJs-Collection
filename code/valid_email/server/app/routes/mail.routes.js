module.exports = (app) => {
    const mails = require('../controllers/mail.controllers.js');

    // Send test email
    //app.post('/sendAm', mails.sendMail);

    // Verify an email
    app.post('/verify', mails.verifyMail);
    //
    // // Retrieve all jobs
    // app.get('/jobs', jobs.findAll);
    //
    // // Retrieve a single job with jobId
    // app.get('/jobs/:jobId', jobs.findOne);
    //
    // // Update a job with jobId
    // app.put('/jobs/:jobId', jobs.update);
    //
    // // Delete a job with jobId
    // app.delete('/jobs/:jobId', jobs.delete);
}
