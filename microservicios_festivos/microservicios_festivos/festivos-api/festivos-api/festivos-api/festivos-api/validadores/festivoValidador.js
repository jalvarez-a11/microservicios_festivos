const { param, validationResult } = require("express-validator");

exports.validarFecha = [
  param("anio")
    .isInt({ min: 1900, max: 3000 })
    .withMessage("El año debe ser válido"),

  param("mes")
    .isInt({ min: 1, max: 12 })
    .withMessage("El mes debe estar entre 1 y 12"),

  param("dia")
    .isInt({ min: 1, max: 31 })
    .withMessage("El día debe estar entre 1 y 31"),

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
const express = require("express");
const router = express.Router();

const festivosController = require("../controllers/festivosController");
const festivoValidator = require("../validators/festivoValidator");

router.get(
  "/verificar/:anio/:mes/:dia",
  festivoValidator.validarFecha,
  festivosController.verificarFestivo,
);

module.exports = router;
