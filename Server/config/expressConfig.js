const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");

const App = express();

App.use(bodyparser.urlencoded({ extended: true }));

App.use(cookies());

App.use(
  session({
    secret: "jaja",
    resave: false,
    saveUninitialized: false
  })
);

module.exports = App;
