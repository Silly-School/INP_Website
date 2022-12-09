"use strict";

// get all dependencies
const fs = require('fs');
const http = require("http");
const logger = require("silly-logger");

// define a port
const PORT = 8080;

// Message that the local server is starting
logger.startup("starting local server");


//  Read products.csv
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');

//  prepaire csv data
const products = productData.split('\n');

//  Shift one line
products.shift();

/*      prepairHTML function
    This function will split the csv data to finally use it in our html
*/
const prepairHTML = function(product) {
    const splitEachProduct = record => {
        const fields = record.split(";");

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

/*      prepairIndex function
    This function will split the csv data to finally use it in our index.html
*/
const prepairIndex = function() {

    const splitEachProduct = record => {
        const fields = record.split(";");

        //  reads the productExample.html - a template for a product view on a website
        let productSnippet = `
            <div>
                <img width="100%" src="${fields[4]}">
                <h3>${fields[0]}</h3>
                <p>${fields[1]}</p>
                <hr>
                <a href="{redirect}"><button>View Game!</button></a>
            </div>
        `;

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            productSnippet = productSnippet.replaceAll(`\${fields[${index}]}`, field);
        });

        productSnippet = productSnippet.replaceAll('{redirect}', fields[0].toLowerCase().replace(/ /g, "-"))
        //  returns the html
        return productSnippet;
    }

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    let html = fs.readFileSync('./views/index.html', 'utf-8')
    let data = ``

    pages.forEach(site => {
        data = data + site;
    });       

    return(html.replace('${insertGames}', data));
}


/*
    Handles the Request to give a specific response.
    Here is the "Routing" part of the website.
*/
const requestListener = function(req, res) {

    //  response in eah case of url
    switch (req.url) {
        case '/':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairIndex());
            break;

        case '/overcooked!-2':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(2));
            break;

        case '/thehunter-call-of-the-wild':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(1));
            break;

        case '/anno-1800':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(0));
            break;

        case '/style-dark.css':
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/style-dark.css', "utf-8"));
            break;

        case '/style-light.css':
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/style-light.css', "utf-8"));
            break;

        default:
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