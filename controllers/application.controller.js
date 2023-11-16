"use strinct";
const mongoose = require("mongoose");
const { Application } = require("../models");

class ApplicationController {
  constructor() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
  }

  async create(req, res, next) {
    try {
      const newApplication = new Application({ name: req.body.name });
      const applicationSave = await newApplication.save();
      res.status(201).json({
        message: "Aplicación creada correctamente.",
        data: applicationSave,
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
}

module.exports = new ApplicationController();
