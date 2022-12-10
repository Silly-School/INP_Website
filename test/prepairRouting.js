"use strict";

// get all needed dependencies
const fs = require('fs');
const logger = require('silly-logger');

const refreshRouting = function() {

    const document = fs.readFileSync('./test/routingTemplate.js', 'utf-8');

    let data = '';

    // testing Data TODO: doing great code work here.
    data = data + `
        case '/game':
            //  template for game files
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(0));
            break;
    `;

    //  photo files
    const imagesFolder = fs.readdirSync('./public/images/');

    imagesFolder.forEach(element => {
        data = data + `
        case '/${element}':
            //  image path => /${element}
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/${element}'));
            break;
        `;
    });

    //  css files
    const cssFolder = fs.readdirSync('./public/css/');

    cssFolder.forEach(element => {
        data = data + `
        case '/${element}':
            //  css path => /${element}
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/${element}', "utf-8"));
            break;
        `;
    });

    logger.debug(document.replace('${extraCases}', data));

};

module.exports = refreshRouting;