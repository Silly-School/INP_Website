"use strict";

// get all needed dependencies
const fs = require('fs');
const prepairHTML = require('./prepairHTML');
const prepairINDEX = require('./prepairINDEX');
const logger = require('silly-logger');

/*
    requestListener function
    This function will route the requests and gives responses
*/
const requestListener = function(req, res) {
    //  response in eah case of url
    switch (req.url) {
        case '/':
            //  standard path => index.js
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairINDEX());
            break;

        case '/spyro-reignited-trilogy':
            //  game path => /spyro-reignited-trilogy
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(7));
            break;

        case '/vrchat':
            //  game path => /vrchat
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(7));
            break;

        case '/dead-by-daylight':
            //  game path => /dead-by-daylight
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(6));
            break;

        case '/stray':
            //  game path => /stray
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(5));
            break;

        case '/cyberpunk-2077':
            //  game path => /cyberpunk-2077
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(4));
            break;

        case '/war-thunder':
            //  game path => /war-thunder
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(3));
            break;

        case '/overcooked!-2':
            //  game path => /overcooked!-2
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(2));
            break;

        case '/thehunter-call-of-the-wild':
            //  game path => /thehunter-call-of-the-wild
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(1));
            break;

        case '/anno-1800':
            //  game path => /anno-1800
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(0));
            break;

        case '/public/images/home.png':
            //  image path => /home.png
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/home.png'));
            break;

        case '/public/images/github.png':
            //  image path => /github.png
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/github.png'));
            break;

        case '/style-dark.css':
            //  css path => /style-dark.css
            res.writeHeader(200, { 'Content-Type': 'text/css' });
            res.end(fs.readFileSync('./public/css/style-dark.css', "utf-8"));
            break;

        default:
            //  default error404 path => /404.html
            res.writeHeader(404, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync('./views/404.html', "utf-8"));
            break;
    }

    //  logs IP and requested url/path
    logger.custom(req.connection.remoteAddress, "yellow", "", req.url);
};

module.exports = requestListener;