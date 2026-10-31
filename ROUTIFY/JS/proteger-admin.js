// ==========================================================
// ROUTIFY V2
// PROTECCIÓN PANEL ADMINISTRADOR
// ==========================================================



// ==========================================================
// 1. OBTENER SESIÓN ACTIVA
// ==========================================================


const sesionAdmin = JSON.parse(

    sessionStorage.getItem(
        "sesionROUTIFY"
    )

);





// ==========================================================
// 2. VALIDAR SI EXISTE SESIÓN
// ==========================================================


if(!sesionAdmin){


    window.location.replace(

        "login.html"

    );


}






// ==========================================================
// 3. VERIFICAR ROL ADMINISTRADOR
// ==========================================================


function usuarioEsAdministrador(){


    if(!sesionAdmin){


        return false;


    }



    return (

        sesionAdmin.rol ===
        "administrador"

    );


}






// ==========================================================
// 4. BLOQUEAR ACCESO
// ==========================================================


if(

    sesionAdmin &&

    !usuarioEsAdministrador()

){


    alert(

        "No tienes permisos para acceder al panel administrativo."

    );



    window.location.replace(

        "dashboard-pasajero.html"

    );


}






// ==========================================================
// 5. MOSTRAR NOMBRE ADMINISTRADOR
// ==========================================================


const nombreAdmin =

document.getElementById(

    "nombreAdministrador"

);




if(nombreAdmin){


    nombreAdmin.textContent =

        sesionAdmin.nombre || 
        "Administrador";


}






// ==========================================================
// 6. CERRAR SESIÓN
// ==========================================================


const btnCerrarSesion =

document.getElementById(

    "btnCerrarSesion"

);




if(btnCerrarSesion){


    btnCerrarSesion.addEventListener(

        "click",

        ()=>{


            sessionStorage.removeItem(

                "sesionROUTIFY"

            );


            sessionStorage.removeItem(

                "tokenROUTIFY"

            );


            sessionStorage.removeItem(

                "rolActivoROUTIFY"

            );



            window.location.replace(

                "login.html"

            );


        }

    );


}