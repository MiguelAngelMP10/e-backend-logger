"use strict";
/**
 * Rutas relacionadas con la autorización.
 * @module AuthorizationRoutes
 */
const router = require("express").Router();
const prefix = "/authorization";

/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: Endpoints relacionados con la autorización.
 */

/**
 * @swagger
 * /api/authorization:
 *   post:
 *     summary: Crear una nueva autorización.
 *     description: Crea una nueva autorización para una aplicación.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               application_id:
 *                 type: string
 *                 description: ID de la aplicación.
 *     responses:
 *       201:
 *         description: Autorización creada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: "Token creada correctamente."
 *               data:
 *                 application_id: "6556375a871738cabfdd3a26"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbl9pZCI6IjY1NTYzNzVhODcxNzM4Y2FiZmRkM2EyNiIsImlhdCI6MTcwMDE0OTA5MiwiZXhwIjoxNzAwNzUzODkyfQ.ZWNrctoPhCxUIbQDjNAvd3kz64PbnbsnAEJhhYi4gvo"
 *                 _id: "65563764871738cabfdd3a28"
 *                 created_at: "2023-11-16T15:38:12.970Z"
 *                 updated_at: "2023-11-16T15:38:12.970Z"
 *                 __v: 0
 *
 *       422:
 *         description: "Error: Unprocessable Entity"
 *         content:
 *           application/json:
 *             example:
 *               error: "\"application_id\" is required"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error interno del servidor."
 */

const controller = require("../controllers/authorization.controller");
const { authorizationSchema } = require("../schemas");
const validateData = require("../middleware/validateData");

router.post(`${prefix}/`, validateData(authorizationSchema), controller.create);

module.exports = router;
