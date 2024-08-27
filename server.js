// Import the necessary modules 
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring  = require('querystring');


// Handle form Submission 
const handleFormSubmission = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () =>{
        const userData = querystring.parse(body);

        fs.writeFile('userData.json', JSON.stringify(userData, null, 2), (err) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error saving data')
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Data saved Successfully')
            }
        })
    })
}




Handle viewing user data 
// Handle viewing user data 
const handleViewUserData = (res) =>{
    fs.readFile('userData.json', 'utf8', (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error reading Data')
        } else {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data)
        }
    })
}


















