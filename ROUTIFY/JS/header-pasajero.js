// ==========================================================
// ROUTIFY V2
// HEADER DASHBOARD PASAJERO
// ==========================================================


// ==========================================================
// 1. ELEMENTOS
// ==========================================================

const btnNotificaciones =
document.getElementById(
    "btnNotificaciones"
);


const menuNotificaciones =
document.getElementById(
    "menuNotificaciones"
);


const btnPerfil =
document.getElementById(
    "btnPerfil"
);


const menuPerfil =
document.getElementById(
    "menuPerfil"
);


const flechaPerfil =
document.getElementById(
    "flechaPerfil"
);


const buscadorGlobal =
document.getElementById(
    "buscadorGlobal"
);


const btnVerAlertas =
document.getElementById(
    "btnVerAlertas"
);


const btnTema =
document.getElementById(
    "btnTema"
);


const iconoTema =
document.getElementById(
    "iconoTema"
);



// ==========================================================
// 2. NOTIFICACIONES
// ==========================================================

if(
    btnNotificaciones &&
    menuNotificaciones
){

    btnNotificaciones.addEventListener(

        "click",

        evento => {

            evento.stopPropagation();


            menuPerfil?.classList.remove(
                "mostrar"
            );


            flechaPerfil?.classList.remove(
                "girada"
            );


            menuNotificaciones.classList.toggle(
                "mostrar"
            );

        }

    );

}



// ==========================================================
// 3. MENÚ DE PERFIL
// ==========================================================

if(
    btnPerfil &&
    menuPerfil
){

    btnPerfil.addEventListener(

        "click",

        evento => {

            evento.stopPropagation();


            menuNotificaciones?.classList.remove(
                "mostrar"
            );


            menuPerfil.classList.toggle(
                "mostrar"
            );


            flechaPerfil?.classList.toggle(
                "girada"
            );

        }

    );

}



// ==========================================================
// 4. EVITAR CIERRE AL HACER CLICK DENTRO
// ==========================================================

menuNotificaciones?.addEventListener(

    "click",

    evento => {

        evento.stopPropagation();

    }

);


menuPerfil?.addEventListener(

    "click",

    evento => {

        evento.stopPropagation();

    }

);



// ==========================================================
// 5. CERRAR MENÚS AL HACER CLICK AFUERA
// ==========================================================

document.addEventListener(

    "click",

    evento => {

        if(
            menuNotificaciones &&
            btnNotificaciones &&
            !menuNotificaciones.contains(
                evento.target
            ) &&
            !btnNotificaciones.contains(
                evento.target
            )
        ){

            menuNotificaciones.classList.remove(
                "mostrar"
            );

        }


        if(
            menuPerfil &&
            btnPerfil &&
            !menuPerfil.contains(
                evento.target
            ) &&
            !btnPerfil.contains(
                evento.target
            )
        ){

            menuPerfil.classList.remove(
                "mostrar"
            );


            flechaPerfil?.classList.remove(
                "girada"
            );

        }

    }

);



// ==========================================================
// 6. CERRAR DROPDOWNS
// ==========================================================

function cerrarMenusHeader(){

    menuNotificaciones?.classList.remove(
        "mostrar"
    );


    menuPerfil?.classList.remove(
        "mostrar"
    );


    flechaPerfil?.classList.remove(
        "girada"
    );

}



// ==========================================================
// 7. BUSCADOR GLOBAL
// ==========================================================

if(buscadorGlobal){

    buscadorGlobal.addEventListener(

        "keydown",

        evento => {

            if(
                evento.key !== "Enter"
            ){

                return;

            }


            const texto =
            buscadorGlobal
                .value
                .trim()
                .toLowerCase();


            if(!texto){

                return;

            }


            // ==================================================
            // RUTAS
            // ==================================================

            if(
                texto.includes("ruta") ||
                texto.includes("101") ||
                texto.includes("205") ||
                texto.includes("304")
            ){

                irASeccionHeader(
                    "rutas"
                );


                return;

            }


            // ==================================================
            // MAPA
            // ==================================================

            if(
                texto.includes("mapa") ||
                texto.includes("ubicacion") ||
                texto.includes("ubicación") ||
                texto.includes("bus")
            ){

                irASeccionHeader(
                    "mapaSeccion"
                );


                return;

            }


            // ==================================================
            // ALERTAS
            // ==================================================

            if(
                texto.includes("alerta") ||
                texto.includes("retraso") ||
                texto.includes("notificacion") ||
                texto.includes("notificación")
            ){

                irASeccionHeader(
                    "alertasSeccion"
                );


                return;

            }


            // ==================================================
            // VIAJES
            // ==================================================

            if(
                texto.includes("viaje") ||
                texto.includes("recorrido")
            ){

                irASeccionHeader(
                    "misViajes"
                );


                return;

            }


            // ==================================================
            // FAVORITOS
            // ==================================================

            if(
                texto.includes("favorito")
            ){

                irASeccionHeader(
                    "favoritos"
                );


                return;

            }


            mostrarMensajeHeader(
                "No encontramos ese módulo."
            );

        }

    );

}



