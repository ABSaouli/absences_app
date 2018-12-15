const Router = require("express").Router();
const mongoose = require("mongoose");
const schemadb = require("../models/Schemadb");
const moment = require("moment");
moment().format();
Router.get("/consultant", (req, res) => {
  let idUser = req.query.ID;
  schemadb.consultant.findOne({ id_user: idUser }, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    });
  });
});

Router.get("/consultant/all", (req, res) => {
  schemadb.consultant.find((err, consultant) => {
    if (err) throw err;

    if (!consultant) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(consultant);
    });
  });
});

Router.get("/responsable", (req, res) => {
  let idUser = req.query.ID;
  schemadb.responsable.findOne({ id_user: idUser }, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    });
  });
});

Router.post("/absence", (req, res) => {
  console.log("mon body", req.body);
  if (!req.body.dateDebut) {
    res.status(404).send("Invalid Posted data");
    return;
  }
  let absence = new schemadb.absence({
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    typeAbsence: req.body.typeAbsence,
    reponse: false,
    id_consultant: req.body.idconsultant
  });
  absence.save(function(err) {
    if (err) {
      console.log("voici lerro nemror2");
      return;
    }

    const dd = moment(req.body.dateDebut);
    const df = moment(req.body.dateFin);
    const nbJour = df.diff(dd, "days");
    const idconsultant = req.body.idconsultant;
    schemadb.consultant.findOne({ _id: idconsultant }, (err, user) => {
      if (err) {
        console.log("throw error in updating nbJours of idConsultant");
      }
      if (user) {
        console.log("user est :", user);
        const nbJours = user.nbJours;
        schemadb.consultant.findOneAndUpdate(
          { _id: idconsultant },
          { nbJours: nbJours + nbJour },
          (err, user) => {
            console.log("je suis le user :", user);

            if (err) {
              console.log("throw error in updating nbJours of idConsultant");
            }
            req.session.save(err => {
              if (err) {
                return next(err);
              }
            });
          }
        );
      }
    });
    res.status(304);
  });
});

Router.get("/absences", (req, res) => {
  let idConsultant = req.query.ID;
  schemadb.absence.find({ id_consultant: idConsultant }, (err, data) => {
    if (err) throw err;

    if (!data) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(data);
    });
  });
});

Router.get("/absences/valid", (req, res) => {
  let id = req.query.ID;
  schemadb.absence.findByIdAndUpdate(
    { _id: id },
    { reponse: true },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      req.session.save(err => {
        if (err) {
          return next(err);
        }
        res.status(200).json(id);
      });
    }
  );
});

Router.get("/absences/refus", (req, res) => {
  let id = req.query.ID;
  schemadb.absence.findByIdAndUpdate(
    { _id: id },
    { reponse: null },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      req.session.save(err => {
        if (err) {
          return next(err);
        }
        res.status(200).json(id);
      });
    }
  );
});

Router.get("/absences/delete", (req, res) => {
  let id = req.query.ID;
  schemadb.absence.findByIdAndDelete(
    { _id: id },
    { reponse: null },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      req.session.save(err => {
        if (err) {
          return next(err);
        }
        res.status(200).json(id);
      });
    }
  );
});

Router.get("/all-absences", (req, res) => {
  schemadb.absence.find((err, data) => {
    if (err) throw err;

    if (!data) {
      return res.status(500).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(data);
    });
  });
});

Router.post("/register", (req, res) => {
  let user = new schemadb.users({
    _id: new mongoose.Types.ObjectId(),
    mail: req.body.email,
    password: req.body.password,
    typeUser: req.body.typeUser
  });
  user.save(err => {
    if (err) {
      console.log("voici lerror", err);
    }
    res.status(200).json(user);
  });
});

Router.post("/consultant", (req, res) => {
  let consultant = new schemadb.consultant({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    age: req.body.age,
    dateDebutContart: new Date(),
    nbJours: 0,
    id_user: req.body.idUser
  });
  consultant.save(err => {
    if (err) {
      res.status(500).json({ error: "User not found." });
    }
    res.status(200).json(consultant);
  });
});

Router.post("/responsable", (req, res) => {
  let responsable = new schemadb.responsable({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    mail: req.body.mail,
    age: req.body.age,
    id_user: req.body.idUser
  });
  responsable.save(err => {
    if (err) {
      res.status(500).json({ error: "User not found." });
    }
    res.status(200).json(responsable);
  });
});

Router.get("/estimations-conge", (req, res) => {
  const idConsultant = req.query.ID;
  const EstimationFunction = async () => {
    const consultant = await schemadb.consultant.findById(
      { _id: idConsultant },
      (err, consultant) => {
        if (err) throw err;
        return consultant;
      }
    );
    const dateDebutContart = moment(consultant.dateDebutContart);
    let dateNow = moment(new Date());
    const nbJoursDDContrat = dateNow.diff(dateDebutContart, "days");

    const AbsenceTable = await schemadb.absence.find(
      { id_consultant: idConsultant },
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );

    const tabAbsenceValid = AbsenceTable.map(absence => {
      if (absence.reponse === true) {
        const dateDebut = moment(absence.dateDebut);
        const dateFin = moment(absence.dateFin);
        if (dateFin.diff(dateDebut, "days") !== undefined) {
          return dateFin.diff(dateDebut, "days");
        }
      } else {
        return 0;
      }
    });

    const tabAbsenceRefus = AbsenceTable.map(absence => {
      if (absence.reponse === null) {
        const dateDebut = moment(absence.dateDebut);
        const dateFin = moment(absence.dateFin);
        if (dateFin.diff(dateDebut, "days") !== undefined) {
          return dateFin.diff(dateDebut, "days");
        }
      } else {
        return 0;
      }
    });

    const tabAbsenceEnAttent = AbsenceTable.map(absence => {
      if (absence.reponse === false) {
        const dateDebut = moment(absence.dateDebut);
        const dateFin = moment(absence.dateFin);
        if (dateFin.diff(dateDebut, "days") !== undefined) {
          return dateFin.diff(dateDebut, "days");
        }
      } else {
        return 0;
      }
    });

    const absenceValid = tabAbsenceValid.reduce(
      (accumelator, valeurCurennet) => accumelator + valeurCurennet,
      0
    );
    const absenceRefus = tabAbsenceRefus.reduce(
      (accumelator, valeurCurennet) => accumelator + valeurCurennet,
      0
    );
    const absenceEnAttent = tabAbsenceEnAttent.reduce(
      (accumelator, valeurCurennet) => accumelator + valeurCurennet,
      0
    );
    return {
      absenceValid,
      absenceEnAttent,
      absenceRefus,
      joursDroit: nbJoursDDContrat / 12,
      total: nbJoursDDContrat / 12 - (absenceValid + absenceEnAttent)
    };
  };
  EstimationFunction().then(reponse => res.status(200).json(reponse));
});

module.exports = Router;
