//======================================
// ROUTIFY
// DASHBOARD CONDUCTOR
//======================================
//======================================
// CONTROL DE ACCESO CONDUCTOR
//======================================


const usuarioActivo =
JSON.parse(
    sessionStorage.getItem(
        "sesionROUTIFY"
    )
);



if(!usuarioActivo){

    window.location.href =
    "login.html";

}



const rolUsuario =
usuarioActivo.rol ||
usuarioActivo.roles?.[0];



if(
    rolUsuario !== "conductor" &&
    rolUsuario !== "administrador"
){

    alert(
        "No tienes permisos para acceder al panel conductor"
    );


    window.location.href =
    "dashboard-pasajero.html";

}

//======================================
// ELEMENTOS GENERALES
//======================================

const sidebar = document.getElementById(
    "sidebar"
);

const mainWrapper = document.getElementById(
    "mainWrapper"
);

const btnSidebar = document.getElementById(
    "btnSidebar"
);

const btnMenuMobile = document.getElementById(
    "btnMenuMobile"
);


//======================================
// SIDEBAR ESCRITORIO
//======================================

if(btnSidebar){

    btnSidebar.addEventListener(
        "click",
        function(){

            sidebar.classList.toggle(
                "collapsed"
            );

            if(mainWrapper){

                mainWrapper.classList.toggle(
                    "expanded"
                );

            }

            setTimeout(
                function(){

                    if(
                        typeof mapa !== "undefined" &&
                        mapa
                    ){

                        mapa.invalidateSize();

                    }

                },
                300
            );

        }
    );

}


//======================================
// SIDEBAR MÓVIL
//======================================

