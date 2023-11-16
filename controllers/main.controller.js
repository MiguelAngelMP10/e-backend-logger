"use strinct";
const mongoose = require("mongoose");
const { Application, Authorization, Log } = require("../models");
class MainController {
  constructor() {
    mongoose.connect("mongodb://localhost:27017");
  }

  async all(req, res, next) {
    try {
      const logs = await Log.find();
      res.json({ message: "Todos los registros de logs.", data: logs });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const nuevoLog = new Log(req.body);
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
      const log = await Log.findById(id);

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

      const updatedLog = await Log.findOneAndUpdate(
        { _id: logId },
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
      const log = await Log.findById(logId);
      if (!log) {
        return res
          .status(404)
          .json({ message: "Registro de log no encontrado." });
      }

      // Eliminar el registro de log de la base de datos
      await Log.deleteOne({ _id: logId });

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

module.exports = new MainController();
