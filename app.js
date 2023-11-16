require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./doc/swagger");


const app = express();
app.use(cors());

// Configura Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/logs.routes"));
app.use("/api", require("./routes/application.routes"));
app.use("/api", require("./routes/authorization.routes"));

module.exports = app;
