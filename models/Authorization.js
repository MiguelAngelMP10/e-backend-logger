const mongoose = require("mongoose");

const authorizationSchema = new mongoose.Schema({
  application_id: mongoose.Schema.Types.ObjectId,
  token: String
});

const Authorization = mongoose.model("Authorization", authorizationSchema);

module.exports = Authorization;
