const mongoose = require("mongoose");
const timestampSchema = require("./TimestampSchema");

const applicationSchema = new mongoose.Schema({
  name: String,
  ...timestampSchema,
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
