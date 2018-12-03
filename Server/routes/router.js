const Router = require("express").Router();

const schemadb = require("../models/Schemadb");

Router.get("/consultant/:_id", (req, res) => {
  let absances = req.user;
});

Router.post("/consultant", (req, res) => {
  console.log(req);
  let user = new schemadb.users({
    _id: new mongoose.Types.ObjectId(),
    mail: req.body.email,
    password: req.body.password
  });

  user.save(err => {
    if (err) {
      console.log("voici lerror", err);
    }

    let consultant = new schemadb.consultant({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      surname: req.body.surname,
      mail: req.body.mail,
      age: req.body.age,
      dateDebutContart: new Date(),
      password: req.body.password
    });
    consultant
      .save()
      .then(() => {
        console.log("add user succes");
      })
      .catch(err => {
        if (err) {
          console.log("voici lerror", err);
        }
      });
  });
});

Router.get("/login", (req, res) => {});

Router.get("/consultant/:id", (req, res) => {
  user = req.user;
  let IDconsultant = req.params.id;

  user.todos.forEach(todo => {
    if (todo._id.toString() === todoID) {
      todo.done = !todo.done;
      user.save().then(() => res.redirect("/"));
    }
  });
});

Router.post("/newConsultant", (req, res) => {
  console.log(req);

  //let body = req.body;
});

module.exports = Router;
