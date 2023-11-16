"use strict";

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Endpoints relacionados con la gestión de aplicaciones.
 */

/**
 * @swagger
 * /api/application:
 *   post:
 *     summary: Crear una nueva aplicación.
 *     description: Crea una nueva aplicación con la información proporcionada.
 *     tags: [Application]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la aplicación.
 *                 example: Mi Aplicación 1
 *     responses:
 *       201:
 *         description: Aplicación creada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: "Aplicación creada correctamente."
 *               data:
 *                 name: "Mi Aplicación 1"
 *                 _id: "65563815871738cabfdd3a31"
 *                 created_at: "2023-11-16T15:41:09.812Z"
 *                 updated_at: "2023-11-16T15:41:09.812Z"
 *                 __v: 0
 *
 *       422:
 *         description: "Error: Unprocessable Entity"
 *         content:
 *           application/json:
 *              example:
 *                  errors:
 *                     field: "name"
 *                     message: "\"name\" is required"
 *                      
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error interno del servidor."
 */

const router = require("express").Router();
const { applicationSchema } = require("../schemas");
const validateData = require("../middleware/validateData");
const controller = require("../controllers/application.controller");
const prefix = "/application";

router.post(`${prefix}/`, validateData(applicationSchema), controller.create);

module.exports = router;
