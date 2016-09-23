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
                writeAnswers(request, response);
            break;
        }
    }
}).listen(8080);
console.log("Server has started.");


function readProfile (request, response){
    fs.readFile("server/questions.json", 'utf8', function(err, data) {
        if (!err) {
            console.log("Данные прочитаны");
            response.end(data);
            } else {
                console.log("404")
            }
    });
}

function readFavicon (request, response) {
    var img = fs.readFileSync('favicon.ico');
    response.writeHead(200, {'Content-Type': 'image/ico' });
    response.end(img, 'binary');
    console.log("Фавикон считал ")
}

function writeAnswers(request, response) {
    var postData = "";
    request.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    });
    
    request.addListener("end", function() {
        fs.open("server/answer.json", "w", 0644, function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, postData, function(err, written) {
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

http.createServer(function (request, response){
    console.log(request.method + request.url);
    response.end();
}).listen(8081);

/*function accept(request, response) {

    var profile = {
            name: {type: 'string', question: 'What is yor name?'},
            age: {type: 'number', question: 'How old are you?'},
            marital: {type: 'radio', values: ['married', 'widowed', 'single'], question: 'What is your marital status?'},
            isStudent: {type: 'checkbox', question: 'Are you arbaiten?'},
            income: {type: 'select', question: 'How much do you earn?', values: ['Nothing', '$50 - $100', '$100 - $500', '$500 - $1000', 'More then $1000']},//объект с данными пользователя который пришел с сервера                                      
    };
    
    
    

    
    
    //var pathname = url.parse(request.url).pathname;
    //console.log(pathname);
    //console.log(request.method);
    //console.log(request.url);
    */
    