if(btnMenuMobile){

    btnMenuMobile.addEventListener(
        "click",
        function(){

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


//======================================
// CERRAR SIDEBAR MÓVIL
//======================================

document.querySelectorAll(
    ".sidebar-nav .nav-link"
).forEach(

    function(enlace){

        enlace.addEventListener(
            "click",
            function(){

                if(
                    window.innerWidth <= 900
                ){

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }

            }
        );

    }

);


//======================================
// NAVEGACIÓN ACTIVA
//======================================

const enlacesSidebar = document.querySelectorAll(
    ".sidebar-nav .nav-link"
);


enlacesSidebar.forEach(

    function(enlace){

        enlace.addEventListener(
            "click",
            function(){

                enlacesSidebar.forEach(
                    function(item){

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                enlace.classList.add(
                    "active"
                );

            }
        );

    }

);


//======================================
// TOAST ROUTIFY
//======================================

const toastRoutify = document.getElementById(
    "toastRoutify"
);

const toastIcon = document.getElementById(
    "toastIcon"
);

const toastTitulo = document.getElementById(
    "toastTitulo"
);

const toastMensaje = document.getElementById(
    "toastMensaje"
);

const btnCerrarToast = document.getElementById(
    "btnCerrarToast"
);

let temporizadorToast = null;


//======================================
// MOSTRAR TOAST
//======================================

function mostrarToast(
    tipo,
    titulo,
    mensaje
){

    if(
        !toastRoutify ||
        !toastTitulo ||
        !toastMensaje
    ){

        return;

    }

    toastTitulo.textContent = titulo;

    toastMensaje.textContent = mensaje;


    toastRoutify.classList.remove(
        "success",
        "error",
        "warning",
        "info"
    );


    toastRoutify.classList.add(
        tipo
    );


    if(toastIcon){

        let icono = "bi-check-lg";


        if(tipo === "error"){

            icono =
            "bi-x-lg";

        }


        if(tipo === "warning"){

            icono =
            "bi-exclamation-triangle-fill";

        }


        if(tipo === "info"){

            icono =
            "bi-info-circle-fill";

        }


        toastIcon.innerHTML =
        `<i class="bi ${icono}"></i>`;

    }


    toastRoutify.classList.add(
        "show"
    );


    clearTimeout(
        temporizadorToast
    );


    temporizadorToast =
    setTimeout(
        function(){

            toastRoutify.classList.remove(
                "show"
            );

        },
        3500
    );

}


//======================================
// CERRAR TOAST
//======================================

if(btnCerrarToast){

    btnCerrarToast.addEventListener(
        "click",
        function(){

            toastRoutify.classList.remove(
                "show"
            );

        }
    );

}


//======================================
// NOTIFICACIONES
//======================================

const btnNotificaciones =
document.getElementById(
    "btnNotificaciones"
);

const panelNotificaciones =
document.getElementById(
    "panelNotificaciones"
);

const btnCerrarNotificaciones =
document.getElementById(
    "btnCerrarNotificaciones"
);

const btnMarcarLeidas =
document.getElementById(
    "btnMarcarLeidas"
);

const notificationDot =
document.getElementById(
    "notificationDot"
);


//======================================
// ABRIR NOTIFICACIONES
//======================================

if(
    btnNotificaciones &&
    panelNotificaciones
){

    btnNotificaciones.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

            panelNotificaciones.classList.toggle(
                "show"
            );

            cerrarMenuPerfil();

        }
    );

}


//======================================
// CERRAR NOTIFICACIONES
//======================================

if(btnCerrarNotificaciones){

    btnCerrarNotificaciones.addEventListener(
        "click",
        function(){

            panelNotificaciones.classList.remove(
                "show"
            );

        }
    );

}


//======================================
// MARCAR COMO LEÍDAS
//======================================

if(btnMarcarLeidas){

    btnMarcarLeidas.addEventListener(
        "click",
        function(){

            document.querySelectorAll(
                ".notification-item.unread"
            ).forEach(

                function(notificacion){

                    notificacion.classList.remove(
                        "unread"
                    );

                }

            );


            if(notificationDot){

                notificationDot.style.display =
                "none";

            }


            sessionStorage.setItem(
                "notificacionesLeidasROUTIFY",
                "true"
            );


            mostrarToast(
                "success",
                "Notificaciones",
                "Todas las notificaciones fueron marcadas como leídas."
            );

        }
    );

}


//======================================
// RESTAURAR ESTADO NOTIFICACIONES
//======================================

if(
    sessionStorage.getItem(
        "notificacionesLeidasROUTIFY"
    ) === "true"
){

    if(notificationDot){

        notificationDot.style.display =
        "none";

    }


    document.querySelectorAll(
        ".notification-item.unread"
    ).forEach(

        function(notificacion){

            notificacion.classList.remove(
                "unread"
            );

        }

    );

}


//======================================
// PERFIL
//======================================

const btnPerfil =
document.getElementById(
    "btnPerfil"
);

const menuPerfil =
document.getElementById(
    "menuPerfil"
);

const nombreMenuPerfil =
document.getElementById(
    "nombreMenuPerfil"
);

const btnMiPerfil =
document.getElementById(
    "btnMiPerfil"
);

const btnConfiguracionPerfil =
document.getElementById(
    "btnConfiguracionPerfil"
);

const btnCerrarSesionPerfil =
document.getElementById(
    "btnCerrarSesionPerfil"
);


//======================================
// NOMBRE EN MENÚ PERFIL
//======================================

const sesionConductorDashboard =
JSON.parse(
    sessionStorage.getItem(
        "sesionROUTIFY"
    )
);


if(
    sesionConductorDashboard &&
    nombreMenuPerfil
){

    nombreMenuPerfil.textContent =
    sesionConductorDashboard.nombre ||
    "Conductor";

}


//======================================
// ABRIR PERFIL
//======================================

if(
    btnPerfil &&
    menuPerfil
){

    btnPerfil.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

            menuPerfil.classList.toggle(
                "show"
            );

            btnPerfil.classList.toggle(
                "active"
            );

            cerrarNotificaciones();

        }
    );

}


//======================================
// CERRAR MENÚ PERFIL
//======================================

function cerrarMenuPerfil(){

    if(menuPerfil){

        menuPerfil.classList.remove(
            "show"
        );

    }


    if(btnPerfil){

        btnPerfil.classList.remove(
            "active"
        );

    }

}


//======================================
// CERRAR NOTIFICACIONES
//======================================

function cerrarNotificaciones(){

    if(panelNotificaciones){

        panelNotificaciones.classList.remove(
            "show"
        );

    }

}


//======================================
// CERRAR MENÚS AL HACER CLICK AFUERA
//======================================

document.addEventListener(
    "click",
    function(event){

        if(
            panelNotificaciones &&
            !panelNotificaciones.contains(
                event.target
            ) &&
            btnNotificaciones &&
            !btnNotificaciones.contains(
                event.target
            )
        ){

            cerrarNotificaciones();

        }


        if(
            menuPerfil &&
            !menuPerfil.contains(
                event.target
            ) &&
            btnPerfil &&
            !btnPerfil.contains(
                event.target
            )
        ){

            cerrarMenuPerfil();

        }

    }
);


//======================================
// MI PERFIL
//======================================

if(btnMiPerfil){

    btnMiPerfil.addEventListener(
        "click",
        function(){

            cerrarMenuPerfil();

            mostrarToast(
                "info",
                "Perfil",
                "El módulo de perfil estará disponible próximamente."
            );

        }
    );

}


//======================================
// CONFIGURACIÓN DESDE PERFIL
//======================================

if(btnConfiguracionPerfil){

    btnConfiguracionPerfil.addEventListener(
        "click",
        function(){

            cerrarMenuPerfil();

            const configuracion =
            document.getElementById(
                "configuracionSeccion"
            );


            if(configuracion){

                configuracion.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }

        }
    );

}


//======================================
// CERRAR SESIÓN DESDE PERFIL
//======================================

if(btnCerrarSesionPerfil){

    btnCerrarSesionPerfil.addEventListener(
        "click",
        function(){

            const botonCerrarPrincipal =
            document.getElementById(
                "btnCerrarSesion"
            );


            if(botonCerrarPrincipal){

                botonCerrarPrincipal.click();

                return;

            }


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


//======================================
// TEMA
//======================================

const btnTema =
document.getElementById(
    "btnTema"
);

const iconTema =
document.getElementById(
    "iconTema"
);

const configTemaOscuro =
document.getElementById(
    "configTemaOscuro"
);


//======================================
// APLICAR TEMA
//======================================

function aplicarTema(
    tema
){

    if(tema === "claro"){

        document.body.classList.add(
            "modo-claro"
        );


        if(iconTema){

            iconTema.className =
            "bi bi-sun-fill";

        }


        if(configTemaOscuro){

            configTemaOscuro.checked =
            false;

        }

    }
    else{

        document.body.classList.remove(
            "modo-claro"
        );


        if(iconTema){

            iconTema.className =
            "bi bi-moon-fill";

        }


        if(configTemaOscuro){

            configTemaOscuro.checked =
            true;

        }

    }

}


//======================================
// RESTAURAR TEMA
//======================================

const temaGuardado =
localStorage.getItem(
    "temaROUTIFY"
) || "oscuro";


aplicarTema(
    temaGuardado
);


//======================================
// CAMBIAR TEMA
//======================================

if(btnTema){

    btnTema.addEventListener(
        "click",
        function(){

            const modoClaro =
            document.body.classList.contains(
                "modo-claro"
            );


            const nuevoTema =
            modoClaro
            ? "oscuro"
            : "claro";


            localStorage.setItem(
                "temaROUTIFY",
                nuevoTema
            );


            aplicarTema(
                nuevoTema
            );

        }
    );

}


//======================================
// CONFIGURACIÓN
//======================================

const configNotificaciones =
document.getElementById(
    "configNotificaciones"
);

const configSonidos =
document.getElementById(
    "configSonidos"
);

const configGPS =
document.getElementById(
    "configGPS"
);

const btnGuardarConfiguracion =
document.getElementById(
    "btnGuardarConfiguracion"
);

const btnRestablecerConfiguracion =
document.getElementById(
    "btnRestablecerConfiguracion"
);


//======================================
// CARGAR CONFIGURACIÓN
//======================================

function cargarConfiguracion(){

    const configuracionGuardada =
    JSON.parse(
        localStorage.getItem(
            "configuracionConductorROUTIFY"
        )
    );


    if(!configuracionGuardada){

        return;

    }


    if(configNotificaciones){

        configNotificaciones.checked =
        configuracionGuardada.notificaciones !== false;

    }


    if(configSonidos){

        configSonidos.checked =
        configuracionGuardada.sonidos !== false;

    }


    if(configGPS){

        configGPS.checked =
        configuracionGuardada.gps !== false;

    }

}


//======================================
// GUARDAR CONFIGURACIÓN
//======================================

if(btnGuardarConfiguracion){

    btnGuardarConfiguracion.addEventListener(
        "click",
        function(){

            const configuracion = {

                notificaciones:
                configNotificaciones
                ? configNotificaciones.checked
                : true,

                sonidos:
                configSonidos
                ? configSonidos.checked
                : true,

                gps:
                configGPS
                ? configGPS.checked
                : true

            };


            localStorage.setItem(
                "configuracionConductorROUTIFY",
                JSON.stringify(
                    configuracion
                )
            );


            if(configTemaOscuro){

                const tema =
                configTemaOscuro.checked
                ? "oscuro"
                : "claro";


                localStorage.setItem(
                    "temaROUTIFY",
                    tema
                );


                aplicarTema(
                    tema
                );

            }


            mostrarToast(
                "success",
                "Configuración",
                "Tus preferencias fueron guardadas correctamente."
            );

        }
    );

}


//======================================
// RESTABLECER CONFIGURACIÓN
//======================================

if(btnRestablecerConfiguracion){

    btnRestablecerConfiguracion.addEventListener(
        "click",
        function(){

            if(configNotificaciones){

                configNotificaciones.checked =
                true;

            }


            if(configSonidos){

                configSonidos.checked =
                true;

            }


            if(configGPS){

                configGPS.checked =
                true;

            }


            if(configTemaOscuro){

                configTemaOscuro.checked =
                true;

            }


            localStorage.removeItem(
                "configuracionConductorROUTIFY"
            );


            localStorage.setItem(
                "temaROUTIFY",
                "oscuro"
            );


            aplicarTema(
                "oscuro"
            );


            mostrarToast(
                "info",
                "Configuración",
                "Se restauró la configuración predeterminada."
            );

        }
    );

}


cargarConfiguracion();


//======================================
// CAMBIAR TEMA DESDE CONFIGURACIÓN
//======================================

if(configTemaOscuro){

    configTemaOscuro.addEventListener(
        "change",
        function(){

            const tema =
            configTemaOscuro.checked
            ? "oscuro"
            : "claro";


            localStorage.setItem(
                "temaROUTIFY",
                tema
            );


            aplicarTema(
                tema
            );

        }
    );

}


//======================================
// ELEMENTOS DE RUTA
//======================================

const selectRuta =
document.getElementById(
    "selectRuta"
);

const btnIniciarRuta =
document.getElementById(
    "btnIniciarRuta"
);

const btnPausarRuta =
document.getElementById(
    "btnPausarRuta"
);

const btnFinalizarRuta =
document.getElementById(
    "btnFinalizarRuta"
);

const estadoRuta =
document.getElementById(
    "estadoRuta"
);

const rutaActual =
document.getElementById(
    "rutaActual"
);

const cantidadParadas =
document.getElementById(
    "cantidadParadas"
);

const listaParadas =
document.getElementById(
    "listaParadas"
);

const tiempoRecorrido =
document.getElementById(
    "tiempoRecorrido"
);

const distanciaRecorrida =
document.getElementById(
    "distanciaRecorrida"
);

const paradasCompletadas =
document.getElementById(
    "paradasCompletadas"
);

const velocidadBus =
document.getElementById(
    "velocidadBus"
);

const estadoGPS =
document.getElementById(
    "estadoGPS"
);

const precisionGPS =
document.getElementById(
    "precisionGPS"
);

const numeroUnidad =
document.getElementById(
    "numeroUnidad"
);

const unidadMapa =
document.getElementById(
    "unidadMapa"
);


//======================================
// VARIABLES DEL RECORRIDO
//======================================

let rutaEnCurso = false;

let rutaPausada = false;

let rutaSeleccionada = "";

let segundosRecorrido = 0;

let distanciaActual = 0;

let paradasRealizadas = 0;

let temporizadorRuta = null;

let seguimientoGPS = null;

let ultimaPosicion = null;


//======================================
// RUTAS DEMOSTRATIVAS
//======================================

const rutasROUTIFY = {

    "Ruta 1":[

        "Terminal Central",

        "Zona 1",

        "Centro Cívico",

        "Zona 4",

        "Terminal Norte"

    ],


    "Ruta 2":[

        "Terminal Sur",

        "Zona 12",

        "Zona 9",

        "Zona 10",

        "Terminal Este"

    ],


    "Ruta 3":[

        "Terminal Oeste",

        "Zona 7",

        "Centro",

        "Zona 5",

        "Terminal Norte"

    ]

};

//======================================
// MAPA LEAFLET
//======================================

let mapa = null;

let marcadorBus = null;


//======================================
// UBICACIÓN INICIAL DEL MAPA
//======================================

const ubicacionInicial = [
    14.6349,
    -90.5069
];


//======================================
// CREAR MAPA
//======================================

function iniciarMapa(){

    const elementoMapa =
    document.getElementById(
        "mapa"
    );


    if(
        !elementoMapa ||
        typeof L === "undefined"
    ){

        return;

    }


    mapa = L.map(
        "mapa"
    ).setView(
        ubicacionInicial,
        13
    );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom:19,

            attribution:
            "&copy; OpenStreetMap"

        }

    ).addTo(
        mapa
    );


    //==================================
    // ICONO DEL BUS
    //==================================

    const iconoBus =
    L.divIcon({

        className:
        "bus-marker-container",

        html:
        `
            <div class="bus-marker">
                <i class="bi bi-bus-front-fill"></i>
            </div>
        `,

        iconSize:[
            44,
            44
        ],

        iconAnchor:[
            22,
            22
        ]

    });


    marcadorBus =
    L.marker(
        ubicacionInicial,
        {
            icon:iconoBus
        }
    )
    .addTo(
        mapa
    );


    marcadorBus.bindPopup(
        `
            <strong>ROUTIFY</strong>
            <br>
            Unidad activa
        `
    );


    setTimeout(
        function(){

            mapa.invalidateSize();

        },
        300
    );

}


//======================================
// INICIAR MAPA
//======================================

iniciarMapa();


//======================================
// FORMATEAR TIEMPO
//======================================

function formatearTiempo(
    segundos
){

    const horas =
    Math.floor(
        segundos / 3600
    );


    const minutos =
    Math.floor(
        (segundos % 3600) / 60
    );


    const segundosRestantes =
    segundos % 60;


    return (
        String(horas).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(minutos).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(segundosRestantes).padStart(
            2,
            "0"
        )
    );

}


//======================================
// ACTUALIZAR TIEMPO
//======================================

function actualizarTiempo(){

    if(
        !rutaEnCurso ||
        rutaPausada
    ){

        return;

    }


    segundosRecorrido++;


    if(tiempoRecorrido){

        tiempoRecorrido.textContent =
        formatearTiempo(
            segundosRecorrido
        );

    }

}


//======================================
// DISTANCIA ENTRE DOS PUNTOS
//======================================

function calcularDistancia(
    lat1,
    lon1,
    lat2,
    lon2
){

    const radioTierra =
    6371;


    const convertirRadianes =
    Math.PI / 180;


    const diferenciaLatitud =
    (
        lat2 - lat1
    ) * convertirRadianes;


    const diferenciaLongitud =
    (
        lon2 - lon1
    ) * convertirRadianes;


    const a =
    Math.sin(
        diferenciaLatitud / 2
    ) ** 2
    +
    Math.cos(
        lat1 * convertirRadianes
    )
    *
    Math.cos(
        lat2 * convertirRadianes
    )
    *
    Math.sin(
        diferenciaLongitud / 2
    ) ** 2;


    const c =
    2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );


    return (
        radioTierra * c
    );

}


//======================================
// ACTUALIZAR UBICACIÓN
//======================================

function actualizarUbicacion(
    posicion
){

    if(
        !rutaEnCurso ||
        rutaPausada
    ){

        return;

    }


    const latitud =
    posicion.coords.latitude;


    const longitud =
    posicion.coords.longitude;


    const precision =
    posicion.coords.accuracy;


    let velocidad =
    posicion.coords.speed;


    //==================================
    // VELOCIDAD
    //==================================

    if(
        velocidad === null ||
        velocidad < 0
    ){

        velocidad = 0;

    }


    const velocidadKm =
    velocidad * 3.6;


    if(velocidadBus){

        velocidadBus.textContent =
        velocidadKm.toFixed(
            0
        )
        +
        " km/h";

    }


    //==================================
    // GPS
    //==================================

    if(estadoGPS){

        estadoGPS.textContent =
        "CONECTADO";

        estadoGPS.classList.add(
            "active"
        );

    }


    if(precisionGPS){

        precisionGPS.textContent =
        Math.round(
            precision
        )
        +
        " m";

    }


    //==================================
    // ACTUALIZAR MARCADOR
    //==================================

    if(marcadorBus){

        marcadorBus.setLatLng([
            latitud,
            longitud
        ]);

    }


    if(mapa){

        mapa.panTo(
            [
                latitud,
                longitud
            ],
            {
                animate:true
            }
        );

    }


    //==================================
    // CALCULAR DISTANCIA
    //==================================

    if(ultimaPosicion){

        const nuevaDistancia =
        calcularDistancia(

            ultimaPosicion.latitud,

            ultimaPosicion.longitud,

            latitud,

            longitud

        );


        // Evitar saltos de GPS demasiado grandes

        if(
            nuevaDistancia > 0 &&
            nuevaDistancia < 1
        ){

            distanciaActual +=
            nuevaDistancia;

        }

    }


    ultimaPosicion = {

        latitud:latitud,

        longitud:longitud

    };


    if(distanciaRecorrida){

        distanciaRecorrida.textContent =
        distanciaActual.toFixed(
            2
        )
        +
        " km";

    }


    //==================================
    // INFORMACIÓN PARA PASAJERO
    //==================================

    const ubicacionBus = {

        unidad:
        numeroUnidad
        ? numeroUnidad.textContent.trim()
        : "BUS-001",

        ruta:
        rutaSeleccionada,

        latitud:
        latitud,

        longitud:
        longitud,

        velocidad:
        velocidadKm.toFixed(0),

        estado:
        rutaPausada
        ? "pausada"
        : "activa",

        actualizado:
        new Date().toISOString()

    };


    localStorage.setItem(
        "ubicacionBus",
        JSON.stringify(
            ubicacionBus
        )
    );

}


//======================================
// ERROR GPS
//======================================

function errorUbicacion(){

    if(estadoGPS){

        estadoGPS.textContent =
        "SIN GPS";

        estadoGPS.classList.remove(
            "active"
        );

    }


    if(precisionGPS){

        precisionGPS.textContent =
        "No disponible";

    }

}


//======================================
// INICIAR SEGUIMIENTO GPS
//======================================

function iniciarSeguimientoGPS(){

    if(
        configGPS &&
        !configGPS.checked
    ){

        if(estadoGPS){

            estadoGPS.textContent =
            "DESACTIVADO";

            estadoGPS.classList.remove(
                "active"
            );

        }

        return;

    }


    if(
        !navigator.geolocation
    ){

        errorUbicacion();

        return;

    }


    if(
        seguimientoGPS !== null
    ){

        navigator.geolocation.clearWatch(
            seguimientoGPS
        );

    }


    seguimientoGPS =
    navigator.geolocation.watchPosition(

        actualizarUbicacion,

        errorUbicacion,

        {

            enableHighAccuracy:true,

            maximumAge:5000,

            timeout:10000

        }

    );

}


//======================================
// DETENER GPS
//======================================

function detenerSeguimientoGPS(){

    if(
        seguimientoGPS !== null &&
        navigator.geolocation
    ){

        navigator.geolocation.clearWatch(
            seguimientoGPS
        );


        seguimientoGPS =
        null;

    }

}


//======================================
// MOSTRAR PARADAS
//======================================

function mostrarParadas(
    ruta
){

    if(!listaParadas){

        return;

    }


    listaParadas.innerHTML =
    "";


    const paradas =
    rutasROUTIFY[
        ruta
    ] || [];


    if(cantidadParadas){

        cantidadParadas.textContent =
        paradas.length;

    }


    paradas.forEach(

        function(
            parada,
            indice
        ){

            const elemento =
            document.createElement(
                "div"
            );


            elemento.className =
            "stop-item";


            elemento.innerHTML =
            `
                <div class="stop-number">
                    ${indice + 1}
                </div>

                <div class="stop-info">

                    <strong>
                        ${parada}
                    </strong>

                    <span>
                        Parada ${indice + 1}
                    </span>

                </div>

                <div class="stop-status">

                    <i class="bi bi-circle"></i>

                </div>
            `;


            listaParadas.appendChild(
                elemento
            );

        }

    );

}


//======================================
// ACTUALIZAR ESTADO DE RUTA
//======================================

function actualizarEstadoRuta(
    estado
){

    if(!estadoRuta){

        return;

    }


    if(estado === "activa"){

        estadoRuta.innerHTML =
        `
            <span></span>
            Ruta activa
        `;


        estadoRuta.classList.add(
            "active"
        );


        estadoRuta.classList.remove(
            "paused"
        );

    }


    if(estado === "pausada"){

        estadoRuta.innerHTML =
        `
            <span></span>
            Ruta pausada
        `;


        estadoRuta.classList.remove(
            "active"
        );


        estadoRuta.classList.add(
            "paused"
        );

    }


    if(estado === "finalizada"){

        estadoRuta.innerHTML =
        `
            <span></span>
            Ruta sin iniciar
        `;


        estadoRuta.classList.remove(
            "active",
            "paused"
        );

    }

}


//======================================
// INICIAR RUTA
//======================================

function iniciarRuta(){

    if(
        !selectRuta ||
        !selectRuta.value
    ){

        mostrarToast(
            "warning",
            "Selecciona una ruta",
            "Debes seleccionar una ruta antes de iniciar el recorrido."
        );

        return;

    }


    rutaSeleccionada =
    selectRuta.value;


    rutaEnCurso =
    true;


    rutaPausada =
    false;


    segundosRecorrido =
    0;


    distanciaActual =
    0;


    paradasRealizadas =
    0;


    ultimaPosicion =
    null;


    //==================================
    // INTERFAZ
    //==================================

    if(rutaActual){

        rutaActual.textContent =
        rutaSeleccionada;

    }


    if(tiempoRecorrido){

        tiempoRecorrido.textContent =
        "00:00:00";

    }


    if(distanciaRecorrida){

        distanciaRecorrida.textContent =
        "0.00 km";

    }


    if(paradasCompletadas){

        paradasCompletadas.textContent =
        "0";

    }


    if(btnIniciarRuta){

        btnIniciarRuta.disabled =
        true;

    }


    if(btnPausarRuta){

        btnPausarRuta.disabled =
        false;

        btnPausarRuta.innerHTML =
        `
            <i class="bi bi-pause-fill"></i>

            <span>
                Pausar
            </span>
        `;

    }


    if(btnFinalizarRuta){

        btnFinalizarRuta.disabled =
        false;

    }


    if(selectRuta){

        selectRuta.disabled =
        true;

    }


    actualizarEstadoRuta(
        "activa"
    );


    mostrarParadas(
        rutaSeleccionada
    );


    //==================================
    // TEMPORIZADOR
    //==================================

    clearInterval(
        temporizadorRuta
    );


    temporizadorRuta =
    setInterval(
        actualizarTiempo,
        1000
    );


    //==================================
    // GPS
    //==================================

    iniciarSeguimientoGPS();


    //==================================
    // GUARDAR ESTADO
    //==================================

    guardarEstadoRuta();


    mostrarToast(
        "success",
        "Ruta iniciada",
        rutaSeleccionada +
        " se inició correctamente."
    );

}


//======================================
// EVENTO INICIAR
//======================================

if(btnIniciarRuta){

    btnIniciarRuta.addEventListener(
        "click",
        iniciarRuta
    );

}


//======================================
// PAUSAR / REANUDAR
//======================================

function pausarReanudarRuta(){

    if(!rutaEnCurso){

        return;

    }


    //==================================
    // REANUDAR
    //==================================

    if(rutaPausada){

        rutaPausada =
        false;


        actualizarEstadoRuta(
            "activa"
        );


        if(btnPausarRuta){

            btnPausarRuta.innerHTML =
            `
                <i class="bi bi-pause-fill"></i>

                <span>
                    Pausar
                </span>
            `;

        }


        iniciarSeguimientoGPS();


        mostrarToast(
            "success",
            "Ruta reanudada",
            "El recorrido continúa nuevamente."
        );

    }


    //==================================
    // PAUSAR
    //==================================

    else{

        rutaPausada =
        true;


        actualizarEstadoRuta(
            "pausada"
        );


        if(btnPausarRuta){

            btnPausarRuta.innerHTML =
            `
                <i class="bi bi-play-fill"></i>

                <span>
                    Reanudar
                </span>
            `;

        }


        detenerSeguimientoGPS();


        if(velocidadBus){

            velocidadBus.textContent =
            "0 km/h";

        }


        mostrarToast(
            "warning",
            "Ruta pausada",
            "El recorrido se encuentra temporalmente pausado."
        );

    }


    guardarEstadoRuta();

}


//======================================
// EVENTO PAUSAR
//======================================

if(btnPausarRuta){

    btnPausarRuta.addEventListener(
        "click",
        pausarReanudarRuta
    );

}


//======================================
// GUARDAR ESTADO DE RUTA
//======================================

function guardarEstadoRuta(){

    if(!rutaEnCurso){

        sessionStorage.removeItem(
            "rutaConductorROUTIFY"
        );

        return;

    }


    const estado = {

        ruta:
        rutaSeleccionada,

        activa:
        rutaEnCurso,

        pausada:
        rutaPausada,

        segundos:
        segundosRecorrido,

        distancia:
        distanciaActual,

        paradas:
        paradasRealizadas

    };


    sessionStorage.setItem(
        "rutaConductorROUTIFY",
        JSON.stringify(
            estado
        )
    );

}


//======================================
// GUARDADO AUTOMÁTICO
//======================================

setInterval(
    function(){

        if(rutaEnCurso){

            guardarEstadoRuta();

        }

    },
    5000
);


//======================================
// HISTORIAL
//======================================

const listaHistorial =
document.getElementById(
    "listaHistorial"
);

const totalRecorridos =
document.getElementById(
    "totalRecorridos"
);

const distanciaTotalHistorial =
document.getElementById(
    "distanciaTotalHistorial"
);

const tiempoTotalHistorial =
document.getElementById(
    "tiempoTotalHistorial"
);


//======================================
// OBTENER HISTORIAL
//======================================

function obtenerHistorial(){

    const historial =
    JSON.parse(
        localStorage.getItem(
            "historialConductorROUTIFY"
        )
    );


    if(
        !Array.isArray(
            historial
        )
    ){

        return [];

    }


    return historial;

}


//======================================
// GUARDAR RECORRIDO EN HISTORIAL
//======================================

function guardarRecorridoHistorial(){

    const historial =
    obtenerHistorial();


    const recorrido = {

        id:
        Date.now(),

        ruta:
        rutaSeleccionada,

        unidad:
        numeroUnidad
        ? numeroUnidad.textContent.trim()
        : "BUS-001",

        fecha:
        new Date().toLocaleDateString(
            "es-GT"
        ),

        hora:
        new Date().toLocaleTimeString(
            "es-GT",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        ),

        segundos:
        segundosRecorrido,

        distancia:
        Number(
            distanciaActual.toFixed(
                2
            )
        ),

        paradas:
        paradasRealizadas,

        estado:
        "Finalizado"

    };


    historial.unshift(
        recorrido
    );


    // Máximo 30 recorridos locales

    if(historial.length > 30){

        historial.length =
        30;

    }


    localStorage.setItem(
        "historialConductorROUTIFY",
        JSON.stringify(
            historial
        )
    );


    mostrarHistorial();

}


//======================================
// MOSTRAR HISTORIAL
//======================================

function mostrarHistorial(){

    const historial =
    obtenerHistorial();


    if(!listaHistorial){

        return;

    }


    //==================================
    // SIN HISTORIAL
    //==================================

    if(historial.length === 0){

        listaHistorial.innerHTML =
        `
            <div class="history-empty">

                <div class="history-empty-icon">

                    <i class="bi bi-clock-history"></i>

                </div>

                <strong>
                    Sin recorridos registrados
                </strong>

                <span>
                    Los recorridos finalizados aparecerán aquí.
                </span>

            </div>
        `;


        if(totalRecorridos){

            totalRecorridos.textContent =
            "0";

        }


        if(distanciaTotalHistorial){

            distanciaTotalHistorial.textContent =
            "0.0 km";

        }


        if(tiempoTotalHistorial){

            tiempoTotalHistorial.textContent =
            "00:00:00";

        }


        return;

    }


    //==================================
    // TOTALES
    //==================================

    let distanciaTotal =
    0;


    let segundosTotales =
    0;


    historial.forEach(
        function(recorrido){

            distanciaTotal +=
            Number(
                recorrido.distancia
            ) || 0;


            segundosTotales +=
            Number(
                recorrido.segundos
            ) || 0;

        }
    );


    if(totalRecorridos){

        totalRecorridos.textContent =
        historial.length;

    }


    if(distanciaTotalHistorial){

        distanciaTotalHistorial.textContent =
        distanciaTotal.toFixed(
            2
        )
        +
        " km";

    }


    if(tiempoTotalHistorial){

        tiempoTotalHistorial.textContent =
        formatearTiempo(
            segundosTotales
        );

    }


    //==================================
    // CREAR RECORRIDOS
    //==================================

    listaHistorial.innerHTML =
    "";


    historial.forEach(

        function(recorrido){

            const item =
            document.createElement(
                "div"
            );


            item.className =
            "history-item";


            item.innerHTML =
            `
                <div class="history-route">

                    <div class="history-route-icon">

                        <i class="bi bi-bus-front-fill"></i>

                    </div>

                    <div>

                        <strong>
                            ${recorrido.ruta}
                        </strong>

                        <span>
                            ${recorrido.unidad}
                        </span>

                    </div>

                </div>


                <div class="history-data">

                    <span>
                        Fecha
                    </span>

                    <strong>
                        ${recorrido.fecha}
                    </strong>

                </div>


                <div class="history-data">

                    <span>
                        Hora
                    </span>

                    <strong>
                        ${recorrido.hora}
                    </strong>

                </div>


                <div class="history-data">

                    <span>
                        Duración
                    </span>

                    <strong>
                        ${formatearTiempo(
                            recorrido.segundos
                        )}
                    </strong>

                </div>


                <div class="history-data">

                    <span>
                        Distancia
                    </span>

                    <strong>
                        ${Number(
                            recorrido.distancia
                        ).toFixed(2)} km
                    </strong>

                </div>


                <span class="history-status">
                    FINALIZADO
                </span>
            `;


            listaHistorial.appendChild(
                item
            );

        }

    );

}


//======================================
// CARGAR HISTORIAL
//======================================

mostrarHistorial();


//======================================
// FINALIZAR RUTA
//======================================

function finalizarRuta(){

    if(!rutaEnCurso){

        return;

    }


    // Guardar antes de reiniciar variables

    guardarRecorridoHistorial();


    rutaEnCurso =
    false;


    rutaPausada =
    false;


    clearInterval(
        temporizadorRuta
    );


    temporizadorRuta =
    null;


    detenerSeguimientoGPS();


    localStorage.removeItem(
        "ubicacionBus"
    );


    sessionStorage.removeItem(
        "rutaConductorROUTIFY"
    );


    //==================================
    // INTERFAZ
    //==================================

    actualizarEstadoRuta(
        "finalizada"
    );


    if(rutaActual){

        rutaActual.textContent =
        "Sin iniciar";

    }


    if(btnIniciarRuta){

        btnIniciarRuta.disabled =
        false;

    }


    if(btnPausarRuta){

        btnPausarRuta.disabled =
        true;


        btnPausarRuta.innerHTML =
        `
            <i class="bi bi-pause-fill"></i>

            <span>
                Pausar
            </span>
        `;

    }


    if(btnFinalizarRuta){

        btnFinalizarRuta.disabled =
        true;

    }


    if(selectRuta){

        selectRuta.disabled =
        false;

        selectRuta.value =
        "";

    }


    if(velocidadBus){

        velocidadBus.textContent =
        "0 km/h";

    }


    if(cantidadParadas){

        cantidadParadas.textContent =
        "0";

    }


    if(listaParadas){

        listaParadas.innerHTML =
        `
            <div class="empty-state">

                <div class="empty-icon">

                    <i class="bi bi-signpost-split"></i>

                </div>

                <strong>
                    Sin ruta activa
                </strong>

                <span>
                    Inicia una ruta para mostrar las próximas paradas.
                </span>

            </div>
        `;

    }


    mostrarToast(
        "success",
        "Ruta finalizada",
        "El recorrido fue finalizado y guardado en el historial."
    );


    // Reiniciar datos después de guardar

    rutaSeleccionada =
    "";


    segundosRecorrido =
    0;


    distanciaActual =
    0;


    paradasRealizadas =
    0;


    ultimaPosicion =
    null;

}


//======================================
// EVENTO FINALIZAR
//======================================

if(btnFinalizarRuta){

    btnFinalizarRuta.addEventListener(
        "click",
        finalizarRuta
    );

}


//======================================
// RESTAURAR RUTA ACTIVA
//======================================

function restaurarRutaActiva(){

    const estadoGuardado =
    JSON.parse(
        sessionStorage.getItem(
            "rutaConductorROUTIFY"
        )
    );


    if(
        !estadoGuardado ||
        !estadoGuardado.activa
    ){

        return;

    }


    rutaSeleccionada =
    estadoGuardado.ruta || "";


    rutaEnCurso =
    true;


    rutaPausada =
    estadoGuardado.pausada === true;


    segundosRecorrido =
    Number(
        estadoGuardado.segundos
    ) || 0;


    distanciaActual =
    Number(
        estadoGuardado.distancia
    ) || 0;


    paradasRealizadas =
    Number(
        estadoGuardado.paradas
    ) || 0;


    //==================================
    // RESTAURAR INTERFAZ
    //==================================

    if(selectRuta){

        selectRuta.value =
        rutaSeleccionada;

        selectRuta.disabled =
        true;

    }


    if(rutaActual){

        rutaActual.textContent =
        rutaSeleccionada;

    }


    if(tiempoRecorrido){

        tiempoRecorrido.textContent =
        formatearTiempo(
            segundosRecorrido
        );

    }


    if(distanciaRecorrida){

        distanciaRecorrida.textContent =
        distanciaActual.toFixed(
            2
        )
        +
        " km";

    }


    if(paradasCompletadas){

        paradasCompletadas.textContent =
        paradasRealizadas;

    }


    if(btnIniciarRuta){

        btnIniciarRuta.disabled =
        true;

    }


    if(btnPausarRuta){

        btnPausarRuta.disabled =
        false;


        if(rutaPausada){

            btnPausarRuta.innerHTML =
            `
                <i class="bi bi-play-fill"></i>

                <span>
                    Reanudar
                </span>
            `;

        }

    }


    if(btnFinalizarRuta){

        btnFinalizarRuta.disabled =
        false;

    }


    mostrarParadas(
        rutaSeleccionada
    );


    if(rutaPausada){

        actualizarEstadoRuta(
            "pausada"
        );

    }
    else{

        actualizarEstadoRuta(
            "activa"
        );


        iniciarSeguimientoGPS();

    }


    clearInterval(
        temporizadorRuta
    );


    temporizadorRuta =
    setInterval(
        actualizarTiempo,
        1000
    );

}


//======================================
// RESTAURAR
//======================================

restaurarRutaActiva();


//======================================
// ALERTAS
//======================================

const btnAlertaRetraso =
document.getElementById(
    "btnAlertaRetraso"
);

const btnAlertaAccidente =
document.getElementById(
    "btnAlertaAccidente"
);

const btnAlertaCambio =
document.getElementById(
    "btnAlertaCambio"
);

const ultimaAlerta =
document.getElementById(
    "ultimaAlerta"
);


//======================================
// ENVIAR ALERTA
//======================================

function enviarAlerta(
    tipo,
    mensaje
){

    if(!rutaEnCurso){

        mostrarToast(
            "warning",
            "Ruta no iniciada",
            "Debes iniciar una ruta antes de enviar una alerta."
        );

        return;

    }


    const alerta = {

        tipo:tipo,

        mensaje:mensaje,

        ruta:rutaSeleccionada,

        unidad:
        numeroUnidad
        ? numeroUnidad.textContent.trim()
        : "BUS-001",

        fecha:
        new Date().toISOString()

    };


    localStorage.setItem(
        "alertaROUTIFY",
        JSON.stringify(
            alerta
        )
    );


    if(ultimaAlerta){

        ultimaAlerta.innerHTML =
        `
            <div>

                <i class="bi bi-check-circle-fill"></i>

                <span>
                    ${mensaje}
                </span>

            </div>
        `;

    }


    agregarNotificacion(
        tipo,
        mensaje
    );


    mostrarToast(
        "success",
        "Alerta enviada",
        mensaje
    );

}


//======================================
// ALERTA RETRASO
//======================================

if(btnAlertaRetraso){

    btnAlertaRetraso.addEventListener(
        "click",
        function(){

            enviarAlerta(
                "retraso",
                "Se ha reportado un retraso en el servicio."
            );

        }
    );

}


//======================================
// ALERTA ACCIDENTE
//======================================

if(btnAlertaAccidente){

    btnAlertaAccidente.addEventListener(
        "click",
        function(){

            enviarAlerta(
                "accidente",
                "Se ha reportado una incidencia durante el recorrido."
            );

        }
    );

}


//======================================
// ALERTA CAMBIO DE RUTA
//======================================

if(btnAlertaCambio){

    btnAlertaCambio.addEventListener(
        "click",
        function(){

            enviarAlerta(
                "cambio",
                "Se ha reportado un cambio en el recorrido."
            );

        }
    );

}


//======================================
// AGREGAR NOTIFICACIÓN
//======================================

function agregarNotificacion(
    tipo,
    mensaje
){

    const lista =
    document.getElementById(
        "listaNotificaciones"
    );


    if(!lista){

        return;

    }


    let icono =
    "bi-info-circle-fill";


    let clase =
    "info";


    if(tipo === "retraso"){

        icono =
        "bi-clock-fill";

        clase =
        "warning";

    }


    if(tipo === "accidente"){

        icono =
        "bi-exclamation-triangle-fill";

        clase =
        "danger";

    }


    if(tipo === "cambio"){

        icono =
        "bi-sign-turn-right-fill";

        clase =
        "info";

    }


    const notificacion =
    document.createElement(
        "div"
    );


    notificacion.className =
    "notification-item unread";


    notificacion.innerHTML =
    `
        <div class="notification-icon ${clase}">

            <i class="bi ${icono}"></i>

        </div>


        <div class="notification-content">

            <strong>
                Aviso de ruta
            </strong>

            <span>
                ${mensaje}
            </span>

            <small>
                Ahora
            </small>

        </div>
    `;


    lista.prepend(
        notificacion
    );


    if(notificationDot){

        notificationDot.style.display =
        "";

    }


    sessionStorage.removeItem(
        "notificacionesLeidasROUTIFY"
    );

}

//======================================
// NAVEGACIÓN HISTORIAL
//======================================

const btnHistorial =
document.getElementById(
    "btnHistorial"
);

const historialSeccion =
document.getElementById(
    "historialSeccion"
);


if(
    btnHistorial &&
    historialSeccion
){

    btnHistorial.addEventListener(
        "click",
        function(event){

            event.preventDefault();


            historialSeccion.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });


            mostrarHistorial();

        }
    );

}


