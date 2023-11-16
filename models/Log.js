const mongoose = require("mongoose");
const timestampSchema = require("./TimestampSchema");

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
  },
  ...timestampSchema,
});

// Middleware para actualizar created_at y updated_at antes de guardar
logSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

// Middleware para actualizar updated_at antes de actualizar con findOneAndUpdate
logSchema.pre("findOneAndUpdate", function (next) {
  const currentDate = new Date();
  this.findOneAndUpdate({}, { $set: { updated_at: currentDate } });
  next();
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
