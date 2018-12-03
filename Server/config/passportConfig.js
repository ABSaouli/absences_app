const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Schemadb = require("../models/Schemadb");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      Schemadb.users.findOne({ mail: email }, function(err, user) {
        if (err) {
          console.log("err");
          return done(err);
        }
        if (!user) {
          console.log("no user found");

          return done(null, false, { message: "Incorrect email." });
        }
        if (user.password !== password) {
          console.log("password wrong");

          return done(null, false, { message: "Incorrect password." });
        }
        console.log("je susi dans passport");
        return done(null, user);
      });
    }
  )
);
passport.serializeUser(function(user, done) {
  console.log("passport.serializeUser");

  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log("passport.deserializeUse");
  users.findById(id, function(err, user) {
    done(err, user);
  });
});
module.exports = passport;
