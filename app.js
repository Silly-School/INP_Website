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
    const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');

    //  prepaire csv data
    const products = productData.split('\n');

    //  Shift one line
    products.shift();

    const splitEachProduct = record => {
        const fields = record.split(",");

        //  reads the productExample.html - a template for a product view on a website
        let html = fs.readFileSync('./views/productExample.html', 'utf-8');

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            html = html.replaceAll(`\${fields[${index}]}`, field);
        });

        //  returns the html
        return html;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    return (pages[product]);
};


/*
    Handles the Request to give a specific response.
    Here is the "Routing" part of the website.
*/
const requestListener = function(req, res) {

    //  response in eah case of url
    switch (req.url) {
        //  Respond with the Template
        case '/':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync('./views/index.html', "utf-8"));
            break;

        case '/rtx-4090-founders-edition':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(3));
            break;

        case '/corsair-vengeance-rgb-pro':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(2));
            break;

        case '/ryzen-9-7950x':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(1));
            break;

        case '/asus-rog-mainboard':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(0));
            break;

        //  First CSS file routed
        case '/style-dark.css':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/style-dark.css', "utf-8"));
            break;

        //  Second CSS file routed
        case '/style-light.css':
            //  set data to -> fileread ./src/index/index.html
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/style-light.css', "utf-8"));
            break;

        default:
            //  TODO: Add Css File to this to make it look pretier
            res.writeHeader(404, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync('./views/404.html', "utf-8"));
            break;
    }
};

//  create local server
const server = http.createServer(requestListener);

//  start server on Port with error handling
server.listen(PORT, function(error){
    if (error){
        logger.error(`Something went wrong\n${error}`);
    } else {
        logger.success(`server successfully startet at: http://localhost:${PORT}`);
    }
});