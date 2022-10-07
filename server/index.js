const express = require("express");
const cors = require("cors");
var request = require('request');
const app = express();
require('dotenv').config();
const PORT = 8000;
const axios = require('axios');
 
app.use(cors());
app.use(express.json());


app.post("/judge_submit", (req, res) => {
    console.log("here");
    const formData = {
        language_id: 71,
        // encode source code in base64
        source_code: btoa(req.body.source_code),
        stdin: btoa(req.body.customInput)

    }
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
        },
        data: formData
    }
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        res.status(200).send(response.data);
      }).catch(function (error) {
          console.error(error);
      });

})


app.get("/compile_judge/:id", (req, res) => {
    console.log(req.params.id);
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${req.params.id}`,
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          console.log(atob(response.data.stderr));
          var response = {
            status: response.data.status.id,
            description: response.data.status.description,
            stderr: atob(response.data.stderr),
            stdout: atob(response.data.stdout)
          }
          res.status(200).send(JSON.stringify(response));

      }).catch(function (error) {
          console.error(error);
      });

})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});