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

let absanceSchema = Schema({
  dateDebut: Date,
  dateFin: Date,
  type: String,
  reponse: Boolean,
  id_consultan: { type: Schema.Types.ObjectId, ref: "consultant" }
});

let users = mongoose.model("users", usersSchema);
let responsable = mongoose.model("responsable", responsableSchema);
let consultant = mongoose.model("consultant", consultantSchema);
let absance = mongoose.model("absance", absanceSchema);

module.exports = {
  consultant: consultant,
  absance: absance,
  users: users,
  responsable: responsable
};
