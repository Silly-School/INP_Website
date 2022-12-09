const fs = require('fs');
const prepairHTML = require('./prepairHTML');
const prepairINDEX = require('./prepairINDEX');
const logger = require('silly-logger');

const requestListener = function(req, res) {
    //  response in eah case of url
    switch (req.url) {
        case '/':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairINDEX());
            break;

        case '/cyberpunk-2077':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(4));
            break;

        case '/war-thunder':
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.end(prepairHTML(3));
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

        case '/public/images/home.png':
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/home.png'));
            break;

        case '/public/images/github.png':
            res.writeHeader(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync('./public/images/github.png'));
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

    logger.custom(req.connection.remoteAddress, "yellow", "", req.url);
};

module.exports = requestListener;