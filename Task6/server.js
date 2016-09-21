var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require("fs");

function accept(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    var profile = {
            name: {type: 'string', question: 'What is yor name?'},
            age: {type: 'number', question: 'How old are you?'},
            marital: {type: 'radio', values: ['married', 'widowed', 'single'], question: 'What is your marital status?'},
            isStudent: {type: 'checkbox', question: 'Are you student?'},
            income: {type: 'select', question: 'How much do you earn?', values: ['Nothing', '$50 - $100', '$100 - $500', '$500 - $1000', 'More then $1000']},//объект с данными пользователя который пришел с сервера                                      
    };
    
    /*fs.open("server/questions.json", "r", 0644, function(err, file_handle) {
        if (!err) {
            fs.read(file_handle, 10000000, null, 'ascii', function(err, data) {
                if (!err) {
                    console.log(JSON.stringify(data));
                    res.write(JSON.stringify(profile));
                    fs.close(file_handle);
                } else {
                    console.log("Прочитано")
                }
             });
    } else {
        console.log("Нельзя открыть")
    }
    });*/
    
    
    res.write(JSON.stringify(profile));
    res.end();
    
    var postData = "";
    req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });
    
    req.on("end", function() {
        fs.open("server/ansver.json", "w", 0644, function(err, file_handle) {
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
    
    
    //var pathname = url.parse(req.url).pathname;
    //console.log(pathname);
    //console.log(req.method);
    //console.log(req.url);
    }
    
    http.createServer(accept).listen(8080);
    http.createServer(accept).listen(8081);
    console.log("Server has started.");

