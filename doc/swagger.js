const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Especifica la versión de OpenAPI (Swagger)
    info: {
      title: "API backend",
      version: "1.0.0",
      description: "Documentación de la API Express utilizando Swagger",
    },
  },
  security: [
    {
      JWT: [],
    },
  ],
  apis: ["./routes/*.js"], // Rutas a tus archivos de definición de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
