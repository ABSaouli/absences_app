const Router = require("express").Router();
const mongoose = require("mongoose");
const schemadb = require("../models/Schemadb");
const moment = require("moment");

moment().format();

Router.get("/consultant/:id", (req, res) => {
  schemadb.consultant.findById(req.params.id, (err, consultant) => {
    if (err) throw err;
    if (!consultant) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(consultant);
  });
});

Router.get("/responsable/:id", (req, res) => {
  schemadb.responsable.findById(req.params.id, (err, responsable) => {
    if (err) throw err;
    if (!responsable) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(responsable);
  });
});

Router.get("/consultant", (req, res) => {
  schemadb.consultant.find(req.query, (err, consultant) => {
    if (err) throw err;
    if (!consultant) {
      res.status(404).json({ error: "Consultant not found." });
    }
    res.status(200).json(consultant);
  });
});

Router.get("/responsable", (req, res) => {
  schemadb.responsable.findOne(req.query, (err, responsable) => {
    if (err) throw err;
    if (!responsable) {
      res.status(404).json({ error: "Responsable not found." });
    }
    res.status(200).json(responsable);
  });
});

Router.post("/absence", (req, res) => {
  let absence = new schemadb.absence(req.body);
  absence.save(function(err) {
    if (err) {
      return res.status(500).json({ error: "Add Absence error save ." });
    }
    const dd = moment(req.body.dateDebut);
    const df = moment(req.body.dateFin);
    const nbJour = df.diff(dd, "days");

    schemadb.consultant.findOne(
      { _id: req.body.id_consultant },
      (err, user) => {
        if (err) {
          return res
            .status(404)
            .send("throw error in updating nbJours of idConsultant");
        }
        if (user) {
          const nbJours = user.nbJours;
          schemadb.consultant.findOneAndUpdate(
            { _id: req.body.id_consultant },
            { nbJours: nbJours + nbJour },
            (err, user) => {
              if (err) {
                return res
                  .status(404)
                  .send("throw error in updating nbJours of idConsultant");
              }
            }
          );
        }
      }
    );
    res.status(200).send("post absence and update nbJour success");
  });
});

Router.get("/absences", (req, res) => {
  schemadb.absence.find(req.query, (err, data) => {
    if (err) throw err;
    if (!data) {
      return res.status(404).json({ error: "data not found." });
    }
    res.status(200).json(data);
  });
});

Router.get("/absences/valid", (req, res) => {
  schemadb.absence.findByIdAndUpdate(
    req.query,
    { reponse: true },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      res.status(200).json(data.id);
    }
  );
});

Router.get("/absences/refus", (req, res) => {
  schemadb.absence.findByIdAndUpdate(
    req.query,
    { reponse: null },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      res.status(200).json(data.id);
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
      return res.status(500).json({ error: "Absences not found." });
    }
    res.status(200).json(data);
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
    jourAbsence: 0,
    jourIntercontrat: 0,
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

Router.post("/project", (req, res) => {
  const project = new schemadb.project({
    title: req.body.titre,
    discriptif: req.body.discriptif,
    consultant_list: req.body.listConsultant,
    jourNormale: 0,
    jourAstreintes: 0
  });

  project
    .save()
    .then(() => res.status(200).send("ok"))
    .catch(err => res.status(500).send("sauvgarde error"));
});

Router.get("/project", (req, res) => {
  if (!req.query.id_consultant) {
    schemadb.project.find((err, projects) => {
      if (err) throw err;

      if (!projects) {
        return res.status(500).json({ error: "Projects is not found." });
      }
      res.status(200).json(projects);
    });
  } else {
    const idConsultant = req.query.id_consultant;

    schemadb.project.find(
      { consultant_list: { $all: [idConsultant] } },
      (err, projects) => {
        if (err) throw err;
        if (!projects) {
          return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(projects);
      }
    );
  }
});

Router.put("/consultant/:id", (req, res) => {
  schemadb.consultant.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname,
      mail: req.body.mail,
      age: req.body.age
    },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      res.status(200).json(data.id);
    }
  );
});

Router.put("/responsable/:id", (req, res) => {
  schemadb.responsable.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname,
      mail: req.body.mail,
      age: req.body.age
    },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      res.status(200).json(data.id);
    }
  );
});

Router.post("/consultant/rib/:id", (req, res) => {
  console.log("mon requesert ùùùù%%%% ", req.files);
  schemadb.consultant.findByIdAndUpdate(
    req.params.id,
    { Rib: req.files.Rib },
    (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(500).json({ error: "User not found." });
      }
      res.status(200).json(req.files.Rib);
    }
  );
});

Router.get("/consultant/rib/:id", (req, res) => {
  schemadb.consultant.findById(req.params.id, (err, response) => {
    if (err) throw err;
    if (!response) {
      return res.status(500).json({ error: "Rib is not found." });
    }

    res
      .status(200)
      .type("application/pdf")
      .send(response.Rib);
  });
});

Router.post("/rapport-activite", (req, res) => {
  let rapportActivite = new schemadb.rapportActivite({
    _id: new mongoose.Types.ObjectId(),
    soumis: false,
    date: req.body.date,
    commentaire: null,
    dateSoumission: null,
    file: null,
    fileContentType: null,
    responsableId: req.query.id
  });

  rapportActivite.save(err => {
    if (err) {
      res.status(500).json({ error: "serveur error" });
    }
    res.status(200).json(rapportActivite);
  });
});

Router.get("/rapport-activite", (req, res) => {
  schemadb.rapportActivite.find({}, (err, rapportActivite) => {
    if (err) {
      res.status(500).json({ error: "serveur error" });
    }
    if (!rapportActivite) {
      res.status(404).json({ error: "rapportActivite is not found" });
    }
    res.status(200).json(rapportActivite);
  });
});

Router.post("/activite", (req, res) => {
  let activite = new schemadb.rapportActivite({
    jour: Date,
    demiJour: Boolean,
    typeJour: String,
    discriptif: String
  });

  activite.save(err => {
    if (err) {
      console.log("voici lerror", err);
    }
    res.status(200).json(rapportActivite);
  });
});
module.exports = Router;
