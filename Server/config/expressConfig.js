const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookies());

app.use(
  session({
    secret: "jaja",
    resave: false,
    saveUninitialized: false
  })
);

module.exports = app;
