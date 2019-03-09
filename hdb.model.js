const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Hdb = new Schema({
  project: String,
  units: Array
});

module.exports = mongoose.model("Hdb", Hdb);