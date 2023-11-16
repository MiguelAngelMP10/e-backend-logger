const jwt = require("jsonwebtoken");

/**
 * Clase TokenGenerator para generar tokens JWT.
 * @class
 */
class TokenGenerator {
  /**
   * Crea una instancia de la clase TokenGenerator.
   * @constructor
   */
  constructor() {
    /**
     * Clave secreta utilizada para firmar los tokens JWT.
     * @type {string}
     */
    this.secretKey = process.env.SECRET_KEY;

    /**
     * Tiempo de expiración del token JWT (por defecto, 1 hora).
     * @type {string}
     */
    this.tokenExpiration = "1h";
  }

  /**
   * Genera un token JWT utilizando el payload proporcionado.
   * @param {object} payload - Datos que se incluirán en el token.
   * @returns {string} - Token JWT firmado.
   */
  async generateToken(payload) {
    /**
     * Genera un token JWT firmado.
     * @memberof TokenGenerator
     * @function generateToken
     * @param {object} payload - Datos que se incluirán en el token.
     * @returns {string} - Token JWT firmado.
     */
    const token = await jwt.sign(payload, this.secretKey, {
      expiresIn: this.tokenExpiration,
    });
    return token;
  }
}

/**
 * Exporta la clase TokenGenerator para su uso en otras partes de la aplicación.
 * @module TokenGenerator
 */
module.exports = TokenGenerator;
