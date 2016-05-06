var express = require('express');

var server = express();

server.use(express.static('data'));

console.log("listening on port 8080");
server.listen(8080);