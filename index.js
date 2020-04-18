// Modules
const fs = require('fs'); // File System operations have Synchronous & Asynchronous
const http = require('http'); //Support a Protocol
const url = require('url'); // Resolution and Parsing. It can be accessed using

//Add modules
const replaceTemplate = require('./modules/remplaceTemplate');

//Read Files
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

//Read File JSON
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //Convert to Javascript value Values


//SERVER
const server = http.createServer((req, res) => {
    // Destructing Query
    const { query, pathname } = url.parse(req.url, true);

    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { "Content-type": "text/html" });

        //Loop through with map
        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(output);


    } else if (pathname === '/product') {

        res.writeHead(200, { "Content-type": "text/html" });

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        // Recive query
        console.log(query);




    } else if (pathname === "/api") {
        //Informa al browser que es un JSON
        res.writeHead(200, { "Content-type": "application/javascript" });
        console.log(data);
        res.end(data);

        // Not Found




    } else {
        res.writeHead(404, {//Handle Error 404 - respond information
            'Content-type': 'text/html',   //2 ** 
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not Found 404!</h1>');
    }

    console.log(req.url);

});

// LISTEN

server.listen(8000, "localhost", () => {
    console.log('Listening to resquests on por 8000 💻');
});