//======================================
// NAVEGACIÓN CONFIGURACIÓN
//======================================

const btnConfiguracion =
document.getElementById(
    "btnConfiguracion"
);

const configuracionSeccion =
document.getElementById(
    "configuracionSeccion"
);


if(
    btnConfiguracion &&
    configuracionSeccion
){

    btnConfiguracion.addEventListener(
        "click",
        function(event){

            event.preventDefault();


            configuracionSeccion.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }
    );

}


//======================================
// CONFIGURACIÓN DESDE PERFIL
//======================================

if(btnConfiguracionPerfil){

    btnConfiguracionPerfil.addEventListener(
        "click",
        function(){

            cerrarMenuPerfil();


            if(configuracionSeccion){

                configuracionSeccion.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }
    );

}


//======================================
// CAMBIO DEL GPS DESDE CONFIGURACIÓN
//======================================

if(configGPS){

    configGPS.addEventListener(
        "change",
        function(){

            if(!rutaEnCurso){

                return;

            }


            if(configGPS.checked){

                iniciarSeguimientoGPS();


                mostrarToast(
                    "success",
                    "Seguimiento activado",
                    "El seguimiento de la unidad está activo."
                );

            }
            else{

                detenerSeguimientoGPS();


                if(estadoGPS){

                    estadoGPS.textContent =
                    "DESACTIVADO";

                    estadoGPS.classList.remove(
                        "active"
                    );

                }


                if(precisionGPS){

                    precisionGPS.textContent =
                    "No disponible";

                }


                if(velocidadBus){

                    velocidadBus.textContent =
                    "0 km/h";

                }


                mostrarToast(
                    "info",
                    "Seguimiento desactivado",
                    "El seguimiento de la unidad fue desactivado."
                );

            }

        }
    );

}


//======================================
// NOTIFICACIONES DESDE CONFIGURACIÓN
//======================================

if(configNotificaciones){

    configNotificaciones.addEventListener(
        "change",
        function(){

            if(!notificationDot){

                return;

            }


            if(
                !configNotificaciones.checked
            ){

                notificationDot.style.display =
                "none";

            }
            else{

                const existenNoLeidas =
                document.querySelector(
                    ".notification-item.unread"
                );


                if(existenNoLeidas){

                    notificationDot.style.display =
                    "";

                }

            }

        }
    );

}


//======================================
// CAMBIO DE RUTA
//======================================

if(selectRuta){

    selectRuta.addEventListener(
        "change",
        function(){

            if(rutaEnCurso){

                return;

            }


            const ruta =
            selectRuta.value;


            if(rutaActual){

                rutaActual.textContent =
                ruta ||
                "Sin iniciar";

            }


            if(
                ruta &&
                rutasROUTIFY[ruta]
            ){

                if(cantidadParadas){

                    cantidadParadas.textContent =
                    rutasROUTIFY[
                        ruta
                    ].length;

                }

            }
            else{

                if(cantidadParadas){

                    cantidadParadas.textContent =
                    "0";

                }

            }

        }
    );

}


//======================================
// SIMULAR PARADA COMPLETADA
//======================================
// Esta función queda preparada para cuando
// conectemos las paradas reales con MySQL.

function completarParada(){

    if(!rutaEnCurso){

        return;

    }


    const paradas =
    rutasROUTIFY[
        rutaSeleccionada
    ] || [];


    if(
        paradasRealizadas >=
        paradas.length
    ){

        return;

    }


    paradasRealizadas++;


    if(paradasCompletadas){

        paradasCompletadas.textContent =
        paradasRealizadas;

    }


    if(cantidadParadas){

        cantidadParadas.textContent =
        Math.max(
            paradas.length -
            paradasRealizadas,
            0
        );

    }


    guardarEstadoRuta();

}


//======================================
// ACTUALIZAR PARADAS VISUALMENTE
//======================================

function actualizarParadasVisuales(){

    if(!listaParadas){

        return;

    }


    const elementos =
    listaParadas.querySelectorAll(
        ".stop-item"
    );


    elementos.forEach(

        function(
            elemento,
            indice
        ){

            elemento.classList.remove(
                "completed",
                "current"
            );


            if(
                indice <
                paradasRealizadas
            ){

                elemento.classList.add(
                    "completed"
                );


                const icono =
                elemento.querySelector(
                    ".stop-status"
                );


                if(icono){

                    icono.innerHTML =
                    `
                        <i class="bi bi-check-circle-fill"></i>
                    `;

                }

            }
            else if(
                indice ===
                paradasRealizadas
            ){

                elemento.classList.add(
                    "current"
                );


                const icono =
                elemento.querySelector(
                    ".stop-status"
                );


                if(icono){

                    icono.innerHTML =
                    `
                        <i class="bi bi-geo-alt-fill"></i>
                    `;

                }

            }

        }

    );

}


//======================================
// SINCRONIZAR PARADAS
//======================================

setInterval(
    function(){

        if(rutaEnCurso){

            actualizarParadasVisuales();

        }

    },
    1000
);


//======================================
// ACTUALIZAR MAPA AL CAMBIAR TAMAÑO
//======================================

window.addEventListener(
    "resize",
    function(){

        if(mapa){

            setTimeout(
                function(){

                    mapa.invalidateSize();

                },
                200
            );

        }

    }
);


//======================================
// ACTUALIZAR MAPA AL NAVEGAR
//======================================

const enlaceMapa =
document.querySelector(
    'a[href="#mapaSeccion"]'
);


if(enlaceMapa){

    enlaceMapa.addEventListener(
        "click",
        function(){

            setTimeout(
                function(){

                    if(mapa){

                        mapa.invalidateSize();

                    }

                },
                500
            );

        }
    );

}


//======================================
// ESCAPE CIERRA MENÚS
//======================================

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key ===
            "Escape"
        ){

            cerrarMenuPerfil();

            cerrarNotificaciones();

        }

    }
);


