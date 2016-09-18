var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', { indexFile: "Task6.html" });

function accept(req, res) {
    file.serve(req, res);
    }

    http.createServer(accept).listen(8080);
    console.log("Server has started.");

