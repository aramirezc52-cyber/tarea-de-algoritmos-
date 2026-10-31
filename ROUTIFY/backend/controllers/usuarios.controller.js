//======================================
// IMPORTAR MODELO
//======================================

const Usuario = require("../models/usuarios.model");



//======================================
// REGISTRAR USUARIO
//======================================

const registrarUsuario = (req, res) => {

    const datos = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password,
        telefono: req.body.telefono,
        rol: "pasajero"
    };



    Usuario.registrarUsuario(

        datos,

        (error, resultado) => {

            if (error) {

                console.log(error);

                return res.status(500).json({

                    mensaje: "Error al registrar usuario"

                });

            }



            res.status(201).json({

                mensaje: "Usuario registrado correctamente",

                id: resultado.insertId

            });

        }

    );

};

//======================================
// LOGIN DE USUARIO
//======================================

const loginUsuario = (req, res) => {

    const { correo, password } = req.body;

    Usuario.buscarPorCorreo(

        correo,

        (error, resultado) => {

            if (error) {

                console.log(error);

                return res.status(500).json({

                    mensaje: "Error del servidor"

                });

            }



            if (resultado.length === 0) {

                return res.status(401).json({

                    mensaje: "Correo o contraseña incorrectos"

                });

            }



            const usuario = resultado[0];



            if (usuario.password !== password) {

                return res.status(401).json({

                    mensaje: "Correo o contraseña incorrectos"

                });

            }



            res.status(200).json({

                mensaje: "Inicio de sesión correcto",

                usuario: {

                    id: usuario.id,

                    nombre: usuario.nombre,

                    correo: usuario.correo,

                    telefono: usuario.telefono,

                    rol: usuario.rol

                }

            });

        }

    );

};


//======================================
// EXPORTAR FUNCIONES
//======================================

module.exports = {

    registrarUsuario,

    loginUsuario

};