const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const employeeController = require('./employeeController');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET') {
        if (pathname === '/employees') {
            employeeController.listEmployees(req, res);
        } else if (pathname.startsWith('/employee/view')) {
            const employeeId = parsedUrl.query.id;
            employeeController.viewEmployee(req, res, employeeId);
        } else if (pathname === '/employee/add') {
            fs.readFile('./views/addEmployee.html', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Page Not Found</h1>');
        }
    } else if (req.method === 'POST') {
        if (pathname === '/employee/add') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const formData = qs.parse(body);
                employeeController.addEmployee(req, res, formData);
            });
        }
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