//======================================
// EVITAR MENÚS ABIERTOS JUNTOS
//======================================

if(panelNotificaciones){

    panelNotificaciones.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

        }
    );

}


if(menuPerfil){

    menuPerfil.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

        }
    );

}


//======================================
// RESTAURAR UNIDAD
//======================================

function restaurarUnidad(){

    const usuario =
    JSON.parse(
        sessionStorage.getItem(
            "sesionROUTIFY"
        )
    );


    if(!usuario){

        return;

    }


    let unidad =
    "BUS-001";


    if(
        usuario.conductor &&
        usuario.conductor.unidad
    ){

        unidad =
        usuario.conductor.unidad;

    }


    if(numeroUnidad){

        numeroUnidad.textContent =
        unidad;

    }


    if(unidadMapa){

        unidadMapa.textContent =
        unidad;

    }

}


//======================================
// SINCRONIZAR NOMBRE PERFIL
//======================================

function sincronizarNombreConductor(){

    const usuario =
    JSON.parse(
        sessionStorage.getItem(
            "sesionROUTIFY"
        )
    );


    if(!usuario){

        return;

    }


    const nombre =
    usuario.nombre ||
    "Conductor";


    const nombreUsuario =
    document.getElementById(
        "nombreUsuario"
    );


    const nombreTopbar =
    document.getElementById(
        "nombreTopbar"
    );


    const nombreBienvenida =
    document.getElementById(
        "nombreBienvenida"
    );


    if(nombreUsuario){

        nombreUsuario.textContent =
        nombre;

    }


    if(nombreTopbar){

        nombreTopbar.textContent =
        nombre;

    }


    if(nombreBienvenida){

        nombreBienvenida.textContent =
        nombre;

    }


    if(nombreMenuPerfil){

        nombreMenuPerfil.textContent =
        nombre;

    }

}


