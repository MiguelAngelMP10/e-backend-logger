const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
