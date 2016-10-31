"use strict";
var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");

app.use(cors());

app.put('/questions', function (req, res) {
    console.log(req.method + req.url);
    var postData = "";
    req.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    });
    req.addListener("end", function() {
        console.log(req.method + req.url);
        fs.open("destination_files/questions.json", "w", "0644", function(err, handleFile) {
        if (!err) {
            fs.write(handleFile, postData, null, function(err, written) {
                if (!err) {
                    console.log("Записано");
                    fs.close(handleFile);
                } else {
                    console.log("не записано");
                }
            });
        } else {
            console.log("Файл не открыт");
            }
        });  
    });
});

app.put('/answers', function (req, res) {
    console.log(req.method + req.url);
    var postData = "";
    req.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    });
    req.addListener("end", function() {
        console.log(req.method + req.url);
        fs.open("destination_files/answers.json", "w", "0644", function(err, handleFile) {
        if (!err) {
            fs.write(handleFile, postData, null, function(err, written) {
                if (!err) {
                    console.log("Записано");
                    fs.close(handleFile);
                } else {
                    console.log("не записано");
                }
            });
        } else {
            console.log("Файл не открыт");
            }
        });  
    });
});

app.listen(8000, function () {
  console.log('Сервер запущен');
});
