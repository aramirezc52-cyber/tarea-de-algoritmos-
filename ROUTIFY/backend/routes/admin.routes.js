//======================================
// IMPORTAR EXPRESS
//======================================

const express = require("express");

const router = express.Router();


//======================================
// IMPORTAR CONTROLLER
//======================================

const adminController = require(
    "../controllers/admin.controller"
);



//======================================
// USUARIOS
//======================================

router.get(
    "/usuarios",
    adminController.obtenerUsuarios
);



//======================================
// CONDUCTORES
//======================================

router.get(
    "/conductores",
    adminController.obtenerConductores
);



//======================================
// BUSES
//======================================

router.get(
    "/buses",
    adminController.obtenerBuses
);



//======================================
// RUTAS
//======================================

router.get(
    "/rutas",
    adminController.obtenerRutas
);



//======================================
// ALERTAS
//======================================

router.get(
    "/alertas",
    adminController.obtenerAlertas
);



//======================================
// EXPORTAR
//======================================

module.exports = router;