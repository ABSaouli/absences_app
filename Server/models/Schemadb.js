let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = Schema({
  _id: Schema.Types.ObjectId,
  mail: String,
  password: String,
  typeUser: String
});

let responsableSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  surname: String,
  mail: String,
  age: Number,
  id_user: { type: Schema.Types.ObjectId, ref: "users" }
});

let consultantSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  surname: String,
  mail: String,
  age: Number,
  nbJours: Number,
  jourAbsence: Number,
  jourIntercontrat: Number,
  dateDebutContart: Date,
  Rib: Object,
  id_user: { type: Schema.Types.ObjectId, ref: "users" }
});

let absenceSchema = Schema({
  dateDebut: String,
  dateFin: String,
  typeAbsence: String,
  reponse: Boolean,
  id_consultant: { type: Schema.Types.ObjectId, ref: "consultant" }
});

let projectSchema = Schema({
  title: String,
  discriptif: String,
  consultant_list: Array,
  responsableId: { type: Schema.Types.ObjectId, ref: "responsable" }
});

let projetConsultantSchema = Schema({
  name: String,
  disctriptif: String,
  client: String,
  consutantId: { type: Schema.Types.ObjectId, ref: "consultant" },
  projetId: { type: Schema.Types.ObjectId, ref: "responsable" }
});

let rapportActiviteSchema = Schema({
  _id: Schema.Types.ObjectId,
  commentaire: String,
  soumis: Boolean,
  dateSoumission: Date,
  date: Date,
  file: Object,
  fileContentType: Object,
  activites: Array,
  responsabletId: { type: Schema.Types.ObjectId, ref: "responsable" }
});

let activiteSchema = Schema({
  _id: Schema.Types.ObjectId,
  date: Date,
  heureDebut: String,
  nbHeures: Number,
  type: String,
  rapportActiviteId: { type: Schema.Types.ObjectId, ref: "rapportActivite" }
});

let users = mongoose.model("users", usersSchema);
let responsable = mongoose.model("responsable", responsableSchema);
let consultant = mongoose.model("consultant", consultantSchema);
let absence = mongoose.model("absence", absenceSchema);
let project = mongoose.model("project", projectSchema);
let projetConsultant = mongoose.model(
  "projetConsultant",
  projetConsultantSchema
);
let rapportActivite = mongoose.model("rapportActivite", rapportActiviteSchema);
let activite = mongoose.model("activite", activiteSchema);

module.exports = {
  consultant: consultant,
  absence: absence,
  users: users,
  responsable: responsable,
  project: project,
  projetConsultant: projetConsultant,
  rapportActivite: rapportActivite,
  activite: activite
};