// ==========================================================
// 8. IR A SECCIÓN
// ==========================================================

function irASeccionHeader(id){

    const seccion =
    document.getElementById(
        id
    );


    if(!seccion){

        mostrarMensajeHeader(
            "La sección todavía no está disponible."
        );


        return;

    }


    seccion.scrollIntoView({

        behavior:
        "smooth",

        block:
        "start"

    });

}



// ==========================================================
// 9. ATAJO CTRL + K
// ==========================================================

document.addEventListener(

    "keydown",

    evento => {

        if(
            evento.ctrlKey &&
            evento.key.toLowerCase() === "k"
        ){

            evento.preventDefault();


            buscadorGlobal?.focus();

        }


        if(
            evento.key === "Escape"
        ){

            cerrarMenusHeader();

        }

    }

);



// ==========================================================
// 10. VER TODAS LAS ALERTAS
// ==========================================================

if(btnVerAlertas){

    btnVerAlertas.addEventListener(

        "click",

        evento => {

            evento.preventDefault();


            cerrarMenusHeader();


            irASeccionHeader(
                "alertasSeccion"
            );

        }

    );

}



// ==========================================================
// 11. TEMA
// ==========================================================

function obtenerTemaGuardado(){

    return (

        localStorage.getItem(
            "temaROUTIFY"
        )

        ||

        "oscuro"

    );

}



// ==========================================================
// 12. APLICAR TEMA
// ==========================================================

function aplicarTemaHeader(tema){

    const temaValido =

    tema === "claro"

    ?

    "claro"

    :

    "oscuro";


    document.documentElement.setAttribute(

        "data-theme",

        temaValido

    );


    document.body.classList.toggle(

        "light-mode",

        temaValido === "claro"

    );


    document.body.classList.toggle(

        "dark-mode",

        temaValido === "oscuro"

    );


    if(iconoTema){

        iconoTema.className =

        temaValido === "oscuro"

        ?

        "bi bi-sun-fill"

        :

        "bi bi-moon-fill";

    }

}



// ==========================================================
// 13. CARGAR TEMA GUARDADO
// ==========================================================

aplicarTemaHeader(
    obtenerTemaGuardado()
);



// ==========================================================
// 14. CAMBIAR TEMA
// ==========================================================

if(btnTema){

    btnTema.addEventListener(

        "click",

        () => {

            const temaActual =
            obtenerTemaGuardado();


            const nuevoTema =

            temaActual === "oscuro"

            ?

            "claro"

            :

            "oscuro";


            localStorage.setItem(

                "temaROUTIFY",

                nuevoTema

            );


            aplicarTemaHeader(
                nuevoTema
            );


            mostrarMensajeHeader(

                nuevoTema === "oscuro"

                ?

                "Modo oscuro activado."

                :

                "Modo claro activado."

            );


            window.dispatchEvent(

                new CustomEvent(

                    "routifyTemaCambiado",

                    {

                        detail: {

                            tema:
                            nuevoTema

                        }

                    }

                )

            );

        }

    );

}



// ==========================================================
// 15. MENSAJE DEL HEADER
// ==========================================================

function mostrarMensajeHeader(
    mensaje
){

    if(
        typeof window.mostrarToast ===
        "function"
    ){

        window.mostrarToast(

            mensaje,

            "info"

        );


        return;

    }


    console.log(
        "ROUTIFY:",
        mensaje
    );

}



// ==========================================================
// 16. FUNCIONES DISPONIBLES
// ==========================================================

window.ROUTIFYHeaderPasajero = {

    cerrarMenus:
    cerrarMenusHeader,


    aplicarTema:
    aplicarTemaHeader,


    irASeccion:
    irASeccionHeader

};