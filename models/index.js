const Application = require("./Application");
const Authorization = require("./Authorization");
const Log = require("./Log");

const mongoose = require('mongoose');
const timestampSchema = require("./TimestampSchema");

const timestampPlugin = (schema) => {
  schema.add(timestampSchema);

  schema.pre("findOneAndUpdate", function (next) {
    this.update({}, { $set: { updated_at: new Date() } });
    next();
  });
};

mongoose.plugin(timestampPlugin);

module.exports = {
  Application,
  Authorization,
  Log,
};
