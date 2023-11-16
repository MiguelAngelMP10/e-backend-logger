const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  application_id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ["error", "info", "warning"],
  },
  priority: {
    type: String,
    enum: ["lowest", "low", "medium", "high", "highest"],
  },
  path: String,
  message: String,
  request: {
    data: mongoose.Schema.Types.Mixed,
  },
  response: {
    data: mongoose.Schema.Types.Mixed,
  }
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
