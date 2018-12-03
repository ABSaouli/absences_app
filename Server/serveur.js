const express = require("express");
const app = require("./config/expressConfig");
const connection = require("./config/mongoosConfig");
const router = require("./routes/router");
const passport = require("./config/passportConfig");
const schemadb = require("./models/Schemadb");

app.use(passport.initialize());

app.use(passport.session());

app.use("/", router);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/consultant",
    failureRedirect: "/"
  })
);

app.post("/consultant", (req, res) => {
  console.log(req);
});

app.get("/consultant", (req, res) => {
  console.log("ca est la route  get /consultant ");

  res.send("tous vas bien");
});

app.get("/", (req, res) => {
  console.log("ca est lobjet req de get / ");

  res.send("tous vas bien");
});

app.listen(3001, () => {
  console.log("je vous écoute sur le port 3001");
});

// app.set("port", 3000);

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
