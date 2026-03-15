const express = require("express");//Crea el router de Express para definir las rutas relacionadas con los festivos.

const router = express.Router();//Importa el controlador que se encargará de manejar las solicitudes relacionadas con los festivos.

const festivosController = require("../controllers/festivosController");

router.get("/verificar/:anio/:mes/:dia", festivosController.verificarFestivo);

router.get("/obtener/:anio", festivosController.listarFestivos);

module.exports = router; //Exporta el router para que pueda ser utilizado en otras partes de la aplicación