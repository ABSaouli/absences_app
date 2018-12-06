const express = require("express");
const App = require("./config/expressConfig");
const connection = require("./config/mongoosConfig");
const router = require("./routes/router");
const passport = require("./config/passportConfig");
const schemadb = require("./models/Schemadb");

App.use(passport.initialize());

App.use(passport.session());

App.use("/", router);

App.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log("/login handler", req.body);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

App.post("/consultant", (req, res) => {
  console.log(req);
});

App.get("/consultant", (req, res) => {
  console.log("ca est la route  get /consultant ");
  console.log(req.user);
  const Iduser = req.user._id;
  let consultant = schemadb.consultant.findById();

  res.send("tous vas bien");
});

App.get("/", (req, res) => {
  console.log("ca est lobjet req de get / ");

  res.send("tous vas bien");
});

App.listen(3001, () => {
  console.log("je vous écoute sur le port 3001");
});

// App.set("port", 3000);

// let user = new schemadb.users({
//   _id: new mongoose.Types.ObjectId(),
//   mail: "nadhir.houari@yahoo.fr",
//   password: "123456"
// });

// user.save(err => {
//   if (err) {
//     console.log("voici lerror", err);
//   }
//   let consultan = new schemadb.consultant({
//     _id: new mongoose.Types.ObjectId(),
//     name: "nadhir",
//     surname: "houari",
//     mail: user.mail,
//     age: 25,
//     dateDebutContart: new Date(),
//     id_user: user._id
//   });

//   consultan.save(function(err) {
//     if (err) {
//       console.log("voici lerror", err);
//     }

//     let absance = new schemadb.absance({
//       dateDebut: new Date(),
//       dateFin: new Date(),
//       title: "Le congé maternité",
//       reponse: false,
//       id_consultan: consultan._id
//     });

//     absance.save(function(err) {
//       if (err) {
//         console.log("voici lerro nemror2");
//       }
//     });
//   });
// });
