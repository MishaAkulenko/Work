var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require("fs");

http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    console.log(request.method + request.url);
    switch(request.method) {
        case 'GET': {
            if (request.url === "/")
                readProfile(request, response);
            else
                console.log("Запрос по другому адресу")
            break;
        }
        case 'POST': {
            if (request.url === "/")
                writeAnswers(request, response);
            break;
        }
    }
}).listen(8080);
console.log("Server has started.");

http.createServer(function (request, response){
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if(request.method == 'POST') {
        writeQuestion (request, response);
    } else {
        console.log("Запрос по другому адресу");   
    }
    response.end();
}).listen(8000);

function readProfile (request, response){
    fs.readFile("server/questions.json", 'utf8', function(err, data) {
        if (!err) {
            console.log("Данные прочитаны");
            response.end(data);
            } else {
                console.log("Файл не найден")
            }
    });
}


function writeAnswers(request, response) {
    var postData = "";
    request.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    });
    request.addListener("end", function() {
        console.log(request.method + request.url);
        fs.open("server/answer.json", "w", 0644, function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, postData, null, function(err, written) {
                if (!err) {
                    console.log("Записано")
                    fs.close(file_handle);
                } else {
                    console.log("не записано")
                }
            });
        } else {
            console.log("Файл не открыт")
            }
        });  
    });
}

function writeQuestion (request, response) {
    var postData = "";
    request.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    });
    request.addListener("end", function() {
        console.log(request.method + request.url);
        fs.open("server/questions.json", "w", 0644, function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, postData, null, function(err, written) {
                if (!err) {
                    console.log("Записано")
                    fs.close(file_handle);
                } else {
                    console.log("не записано")
                }
            });
        } else {
            console.log("Файл не открыт")
            }
        });  
    });
}

    

