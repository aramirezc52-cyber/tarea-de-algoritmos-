// =======================================
// VERIFICAR ROL DE USUARIO
// =======================================


const verificarRol = (rolesPermitidos)=>{


    return(req,res,next)=>{


        const usuario = req.usuario;



        if(!usuario){

            return res.status(401).json({

                mensaje:
                "Usuario no autenticado"

            });

        }



        if(
            !rolesPermitidos.includes(
                usuario.rol
            )
        ){

            return res.status(403).json({

                mensaje:
                "No tienes permisos para acceder"

            });

        }



        next();


    }


}



module.exports = verificarRol;