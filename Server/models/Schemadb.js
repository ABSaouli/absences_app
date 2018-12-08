let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = Schema({
  _id: Schema.Types.ObjectId,
  mail: String,
  password: String
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
  dateDebutContart: Date,
  id_user: { type: Schema.Types.ObjectId, ref: "users" }
});

let absenceSchema = Schema({
  dateDebut: Date,
  dateFin: Date,
  typeAbsence: String,
  reponse: Boolean,
  id_consultant: { type: Schema.Types.ObjectId, ref: "consultant" }
});

let users = mongoose.model("users", usersSchema);
let responsable = mongoose.model("responsable", responsableSchema);
let consultant = mongoose.model("consultant", consultantSchema);
let absence = mongoose.model("absence", absenceSchema);

module.exports = {
  consultant: consultant,
  absence: absence,
  users: users,
  responsable: responsable
};
