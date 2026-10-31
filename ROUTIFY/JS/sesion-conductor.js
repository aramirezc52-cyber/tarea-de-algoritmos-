// ==========================================================
// ROUTIFY V2
// CONTROL DE SESIÓN - CONDUCTOR
// ==========================================================


// ==========================================================
// 1. OBTENER SESIÓN ACTIVA
// ==========================================================

const sesionConductor = JSON.parse(

    sessionStorage.getItem(
        "sesionROUTIFY"
    )

);


// ==========================================================
// 2. OBTENER ROL ACTIVO
// ==========================================================

const rolActivoConductor =

    sessionStorage.getItem(
        "rolActivoROUTIFY"
    );


// ==========================================================
// 3. PROTEGER DASHBOARD
// ==========================================================

if(!sesionConductor){

    window.location.replace(
        "login.html"
    );

}


// ==========================================================
// 4. COMPROBAR SI EL USUARIO ES CONDUCTOR
// ==========================================================

function usuarioTieneRolConductor(){

    if(!sesionConductor){

        return false;

    }


    // ======================================================
    // ROL INDIVIDUAL DEL BACKEND
    // ======================================================

    if(
        sesionConductor.rol ===
        "conductor"
    ){

        return true;

    }


    // ======================================================
    // ARREGLO DE ROLES
    // ======================================================

    if(
        Array.isArray(
            sesionConductor.roles
        ) &&
        sesionConductor.roles.includes(
            "conductor"
        )
    ){

        return true;

    }


    // ======================================================
    // INDICADOR DE CONDUCTOR
    // ======================================================

    if(
        sesionConductor.esConductor ===
        true
    ){

        return true;

    }


    // ======================================================
    // INFORMACIÓN DEL CONDUCTOR
    // ======================================================

    if(
        sesionConductor.conductor &&
        sesionConductor.conductor.estado ===
        "activo"
    ){

        return true;

    }


    return false;

}


// ==========================================================
// 5. VALIDAR ACCESO
// ==========================================================

function tieneAccesoConductor(){

    if(!sesionConductor){

        return false;

    }

    return (
        sesionConductor.rol ===
        "conductor" ||
        sesionConductor.rol ===
        "administrador"
    );

}

// ==========================================================
// 6. BLOQUEAR PASAJEROS
// ==========================================================

if(sesionConductor){

    if(!tieneAccesoConductor()){

        alert(
            "No tienes permisos para acceder al panel de conductor."
        );

        window.location.replace(
            "seleccion.html"
        );
    }
}
// ==========================================================
// 6. VALIDAR PANEL ACTIVO
// ==========================================================

if(
    sesionConductor &&
    tieneAccesoConductor() &&
    rolActivoConductor !== "conductor"
){
    sessionStorage.setItem(
        "rolActivoROUTIFY",
        "conductor"
    );
}


// ==========================================================
// 7. OBTENER NOMBRE
// ==========================================================

const nombreConductor =

    sesionConductor?.nombre ||

    sesionConductor?.name ||

    "Conductor";


// ==========================================================
// 8. NOMBRE EN SIDEBAR
// ==========================================================

const nombreUsuarioConductor =

document.getElementById(
    "nombreUsuario"
);


if(nombreUsuarioConductor){

    nombreUsuarioConductor.textContent =

        nombreConductor;

}


// ==========================================================
// 9. NOMBRE EN TOPBAR
// ==========================================================

const nombreTopbarConductor =

document.getElementById(
    "nombreTopbar"
);


if(nombreTopbarConductor){

    nombreTopbarConductor.textContent =

        nombreConductor;

}


// ==========================================================
// 10. PRIMER NOMBRE
// ==========================================================

const primerNombreConductor =

    nombreConductor
        .trim()
        .split(" ")[0];


// ==========================================================
// 11. NOMBRE DE BIENVENIDA
// ==========================================================

const nombreBienvenidaConductor =

document.getElementById(
    "nombreBienvenida"
);


if(nombreBienvenidaConductor){

    nombreBienvenidaConductor.textContent =

        primerNombreConductor;

}


// ==========================================================
// 12. MOSTRAR FECHA ACTUAL
// ==========================================================

const fechaActualHTML =

document.getElementById(
    "fechaActual"
);


if(fechaActualHTML){

    const fecha = new Date();


    fechaActualHTML.textContent =

        fecha.toLocaleDateString(

            "es-GT",

            {

                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"

            }

        );

}


// ==========================================================
// 13. FUNCIÓN CERRAR SESIÓN
// ==========================================================

function cerrarSesionConductor(){

    // ======================================================
    // ELIMINAR SESIÓN
    // ======================================================

    sessionStorage.removeItem(
        "sesionROUTIFY"
    );


    // ======================================================
    // ELIMINAR TOKEN
    // ======================================================

    sessionStorage.removeItem(
        "tokenROUTIFY"
    );


    // ======================================================
    // ELIMINAR ROL ACTIVO
    // ======================================================

    sessionStorage.removeItem(
        "rolActivoROUTIFY"
    );


    // ======================================================
    // REGRESAR AL LOGIN
    // ======================================================

    window.location.replace(
        "login.html"
    );

}


// ==========================================================
// 14. BOTÓN CERRAR SESIÓN
// ==========================================================

const btnCerrarSesionConductor =

document.getElementById(
    "btnCerrarSesion"
);


if(btnCerrarSesionConductor){

    btnCerrarSesionConductor.addEventListener(

        "click",

        cerrarSesionConductor

    );

}