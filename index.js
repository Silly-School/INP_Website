"use strict";

// get all dependencies
const fs = require('fs');
const http = require("http");
const logger = require("silly-logger");

// define a port
const PORT = 8080;

// Message that the local server is starting
logger.startup("starting local server");

/*      prepairHTML function
    This function will split the csv data to finally use it in our html
*/
const prepairHTML = function(product) {
    //  logger.debug("File inserted");

    //  Read products.csv
    const productData = fs.readFileSync('./src/products/products.csv', 'UTF8');

    //  prepaire csv data
    const products = productData.split('\n');

    //  Shift one line
    products.shift();

    const splitEachProduct = record => {
        const fields = record.split(",");

        let html = fs.readFileSync('./src/template/productExample.html', 'utf-8');

        html = html.replaceAll('${fields[0]}', fields[0]);
        html = html.replaceAll('${fields[1]}', fields[1]);
        html = html.replaceAll('${fields[2]}', fields[2]);
        html = html.replaceAll('${fields[3]}', fields[3]);
        html = html.replaceAll('${fields[4]}', fields[4]);
        html = html.replaceAll('${fields[5]}', fields[5]);

        return html;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    return (pages[product]);
};


/*      requestListener Function
    Handles the Request to give a specific response.
    Here is the "Routing" part of the website.
*/
const requestListener = function(req, res) {

    //  predefine data
    let data = '';

    //  response in eah case of url
    switch (req.url) {
        //  Respond with the Template
        case '/':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            data = prepairHTML(4);
            logger.debug('worked!');
            break;

        case '/rtx-4090-founders-edition':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            data = prepairHTML(3);
            break;

        case '/corsair-vengeance-rgb-pro':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            data = prepairHTML(2);
            break;

        case '/ryzen-9-7950x':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            data = prepairHTML(1);
            break;

        case '/asus-rog-mainboard':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            data = prepairHTML(0);
            break;

        case '/style.css':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            data = fs.readFileSync('./src/template/style.css', "utf-8");
            break;

        default:
            logger.error(req.url);
            break;
    }

    //  Respon with data
    logger.debug(data);
    res.end(data);
};

//  create local server
const server = http.createServer(requestListener);

//  start server on Port with error handling
server.listen(PORT, function(error){
    if (error){
        logger.error('Something went wrong\n' + error);
    } else {
        logger.success(`server successfully startet at: http://localhost:${PORT}`);
    }
});