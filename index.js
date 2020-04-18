// Modules
const fs = require('fs'); // File System operations have Synchronous & Asynchronous
const http = require('http'); //Support a Protocol
const url = require('url'); // Resolution and Parsing. It can be accessed using

//Add modules
const replaceTemplate = require('.')

//SERVER

const server = http.createServer((req, res) => {

    const { pathname } = url.parse(req.url, true);


    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { "Content-type": "text/html" });
        // res.end("HOLA");
        res.end('exampels');

    } else if (pathname === '/product') {//(misitio.com/product)
        res.end('This is a PRODUCT !');
    } else {
        res.writeHead(404, {//Handle Error 404 - respond information
            'Content-type': 'text/html',   //2 ** 
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not Found 404!</h1>');
    }




});

// LISTEN

server.listen(8000, "localhost", () => {
    console.log('Listening to resquests on por 8000 💻');
});
