"use strict";
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.static('.'));
app.use(express.static('../destination_files'));

app.listen(7000, function () {
  console.log('Сервер запущен, перейдите по адресу http://localhost:7000/');
});