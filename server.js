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



// Create an HTTP server that handles incoming request 

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
      handleFormSubmission(req, res);
    } else if (req.method === 'GET' && req.url === '/user-data') {
      handleViewUserData(res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>User Data Form</title>
            </head>
            <body>
              <h1>Enter Your Information</h1>
              <form action="/submit" method="post">
                <label>Name:</label><br>
                <input type="text" name="name" required><br><br>
                <label>Email:</label><br>
                <input type="email" name="email" required><br><br>
                <label>Phone:</label><br>
                <input type="text" name="phone" required><br><br>
                <input type="submit" value="Submit">
              </form>
              </br>
               <h2>View User Data</h2>
                <a href="/user-data">Show User Data</a>
            </body>
            </html>
          `); 
    }
})















