"use strict";

// get all needed dependencies
const http = require("http");
const logger = require("silly-logger");
const requestListener = require('./app/routing');
const refreshRouting = require('./test/prepairRouting');

//  refreshes the routing.js
refreshRouting();

// define a port
const PORT = 8080;

// Message that the local server is starting
logger.startup("starting local server");

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