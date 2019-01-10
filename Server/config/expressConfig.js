const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");
const http = require("https");

const App = express();

App.use(fileUpload());

App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(cookies());

App.use(
  session({
    secret: "jaja",
    resave: false,
    saveUninitialized: false
  })
);

module.exports = App;
