//======================================
// IMPORTAR MODELO
//======================================

const Conductor = require(

    "../models/conductores.model"

);


//======================================
// REGISTRAR CONDUCTOR
//======================================

const registrarConductor = (

    req,
    res

) => {


    const {

        id_usuario,
        licencia,
        tipo_licencia

    } = req.body;


    //==================================
    // VALIDAR DATOS
    //==================================

    if(

        !id_usuario ||
        !licencia ||
        !tipo_licencia

    ){

        return res.status(400).json({

            mensaje:
                "Todos los datos del conductor son obligatorios"

        });

    }


    //==================================
    // COMPROBAR SI YA ES CONDUCTOR
    //==================================

    Conductor.buscarPorUsuario(

        id_usuario,

        (error, resultado) => {


            if(error){

                console.log(

                    "Error buscando conductor:",

                    error

                );


                return res.status(500).json({

                    mensaje:
                        "Error del servidor"

                });

            }


            //==================================
            // YA ESTÁ REGISTRADO
            //==================================

            if(resultado.length > 0){

                return res.status(409).json({

                    mensaje:
                        "Este usuario ya está registrado como conductor"

                });

            }


            //==================================
            // DATOS PARA REGISTRAR
            //==================================

            const datosConductor = {

                id_usuario:
                    id_usuario,

                licencia:
                    licencia,

                tipo_licencia:
                    tipo_licencia

            };


            //==================================
            // REGISTRAR
            //==================================

            Conductor.registrarConductor(

                datosConductor,

                (errorRegistro, resultadoRegistro) => {


                    if(errorRegistro){

                        console.log(

                            "Error registrando conductor:",

                            errorRegistro

                        );


                        return res.status(500).json({

                            mensaje:
                                "Error al registrar conductor"

                        });

                    }


                    //==================================
                    // RESPUESTA
                    //==================================

                    return res.status(201).json({

                        mensaje:
                            "Conductor registrado correctamente",

                        conductor:{

                            id:
                                resultadoRegistro.insertId,

                            id_usuario:
                                id_usuario,

                            licencia:
                                licencia,

                            tipo_licencia:
                                tipo_licencia,

                            estado:
                                "activo"

                        }

                    });

                }

            );

        }

    );

};


//======================================
// OBTENER CONDUCTOR POR USUARIO
//======================================

const obtenerConductorPorUsuario = (

    req,
    res

) => {


    const idUsuario =

        req.params.idUsuario;


    //==================================
    // VALIDAR ID
    //==================================

    if(!idUsuario){

        return res.status(400).json({

            mensaje:
                "El ID del usuario es obligatorio"

        });

    }


    //==================================
    // BUSCAR EN MYSQL
    //==================================

    Conductor.buscarPorUsuario(

        idUsuario,

        (error, resultado) => {


            if(error){

                console.log(

                    "Error buscando conductor:",

                    error

                );


                return res.status(500).json({

                    mensaje:
                        "Error del servidor"

                });

            }


            //==================================
            // NO ES CONDUCTOR
            //==================================

            if(resultado.length === 0){

                return res.status(404).json({

                    mensaje:
                        "El usuario no está registrado como conductor"

                });

            }


            //==================================
            // CONDUCTOR ENCONTRADO
            //==================================

            return res.status(200).json({

                mensaje:
                    "Conductor encontrado",

                conductor:
                    resultado[0]

            });

        }

    );

};


//======================================
// EXPORTAR FUNCIONES
//======================================

module.exports = {

    registrarConductor,

    obtenerConductorPorUsuario

};