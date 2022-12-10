"use strict";

// get all needed dependencies
const fs = require('fs');
const logger = require('silly-logger');

//  Read products.csv, split at \n and shift one line.
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');
const products = productData.split('\n');
products.shift();


/*
    function refreshRouting
    This function will refresh the routing.js so it automatically changes to the
    data in the csv file. This code will be run once the programm starts to add the new routes.
*/
const refreshRouting = function() {

    //  read the template and predefine data, we will merge the document with the data later
    let document = fs.readFileSync('./test/routingTemplate.txt', 'utf-8');

    let data = '';

    // Here we split the scv again, to get the individual part of the csv that we need.
    const splitEachProduct = record => {
        const fields = record.split(";");

        //  reads the productExample.html - a template for a product view on a website
        let html = `
        case "/{path}":
            //  game path => /{path}
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML({number}));
            break;`;

        //  replacing the {path} argument so that we have out /root ending of the link eg /anno-1800
        html = html.replaceAll('{path}', fields[0].toLowerCase().replace(/ /g, "-"));

        //  replaces the {number} with the game ID
        html = html.replaceAll('{number}', fields[2]);


        //  returns the html
        return html;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    pages.forEach(page => {
        data = data + page;
    });

    //  prepair photo files part
    const imagesFolder = fs.readdirSync('./public/images/');

    imagesFolder.forEach(element => {
        data = data + `
        case "/public/images/${element}":
            //  image path => /${element}
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/${element}'));
            break;`;
    });

    //  prepair css files part
    const cssFolder = fs.readdirSync('./public/css/');

    cssFolder.forEach(element => {
        data = data + `
        case "/${element}":
            //  css path => /${element}
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/${element}', "utf-8"));
            break;`;
    });

    //  prepair font files part
    /*  TODO: have to figure out why fonts wont work
    const fontFolder = fs.readdirSync('./public/fonts/');

    fontFolder.forEach(element => {
        data = data + `
        case "/${element}":
            //  css path => /${element}
            res.writeHeader(200, { 'Content-Type': 'application/octet-stream' });
            res.end(fs.readFileSync('./public/fonts/${element}', "utf-8"));
            break;`;
    });
    */

    // merging the document with data, for that de document contains ${extraCases} so that we can easiely replace it
    document = document.replace('${extraCases}', data);

    // remove the current routing file and renew it
    fs.rmSync('./app/routing.js');
    logger.custom('Remove', 'red', '', 'Removed ./app/routing.js');

    fs.writeFileSync('./app/routing.js', document);
    logger.success('Wrote ./app/routing.js');
};

module.exports = refreshRouting;