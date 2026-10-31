//======================================
// ROUTIFY
// CONTROL DE ACCESO POR ROLES
//======================================


//======================================
// OBTENER SESIÓN
//======================================

const usuarioActivo =
JSON.parse(
    sessionStorage.getItem(
        "sesionROUTIFY"
    )
);



const btnPasajero =
document.getElementById(
    "btnPasajero"
);



const btnConductor =
document.getElementById(
    "btnConductor"
);



const nombreUsuario =
document.getElementById(
    "nombreUsuario"
);



const btnCerrarSesion =
document.getElementById(
    "btnCerrarSesion"
);



//======================================
// VALIDAR USUARIO
//======================================

if(!usuarioActivo){

    window.location.href =
    "login.html";

}



//======================================
// MOSTRAR NOMBRE
//======================================

if(
    usuarioActivo &&
    nombreUsuario
){

    nombreUsuario.textContent =
    usuarioActivo.nombre;

}



//======================================
// BOTÓN PASAJERO
//======================================

if(btnPasajero){

    btnPasajero.addEventListener(
        "click",
        function(){


            if(
                usuarioActivo.rol === "pasajero" ||
                usuarioActivo.rol === "conductor" ||
                usuarioActivo.rol === "administrador"
            ){


                sessionStorage.setItem(
                    "rolActivoROUTIFY",
                    "pasajero"
                );


                window.location.href =
                "dashboard-pasajero.html";


            }


        }
    );

}




//======================================
// BOTÓN CONDUCTOR
//======================================

if(btnConductor){

    btnConductor.addEventListener(
        "click",
        function(){


            if(
                usuarioActivo.rol !== "conductor" &&
                usuarioActivo.rol !== "administrador"
            ){


                alert(
                    "No tienes permisos para ingresar como conductor."
                );


                return;


            }



            sessionStorage.setItem(
                "rolActivoROUTIFY",
                "conductor"
            );



            window.location.href =
            "dashboard-conductor.html";


        }
    );

}




//======================================
// CERRAR SESIÓN
//======================================

if(btnCerrarSesion){

    btnCerrarSesion.addEventListener(
        "click",
        function(){


            sessionStorage.removeItem(
                "sesionROUTIFY"
            );


            sessionStorage.removeItem(
                "rolActivoROUTIFY"
            );


            sessionStorage.removeItem(
                "tokenROUTIFY"
            );



            window.location.href =
            "login.html";


        }
    );

}