const mongoose = require("mongoose");

const timestampSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { _id: false }
);

timestampSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

timestampSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { updated_at: new Date() } });
  next();
});

module.exports = timestampSchema;
