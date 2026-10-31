//======================================
// IMPORTAR EXPRESS
//======================================

const express = require(
    "express"
);


//======================================
// CREAR ROUTER
//======================================

const router = express.Router();


//======================================
// IMPORTAR CONTROLLER
//======================================

const conductoresController = require(
    "../controllers/conductores.controller"
);


//======================================
// IMPORTAR MIDDLEWARE
//======================================

const { verificarRol } = require(
    "../middleware/auth.middleware"
);



//======================================
// REGISTRAR CONDUCTOR
// SOLO ADMINISTRADOR O CONDUCTOR
//======================================

router.post(

    "/",

    verificarRol([
        "administrador",
        "conductor"
    ]),

    conductoresController.registrarConductor

);



//======================================
// BUSCAR CONDUCTOR POR USUARIO
// SOLO ADMINISTRADOR O CONDUCTOR
//======================================

router.get(

    "/usuario/:idUsuario",

    verificarRol([
        "administrador",
        "conductor"
    ]),

    conductoresController.obtenerConductorPorUsuario

);



//======================================
// EXPORTAR ROUTER
//======================================

module.exports = router;