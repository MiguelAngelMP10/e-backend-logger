"use strict";

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 * tags:
 *   name: Logs
 *   description: Endpoints relacionados con registros de logs.
 */

const router = require("express").Router();
const auth = require("../middleware/auth");
const prefix = "/logs";
const { logsCreateSchema, logsUpdateSchema } = require("../schemas");
const validateData = require("../middleware/validateData");

const controller = require("../controllers/logs.controller");

/**
 * @swagger
 * components:
 *   responses:
 *     Error204:
 *       description: "No Content."
 *     Error400:
 *       description: "Error: Bad Request."
 *       content:
 *         application/json:
 *           example:
 *             message: "Access denied. No token provided."
 *     Error403:
 *       description: "Error: Forbidden."
 *       content:
 *         application/json:
 *           example:
 *             message: "Access denied. Invalid token format."
 *     Error404:
 *       description: "Error: Not Found."
 *       content:
 *         application/json:
 *           example:
 *              message: "Registro de log no encontrado."
 *     Error500:
 *       description: Internal Server Error.
 *       content:
 *         application/json:
 *           example:
 *              message: "Internal Server Error."
 *
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Obtener todos los logs.
 *     description: Obtiene todos los registros de logs.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Éxito. Retorna todos los logs.
 *         content:
 *           application/json:
 *             example:
 *               message: "Registros de logs obtenidos correctamente."
 *               data:
 *                 - _id: "65563779871738cabfdd3a2b"
 *                   application_id: "6556375a871738cabfdd3a26"
 *                   type: "info"
 *                   priority: "medium"
 *                   path: "/ruta/ejemplo"
 *                   message: "Este es un mensaje de ejemplo"
 *                   created_at: "2023-11-16T15:38:33.992Z"
 *                   updated_at: "2023-11-16T15:38:33.993Z"
 *                   __v: 0
 *                   request:
 *                     data:
 *                       marcadores:
 *                         - latitude: 40.416875
 *                           longitude: -3.703308
 *                           city: "Madrid"
 *                           description: "Puerta del Sol"
 *                         - latitude: 40.417438
 *                           longitude: -3.693363
 *                           city: "Madrid"
 *                           description: "Paseo del Prado"
 *                         - latitude: 40.407015
 *                           longitude: -3.691163
 *                           city: "Madrid"
 *                           description: "Estación de Atocha"
 *                   response:
 *                     data:
 *                       result: "success"
 *
 *       400:
 *         $ref: '#/components/responses/Error400'
 *       403:
 *         $ref: '#/components/responses/Error403'
 *       500:
 *         $ref: '#/components/responses/Error500'
 *
 */
router.get(`${prefix}/`, auth, controller.all);

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary:  Crear una nuevo registro en logs.
 *     description: Crea una nuevo registro con los datos proporcionados.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [info, error, warning]
 *                 description: Tipo de log.
 *               priority:
 *                 type: string
 *                 enum: [lowest, low, medium, high, highest]
 *                 description: Prioridad del log.
 *               path:
 *                 type: string
 *                 description: Ruta asociada al log.
 *               message:
 *                 type: string
 *                 description: Mensaje del log.
 *               request:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *               response:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       result:
 *                         type: string
 *     responses:
 *       201:
 *         description: Log guardado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Log guardado correctamente."
 *               data:
 *                 application_id: "6556375a871738cabfdd3a26"
 *                 type: "info"
 *                 priority: "medium"
 *                 path: "/ruta/ejemplo"
 *                 message: "Este es un mensaje de ejemplo"
 *                 request:
 *                   data:
 *                     marcadores:
 *                       - latitude: 40.416875
 *                         longitude: -3.703308
 *                         city: "Madrid"
 *                         description: "Puerta del Sol"
 *                 response:
 *                   data:
 *                     result: "success"
 *                 _id: "65565e2fe7b3ccc226e0972d"
 *                 created_at: "2023-11-16T18:23:43.453Z"
 *                 updated_at: "2023-11-16T18:23:43.456Z"
 *                 __v: 0
 *
 *       400:
 *         $ref: '#/components/responses/Error400'
 *       422:
 *         description: "Error: Unprocessable Entity"
 *         content:
 *           application/json:
 *              example:
 *                  errors:
 *                   - field: type
 *                     message: "\"type\" is required"
 *                   - field: priority
 *                     message: "\"priority\" is required"
 *                   - field: path
 *                     message: "\"path\" is required"
 *                   - field: message
 *                     message: "\"message\" is required"
 *                   - field: type
 *                     message: "\"type\" must be one of [error, info, warning]"
 *                   - field: priority
 *                     message: "\"priority\" must be one of [lowest, low, medium, high, highest]"
 *
 *       403:
 *         $ref: '#/components/responses/Error403'
 *       500:
 *         $ref: '#/components/responses/Error500'
 *
 */
