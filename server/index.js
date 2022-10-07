const express = require("express");
const cors = require("cors");
var request = require('request');
const app = express();
const PORT = 8000;
 
app.use(cors());
app.use(express.json());

const TOKEN = '204dfcbf3431ca9b8826bc5cc78718ac';
const endpoint = '48ef2cb1.compilers.sphere-engine.com';

app.post("/submit", (req, res) => {
    // define request parameters
    var submissionData = {
        compilerId: 116,
        source: req.body.code
    };

    // send request
    request({
        url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + TOKEN,
        method: 'POST',
        form: submissionData
    }, function (error, response, body) {
        
        if (error) {
            console.log('Connection problem');
        }
        
        // process response
        if (response) {
            if (response.statusCode === 201) {
                r = JSON.parse(response.body);
                console.log(JSON.parse(response.body)); // submission data in JSON
                res.status(200).send(r);
            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                } else if (response.statusCode === 402) {
                    console.log('Unable to create submission');
                } else if (response.statusCode === 400) {
                    var body = JSON.parse(response.body);
                    console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                }
            }
        }
    });
})


app.get("/compile/:id", (req, res) => {
    // define request parameters
    console.log(req.params.id);
    var submissionId = req.params.id;

    // send request
    request({
        url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + TOKEN,
        method: 'GET'
    }, function (error, response, body) {
    
        if (error) {
            console.log('Connection problem');
        }
        
        // process response
        if (response) {
            // console.log(JSON.parse(response.body));
            if (response.statusCode === 200) {
                r = JSON.parse(response.body);
                console.log(JSON.parse(response.body)); // submission data in JSON
                if (r.result.status.code != 15) {
                    res.status(201).send(r.result.status.name);

                }
                else {
                    res.status(200).send(r.result.streams.output);
                }
            

            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                }
                if (response.statusCode === 403) {
                    console.log('Access denied');
                }
                if (response.statusCode === 404) {
                    console.log('Submision not found');
                    console.log("sending status");
                    res.status(202).send("not ready yet");
                }
            }
        }
    });

})


app.get("/result/:id", (req, res) => {
    var submissionId = req.params.id;
    var stream = "output";
    
    request({
        url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '/' + stream + '?access_token=' + TOKEN,
        method: 'GET'
    }, function (error, response, body) {
        
        if (error) {
            console.log('Connection problem');
        }
        
        // process response
        if (response) {
            console.log(response);
            if (response.statusCode === 200) {
                console.log(response.body); // raw data from selected stream
                res.status(200).send(response.body);
            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                } else if (response.statusCode === 403) {
                    console.log('Access denied');
                } else if (response.statusCode === 404) {
                    var body = JSON.parse(response.body);
                    console.log('Non existing resource, error code: ' + body.error_code + ', details available in the message: ' + body.message)
                } else if (response.statusCode === 400) {
                    var body = JSON.parse(response.body);
                    console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                }
            }
        }
    });
   
});
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});