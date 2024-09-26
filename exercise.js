// Handle Employee Update

const querystring = require('querystring');

function updateEmployee(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', () => {
        const parsedBody = querystring.parse(body);

        const id = parsedBody.id;
        const firstname = parsedBody.firstname;
        const lastname = parsedBody.lastname;
        const dob = parsedBody.dob;

        const sql = `UPDATE Employee 
                     SET firstname = ?, lastname = ?, dob = ? 
                     WHERE id = ?`;

        db.run(sql, [firstname, lastname, dob, id], function(err) {
            if (err) {
                return console.error(err.message);
            }

            // After updating, redirect back to the employee list
            res.writeHead(302, { 'Location': '/employees' });
            res.end();
        });
    });
}


// Setup Routing
// Here's the server setup that handles the different routes (/employees, /edit, /update):

const http = require('http');
const url = require('url');
const db = require('./db'); // SQLite database setup

http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true);
    const path = queryObject.pathname;

    if (path === '/employees') {
        listEmployees(req, res);
    } else if (path === '/edit' && queryObject.query.id) {
        editEmployee(req, res, queryObject.query.id);
    } else if (path === '/update' && req.method === 'POST') {
        updateEmployee(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found</h1>');
    }
}).listen(3000, () => {
    console.log('Server running on port 3000');
});
