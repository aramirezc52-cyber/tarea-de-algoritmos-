//======================================
// MIDDLEWARE DE AUTORIZACIÓN ROUTIFY
//======================================


//======================================
// VERIFICAR ROL
//======================================

const verificarRol = (rolesPermitidos)=>{


    return (req,res,next)=>{


        const usuario = req.body.usuario || req.usuario;


        if(!usuario){

            return res.status(401).json({

                mensaje:"Usuario no autenticado"

            });

        }



        if(
            !rolesPermitidos.includes(
                usuario.rol
            )
        ){

            return res.status(403).json({

                mensaje:
                "No tienes permisos para acceder a esta sección"

            });

        }



        next();


    };


};



module.exports = {

    verificarRol

};