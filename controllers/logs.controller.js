"use strinct";
const mongoose = require("mongoose");
const { Application, Authorization, Log } = require("../models");
class LogsController {
  constructor() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
  }

  async all(req, res, next) {
    try {
      const logs = await Log.find({
        application_id: req.token_decoded.application_id,
      });
      res.json({ message: "Todos los registros de logs.", data: logs });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let application_id = req.token_decoded.application_id;

      const nuevoLog = new Log({ ...req.body, application_id });

      const logGuardado = await nuevoLog.save();
      res
        .status(201)
        .json({ message: "Log guardado correctamente.", data: logGuardado });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }

  async info(req, res, next) {
    try {
      const id = req.params.id;
      let application_id = req.token_decoded.application_id;

      const log = await Log.findOne({ _id: id, application_id });

      // Verificar si se encontró el registro de log
      if (!log) {
        return res
          .status(404)
          .json({ message: "Registro de log no encontrado." });
      }

      res.json({ message: "Información del registro de log.", data: log });
    } catch (error) {
      res.json({ message: "Erros." + error });
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      // Obtener el ID del registro de log a actualizar
      const logId = req.params.id;
      
      let application_id = req.token_decoded.application_id;

      const updatedLog = await Log.findOneAndUpdate(
        { _id: logId, application_id },
        { $set: req.body },
        { new: true } // Para devolver el documento actualizado
      );

      if (!updatedLog) {
        return res
          .status(404)
          .json({ message: "Registro de log no encontrado." });
      }

      res.json({
        message: "Registro de log actualizado correctamente.",
        data: updatedLog,
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      // Obtener el ID del registro de log a eliminar
      const logId = req.params.id;

      // Verificar si el registro de log existe
      let application_id = req.token_decoded.application_id;

      const log = await Log.findOne({ _id: logId, application_id });

      if (!log) {
        return res
          .status(404)
          .json({ message: "Registro de log no encontrado." });
      }

      // Eliminar el registro de log de la base de datos
      await Log.deleteOne({ _id: logId, application_id });

      // Enviar una respuesta JSON indicando que el registro se eliminó correctamente
      res
        .status(204)
        .json({ message: "Registro de log eliminado correctamente." });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
}

module.exports = new LogsController();
