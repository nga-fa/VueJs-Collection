module.exports = (app) => {
        const jobs = require('../controllers/job.controller.js');
    
        // Create a new job
        app.post('/jobs', jobs.create);
    
        // Retrieve all jobs
        app.get('/jobs', jobs.findAll);
    
        // Retrieve a single job with jobId
        app.get('/jobs/:jobId', jobs.findOne);
    
        // Update a job with jobId
        app.put('/jobs/:jobId', jobs.update);
    
        // Delete a job with jobId
        app.delete('/jobs/:jobId', jobs.delete);
    }