const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const axios = require('axios')
global.appRoot = path.resolve(__dirname);

app.use(fileUpload({
    useTempFiles : true,
    safeFileNames: true,
    tempFileDir : __dirname + '/data/upload'
}));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

// Configs

// // Configuring the database
// const dbConfig = require('./config/database.config.js');
// const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

// Routes

require('./server/app/routes/mail.routes.js')(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/getdoc/:name', function (req, res) {

    res.download(path.join(__dirname, '/data/output/'+ req.params.name), function (err) {

        console.log(err);

    });

});

const mailworker = require('./server/app/controllers/serverWorker');

app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.uploadfile;


    sampleFile.mv(path.resolve(`./data/upload/${req.files.uploadfile.name}`), function(err) {
        if (err)
            return res.status(500).send(err);

        let result;

        // Convert file to array

        if (req.files.uploadfile.name.includes("csv", req.files.uploadfile.name.length - 3)) {

            const csvFilePath =  __dirname + '/data/upload/' + req.files.uploadfile.name;

            const csv = require('csvtojson');

            csv()
                .fromFile(csvFilePath)
                .then(async (jsonObj) => {

                    let emailArray = [];

                    jsonObj.map((val) => {
                        emailArray.push(val.email)
                    });

                    result = await mailworker.verifier(emailArray);

                    console.log("Result: "+result.name)

                    let name = result.name.replace("output\\","")

                    res.header('Content-Type', 'text/html').send("<html><a href='/getdoc/" + name + "'><button>Download Report</button></a></html>");

                });
        }

        else if (req.files.uploadfile.name.includes("xls", req.files.uploadfile.name.length - 3) || req.files.uploadfile.name.includes("xlsx", req.files.uploadfile.name.length - 3)){

            // code
            const node_xj = require("xls-to-json");
            node_xj({
                input:  __dirname + '/data/upload/' + req.files.uploadfile.name,
                output:  __dirname + '/output/test.json',
                sheet: req.files.uploadfile.name,
                rowsToSkip: 1 // number of rows to skip at the top of the sheet; defaults to 0
            }, function(err, result) {
                if(err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });

        }

    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
