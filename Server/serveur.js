const express = require("express");
const App = require("./config/expressConfig");
const connection = require("./config/mongoosConfig");
const router = require("./routes/router");
const passport = require("./config/passportConfig");

App.use(passport.initialize());

App.use(passport.session());

App.use("/", router);

App.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(201).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

App.listen(3001, () => {
  console.log("je vous écoute sur le port 3001");
});