router.post(
  `${prefix}/`,
  auth,
  validateData(logsCreateSchema),
  controller.create
);

/**
 * @swagger
 * /api/logs/{id}:
 *   get:
 *     summary: Obtener información detallada de un log por ID.
 *     description: Obtiene información detallada de una log según su ID.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la log a obtener.
 *         schema:
 *           type: string
 *         example: "65563764871738cabfdd3a28"
 *     responses:
 *       200:
 *         description: Éxito. Retorna información detallada de un log.
 *         content:
 *           application/json:
 *             example:
 *               message: "Información del registro de log."
 *               data:
 *                 request:
 *                   data:
 *                     key: "string"
 *                 response:
 *                   data:
 *                     result: "string"
 *                 _id: "6556612db97e3b5148acda0c"
 *                 application_id: "6556375a871738cabfdd3a26"
 *                 type: "info"
 *                 priority: "lowest"
 *                 path: "string"
 *                 message: "string"
 *                 created_at: "2023-11-16T18:36:29.783Z"
 *                 updated_at: "2023-11-16T18:36:29.785Z"
 *                 __v: 0
 *       400:
 *         $ref: '#/components/responses/Error400'
 *       403:
 *         $ref: '#/components/responses/Error403'
 *       404:
 *         $ref: '#/components/responses/Error404'
 *       500:
 *         $ref: '#/components/responses/Error500'
 */

router.get(`${prefix}/:id`, auth, controller.info);

/**
 * @swagger
 * /api/logs/{id}:
 *   put:
 *     summary: Actualizar un registro de log por ID.
 *     description: Actualiza un registro de log según su ID con los datos proporcionados.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de log a actualizar.
 *         schema:
 *           type: string
 *         example: "6556612db97e3b5148acda0c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [info, error, warning]
 *                 description: Tipo de log.
 *               priority:
 *                 type: string
 *                 enum: [lowest, low, medium, high, highest]
 *                 description: Prioridad del log.
 *               path:
 *                 type: string
 *                 description: Ruta asociada al log.
 *               message:
 *                 type: string
 *                 description: Mensaje del log.
 *               request:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *               response:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       result:
 *                         type: string
 *             example:
 *               type: "info"
 *               priority: "medium"
 *               path: "/ruta/ejemplo"
 *               message: "Este es un mensaje de ejemplo"
 *               request:
 *                 data:
 *                   key: "value"
 *               response:
 *                 data:
 *                   result: "success"
 *     responses:
 *       200:
 *         description: Éxito. Retorna el registro de log actualizado.
 *         content:
 *           application/json:
 *             example:
 *               message: "Registro de log actualizado correctamente."
 *               data:
 *                 request:
 *                   data:
 *                     key: "string"
 *                 response:
 *                   data:
 *                     result: "string"
 *                 _id: "6556612db97e3b5148acda0c"
 *                 application_id: "6556375a871738cabfdd3a26"
 *                 type: "info"
 *                 priority: "lowest"
 *                 path: "string"
 *                 message: "string"
 *                 created_at: "2023-11-16T18:36:29.783Z"
 *                 updated_at: "2023-11-16T18:36:29.785Z"
 *                 __v: 0
 *       400:
 *         $ref: '#/components/responses/Error400'
 *       403:
 *         $ref: '#/components/responses/Error403'
 *       404:
 *         $ref: '#/components/responses/Error404'
 *       422:
 *         description: "Error: Unprocessable Entity"
 *         content:
 *           application/json:
 *              example:
 *                  errors:
 *                   - field: type
 *                     message: "\"type\" must be one of [error, info, warning]"
 *                   - field: priority
 *                     message: "\"priority\" must be one of [lowest, low, medium, high, highest]"
 *       500:
 *         $ref: '#/components/responses/Error500'
 */
router.put(
  `${prefix}/:id`,
  auth,
  validateData(logsUpdateSchema),
  controller.update
);

/**
 * @swagger
 * /api/logs/{id}:
 *   delete:
 *     summary: Eliminar un registro de log por ID.
 *     description: Elimina un registro de log según su ID.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de log a eliminar.
 *         schema:
 *           type: string
 *         example: "6556612db97e3b5148acda0c"
 *     responses:
 *       204:
 *         $ref: '#/components/responses/Error204'
 *       400:
 *         $ref: '#/components/responses/Error400'
 *       403:
 *         $ref: '#/components/responses/Error403'
 *       404:
 *         $ref: '#/components/responses/Error404'
 *       500:
 *         $ref: '#/components/responses/Error500'
 */
router.delete(`${prefix}/:id`, auth, controller.delete);

module.exports = router;
