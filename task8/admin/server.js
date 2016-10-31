"use strict";
var express = require('express');
var app = express();

app.use(express.static('.'));

app.listen(5000, function () {
  console.log('Сервер запущен, перейдите по адресу http://localhost:5000/');
});