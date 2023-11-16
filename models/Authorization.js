const mongoose = require("mongoose");
const timestampSchema = require("./TimestampSchema");

const authorizationSchema = new mongoose.Schema({
  application_id: mongoose.Schema.Types.ObjectId,
  token: String,
  ...timestampSchema,
});

const Authorization = mongoose.model("Authorization", authorizationSchema);

module.exports = Authorization;
