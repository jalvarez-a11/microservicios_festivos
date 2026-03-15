const { param, validationResult } = require("express-validator");

exports.validarAnio = [
  param("anio").isInt({ min: 1900, max: 3000 }).withMessage("Año inválido"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errores: errors.array(),
      });
    }

    next();
  },
];
