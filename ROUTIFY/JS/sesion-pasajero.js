// ==========================================================
// ROUTIFY V2
// CONTROL DE SESIÓN - PASAJERO
// ==========================================================


// ==========================================================
// 1. OBTENER SESIÓN ACTIVA
// ==========================================================

const sesionPasajero = JSON.parse(

    sessionStorage.getItem(

        "sesionROUTIFY"

    )

);


// ==========================================================
// 2. OBTENER ROL ACTIVO
// ==========================================================

const rolActivoPasajero =

    sessionStorage.getItem(

        "rolActivoROUTIFY"

    );


// ==========================================================
// 3. PROTEGER DASHBOARD
// ==========================================================

if(!sesionPasajero){

    window.location.replace(

        "login.html"

    );

}


// ==========================================================
// 4. VALIDAR ACCESO COMO PASAJERO
// ==========================================================

if(

    sesionPasajero &&

    rolActivoPasajero !== "pasajero"

){

    window.location.replace(

        "seleccion.html"

    );

}


// ==========================================================
// 5. OBTENER NOMBRE DEL USUARIO
// ==========================================================

const nombrePasajero =

    sesionPasajero?.nombre ||

    sesionPasajero?.name ||

    "Pasajero";


// ==========================================================
// 6. NOMBRE EN SIDEBAR
// ==========================================================

const nombreSidebar =

document.getElementById(

    "nombreUsuario"

);


if(nombreSidebar){

    nombreSidebar.textContent =

        nombrePasajero;

}


// ==========================================================
// 7. NOMBRE EN TOPBAR
// ==========================================================

const nombreTopbar =

document.getElementById(

    "nombreTopbar"

);


if(nombreTopbar){

    nombreTopbar.textContent =

        nombrePasajero;

}


// ==========================================================
// 8. NOMBRE EN MENÚ DE PERFIL
// ==========================================================

const nombreMenuPerfil =

document.getElementById(

    "nombreMenuPerfil"

);


if(nombreMenuPerfil){

    nombreMenuPerfil.textContent =

        nombrePasajero;

}


// ==========================================================
// 9. PRIMER NOMBRE PARA BIENVENIDA
// ==========================================================

const primerNombre =

    nombrePasajero
        .trim()
        .split(" ")[0];


const nombreBienvenida =

document.getElementById(

    "nombreBienvenida"

);


if(nombreBienvenida){

    nombreBienvenida.textContent =

        primerNombre;

}


// ==========================================================
// 10. FUNCIÓN CERRAR SESIÓN
// ==========================================================

function cerrarSesionROUTIFY(){

    // ======================================================
    // ELIMINAR USUARIO
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
// 11. CERRAR SESIÓN DESDE SIDEBAR
// ==========================================================

const btnCerrarSesionSidebar =

document.getElementById(

    "btncerrarSesion"

);


if(btnCerrarSesionSidebar){

    btnCerrarSesionSidebar.addEventListener(

        "click",

        cerrarSesionROUTIFY

    );

}


// ==========================================================
// 12. CERRAR SESIÓN DESDE HEADER
// ==========================================================

const btnCerrarSesionHeader =

document.getElementById(

    "btnCerrarSesionTopbar"

);


if(btnCerrarSesionHeader){

    btnCerrarSesionHeader.addEventListener(

        "click",

        cerrarSesionROUTIFY

    );

}