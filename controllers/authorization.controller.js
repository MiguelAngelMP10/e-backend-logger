"use strinct";
const mongoose = require("mongoose");
const { Authorization } = require("../models");
const TokenGenerator = require("../utils/TokenGenerator");

class AuthorizationController {
  constructor() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
  }

  async create(req, res, next) {
    try {
      const tokenGenerator = new TokenGenerator();

      const userPayload = {
        application_id: req.body.application_id,
      };

      const token = await tokenGenerator.generateToken(userPayload);

      const newAuthorization = new Authorization({
        application_id: req.body.application_id,
        token,
      });
      const AuthorizationSave = await newAuthorization.save();
      res.status(201).json({
        message: "Token creada correctamente.",
        data: AuthorizationSave,
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
}

module.exports = new AuthorizationController();