//======================================
// FECHA ACTUAL
//======================================

function mostrarFechaActual(){

    const fechaActual =
    document.getElementById(
        "fechaActual"
    );


    if(!fechaActual){

        return;

    }


    const fecha =
    new Date();


    fechaActual.textContent =
    fecha.toLocaleDateString(
        "es-GT",
        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }
    );

}


//======================================
// ACTUALIZAR ESTADO GPS INICIAL
//======================================

function estadoGPSInicial(){

    if(rutaEnCurso){

        return;

    }


    if(estadoGPS){

        estadoGPS.textContent =
        "DISPONIBLE";

    }


    if(precisionGPS){

        precisionGPS.textContent =
        "En espera";

    }


    if(velocidadBus){

        velocidadBus.textContent =
        "0 km/h";

    }

}


//======================================
// INICIALIZACIÓN FINAL
//======================================

function iniciarDashboardConductor(){

    sincronizarNombreConductor();

    restaurarUnidad();

    mostrarFechaActual();

    mostrarHistorial();


    if(!rutaEnCurso){

        estadoGPSInicial();

    }


    setTimeout(
        function(){

            if(mapa){

                mapa.invalidateSize();

            }

        },
        400
    );

}


//======================================
// EJECUTAR DASHBOARD
//======================================

iniciarDashboardConductor();