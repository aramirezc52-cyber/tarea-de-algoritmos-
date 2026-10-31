//======================================
// IMPORTAR LIBRERÍAS
//======================================

const express = require("express");

const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");



//======================================
// REGISTRAR USUARIO
//======================================

router.post(

    "/",

    usuariosController.registrarUsuario

);



//======================================
// LOGIN
//======================================

router.post(

    "/login",

    usuariosController.loginUsuario

);



//======================================
// EXPORTAR
//======================================

module.exports = router;