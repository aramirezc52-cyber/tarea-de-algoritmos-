//======================================
// ROUTIFY
// RUTAS DEL DASHBOARD PASAJERO
//======================================

document.addEventListener("DOMContentLoaded", function(){

    "use strict";


    //======================================
    // CONFIGURACIÓN
    //======================================

    const URL_OSRM =
    "https://router.project-osrm.org";


    //======================================
    // RUTAS ROUTIFY
    //======================================
    // IMPORTANTE:
    // Los puntos se guardan como:
    //
    // [latitud, longitud]
    //
    // mapa-real.js utiliza ese formato.
    //======================================

    const rutas = {

        1: {

            id: 1,

            nombre: "Ruta 1",

            codigo: "R-01",

            inicio: "El Milagro",

            final: "Zona 1",

            color: "#ef4444",

            puntos: [

                [14.6349, -90.5069],

                [14.6380, -90.5150],

                [14.6400, -90.5250]

            ],

            paradas: [

                {

                    nombre:
                    "Parada El Milagro",

                    coordenadas:
                    [14.6349, -90.5069]

                },

                {

                    nombre:
                    "Parada San Juan",

                    coordenadas:
                    [14.6380, -90.5150]

                },

                {

                    nombre:
                    "Parada Periférico",

                    coordenadas:
                    [14.6400, -90.5250]

                }

            ]

        },


        2: {

            id: 2,

            nombre: "Ruta 2",

            codigo: "R-02",

            inicio: "Mixco",

            final: "Zona 10",

            color: "#1267ff",

            puntos: [

                [14.5250, -90.5900],

                [14.5500, -90.5800],

                [14.5900, -90.5700],

                [14.6200, -90.5500]

            ],

            paradas: [

                {

                    nombre:
                    "Parada Mixco",

                    coordenadas:
                    [14.5250, -90.5900]

                },

                {

                    nombre:
                    "Parada San Cristóbal",

                    coordenadas:
                    [14.5500, -90.5800]

                },

                {

                    nombre:
                    "Parada Periférico",

                    coordenadas:
                    [14.5900, -90.5700]

                },

                {

                    nombre:
                    "Parada Zona 10",

                    coordenadas:
                    [14.6200, -90.5500]

                }

            ]

        },


        3: {

            id: 3,

            nombre: "Ruta 3",

            codigo: "R-03",

            inicio: "Zona 1",

            final: "Zona 18",

            color: "#22e39a",

            puntos: [

                [14.6500, -90.5200],

                [14.6600, -90.5300],

                [14.6700, -90.5400],

                [14.6800, -90.5500]

            ],

            paradas: [

                {

                    nombre:
                    "Parada Zona 1",

                    coordenadas:
                    [14.6500, -90.5200]

                },

                {

                    nombre:
                    "Parada Zona 2",

                    coordenadas:
                    [14.6600, -90.5300]

                },

                {

                    nombre:
                    "Parada Zona 6",

                    coordenadas:
                    [14.6700, -90.5400]

                },

                {

                    nombre:
                    "Parada Zona 18",

                    coordenadas:
                    [14.6800, -90.5500]

                }

            ]

        }

    };



    //======================================
    // ELEMENTOS DEL DASHBOARD
    //======================================

    const origenRuta =
    document.getElementById(
        "origenRuta"
    );


    const destinoRuta =
    document.getElementById(
        "destinoRuta"
    );


    const btnBuscarRuta =
    document.getElementById(
        "btnBuscarRuta"
    );


    const btnIntercambiarRuta =

    document.getElementById(
        "btnIntercambiarRuta"
    )

    ||

    document.querySelector(
        ".route-swap-button"
    );


    const opcionesRuta =
    document.querySelectorAll(
        ".route-option"
    );


    const btnRutaRapida =

    document.getElementById(
        "btnRutaRapida"
    )

    ||

    opcionesRuta[0];


    const btnRutaEconomica =

    document.getElementById(
        "btnRutaEconomica"
    )

    ||

    opcionesRuta[1];


    let preferenciaRuta =
    "rapida";


    let rutaSeleccionada =
    null;



    //======================================
    // ESPERAR MAPA
    //======================================

    function obtenerMapa(){

        return window
        .ROUTIFYMapaPasajero;

    }



    //======================================
    // NORMALIZAR TEXTO
    //======================================

    function normalizarTexto(texto){

        return String(
            texto || ""
        )

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .toLowerCase()

        .trim();

    }



    //======================================
    // BUSCAR RUTA LOCAL
    //======================================

    function buscarRutaLocal(
        origen,
        destino
    ){

        const origenNormalizado =
        normalizarTexto(origen);


        const destinoNormalizado =
        normalizarTexto(destino);


        return Object.values(
            rutas
        ).find(

            function(ruta){

                const inicio =
                normalizarTexto(
                    ruta.inicio
                );


                const final =
                normalizarTexto(
                    ruta.final
                );


                const nombre =
                normalizarTexto(
                    ruta.nombre
                );


                const codigo =
                normalizarTexto(
                    ruta.codigo
                );


                const coincideOrigen =

                !origenNormalizado

                ||

                inicio.includes(
                    origenNormalizado
                )

                ||

                nombre.includes(
                    origenNormalizado
                )

                ||

                codigo.includes(
                    origenNormalizado
                );


                const coincideDestino =

                !destinoNormalizado

                ||

                final.includes(
                    destinoNormalizado
                );


                return (

                    coincideOrigen

                    &&

                    coincideDestino

                );

            }

        );

    }



    //======================================
    // CONVERTIR PUNTOS PARA OSRM
    //======================================

    function prepararCoordenadasOSRM(
        puntos
    ){

        return puntos

        .map(

            function(punto){

                const latitud =
                Number(punto[0]);


                const longitud =
                Number(punto[1]);


                return (

                    longitud

                    + ","

                    + latitud

                );

            }

        )

        .join(";");

    }



    //======================================
    // CALCULAR RUTA POR CALLES
    //======================================

    async function calcularRecorrido(
        ruta
    ){

        const coordenadas =
        prepararCoordenadasOSRM(
            ruta.puntos
        );


        const url =

        URL_OSRM

        +

        "/route/v1/driving/"

        +

        coordenadas

        +

        "?overview=full"

        +

        "&geometries=geojson"

        +

        "&steps=false"

        +

        "&alternatives=true";


        const respuesta =
        await fetch(url);


        if(!respuesta.ok){

            throw new Error(

                "No se pudo calcular "
                +
                "el recorrido."

            );

        }


        const datos =
        await respuesta.json();


        if(
            !datos.routes
            ||
            datos.routes.length === 0
        ){

            throw new Error(
                "No se encontraron recorridos."
            );

        }


        let recorrido =
        datos.routes[0];


        //==================================
        // ELEGIR RECORRIDO
        //==================================

        datos.routes.forEach(

            function(opcion){

                if(
                    preferenciaRuta ===
                    "rapida"
                ){

                    if(
                        opcion.duration <
                        recorrido.duration
                    ){

                        recorrido =
                        opcion;

                    }

                }

                else{

                    if(
                        opcion.distance <
                        recorrido.distance
                    ){

                        recorrido =
                        opcion;

                    }

                }

            }

        );


        return recorrido;

    }



    //======================================
    // CONVERTIR GEOJSON
    //======================================

    function crearGeoJSON(
        recorrido
    ){

        return {

            type:
            "Feature",

            properties: {

                distance:
                recorrido.distance,

                duration:
                recorrido.duration

            },

            geometry:
            recorrido.geometry

        };

    }



    //======================================
    // FORMATEAR DISTANCIA
    //======================================

    function formatearDistancia(
        metros
    ){

        if(metros < 1000){

            return (

                Math.round(metros)

                +

                " m"

            );

        }


        return (

            (
                metros / 1000
            ).toFixed(1)

            +

            " km"

        );

    }



    //======================================
    // FORMATEAR TIEMPO
    //======================================

    function formatearTiempo(
        segundos
    ){

        const minutos =
        Math.round(
            segundos / 60
        );


        if(minutos < 60){

            return (

                minutos

                +

                " min"

            );

        }


        const horas =
        Math.floor(
            minutos / 60
        );


        const minutosRestantes =
        minutos % 60;


        return (

            horas

            +

            " h "

            +

            minutosRestantes

            +

            " min"

        );

    }



    //======================================
    // ACTUALIZAR INFORMACIÓN
    //======================================

    function actualizarInformacion(
        ruta,
        recorrido
    ){

        const distancia =
        document.getElementById(
            "distancia"
        );


        const tiempo =
        document.getElementById(
            "tiempo"
        );


        const tiempoBus =
        document.getElementById(
            "tiempoBus"
        );


        const proximaParada =
        document.getElementById(
            "proximaParada"
        );


        if(distancia){

            distancia.textContent =
            formatearDistancia(
                recorrido.distance
            );

        }


        if(tiempo){

            tiempo.textContent =
            formatearTiempo(
                recorrido.duration
            );

        }


        if(tiempoBus){

            tiempoBus.textContent =
            formatearTiempo(
                recorrido.duration
            );

        }


        if(
            proximaParada
            &&
            ruta.paradas.length
        ){

            proximaParada.textContent =
            ruta.paradas[0].nombre;

        }

    }



    //======================================
    // MOSTRAR RUTA EN EL MAPA
    //======================================

    async function mostrarRuta(
        numeroRuta
    ){

        const ruta =
        rutas[numeroRuta];


        if(!ruta){

            mostrarMensaje(
                "No encontramos esa ruta.",
                "error"
            );

            return;

        }


        const mapa =
        obtenerMapa();


        if(!mapa){

            mostrarMensaje(
                "El mapa todavía no está listo.",
                "error"
            );

            return;

        }


        rutaSeleccionada =
        ruta;


        cambiarEstadoBoton(
            true
        );


        try{

            const recorrido =
            await calcularRecorrido(
                ruta
            );


            const geoJSON =
            crearGeoJSON(
                recorrido
            );


            mapa.limpiarRuta();


            mapa.dibujarRutaGeoJSON(

                geoJSON,

                {

                    nombre:
                    ruta.nombre,

                    color:
                    ruta.color,

                    ajustar:
                    true

                }

            );


            mapa.mostrarParadas(
                ruta.paradas
            );


            actualizarInformacion(
                ruta,
                recorrido
            );


            actualizarCampos(
                ruta
            );


            guardarRutaSeleccionada(
                ruta
            );


            mostrarMensaje(

                ruta.nombre

                +

                " mostrada correctamente.",

                "exito"

            );


            const seccionMapa =
            document.getElementById(
                "mapaSeccion"
            );


            if(seccionMapa){

                seccionMapa.scrollIntoView({

                    behavior:
                    "smooth",

                    block:
                    "center"

                });

            }

        }

        catch(error){

            console.error(
                "ROUTIFY:",
                error
            );


            //==================================
            // RESPALDO
            //==================================
            // Si OSRM no responde,
            // mostramos los puntos conectados.
            //==================================

            mapa.limpiarRuta();


            mapa.dibujarRuta(

                ruta.puntos,

                {

                    nombre:
                    ruta.nombre,

                    color:
                    ruta.color,

                    ajustar:
                    true

                }

            );


            mapa.mostrarParadas(
                ruta.paradas
            );


            actualizarCampos(
                ruta
            );


            guardarRutaSeleccionada(
                ruta
            );


            mostrarMensaje(

                "No fue posible calcular "
                +
                "el recorrido por calles. "
                +
                "Se mostró una vista aproximada.",

                "advertencia"

            );

        }

        finally{

            cambiarEstadoBoton(
                false
            );

        }

    }



    //======================================
    // ACTUALIZAR CAMPOS
    //======================================

    function actualizarCampos(
        ruta
    ){

        if(origenRuta){

            origenRuta.value =
            ruta.inicio;

        }


        if(destinoRuta){

            destinoRuta.value =
            ruta.final;

        }

    }



    //======================================
    // GUARDAR RUTA SELECCIONADA
    //======================================

    function guardarRutaSeleccionada(
        ruta
    ){

        sessionStorage.setItem(

            "rutaPasajeroROUTIFY",

            JSON.stringify({

                id:
                ruta.id,

                nombre:
                ruta.nombre,

                codigo:
                ruta.codigo,

                inicio:
                ruta.inicio,

                final:
                ruta.final

            })

        );

    }



    //======================================
    // BOTÓN BUSCAR
    //======================================

    if(btnBuscarRuta){

        btnBuscarRuta.addEventListener(

            "click",

            function(){

                const origen =

                origenRuta
                ?
                origenRuta.value.trim()
                :
                "";


                const destino =

                destinoRuta
                ?
                destinoRuta.value.trim()
                :
                "";


                if(
                    !origen
                    &&
                    !destino
                ){

                    mostrarMensaje(

                        "Escribe el origen "
                        +
                        "o destino de la ruta.",

                        "advertencia"

                    );

                    return;

                }


                const ruta =
                buscarRutaLocal(

                    origen,

                    destino

                );


                if(!ruta){

                    mostrarMensaje(

                        "No encontramos una ruta "
                        +
                        "con esos datos.",

                        "error"

                    );

                    return;

                }


                mostrarRuta(
                    ruta.id
                );

            }

        );

    }



    //======================================
    // ENTER PARA BUSCAR
    //======================================

    [
        origenRuta,
        destinoRuta
    ].forEach(

        function(input){

            if(!input){

                return;

            }


            input.addEventListener(

                "keydown",

                function(evento){

                    if(
                        evento.key ===
                        "Enter"
                    ){

                        evento.preventDefault();


                        if(btnBuscarRuta){

                            btnBuscarRuta.click();

                        }

                    }

                }

            );

        }

    );



    //======================================
    // INTERCAMBIAR ORIGEN Y DESTINO
    //======================================

    if(btnIntercambiarRuta){

        btnIntercambiarRuta.addEventListener(

            "click",

            function(){

                if(
                    !origenRuta
                    ||
                    !destinoRuta
                ){

                    return;

                }


                const origen =
                origenRuta.value;


                origenRuta.value =
                destinoRuta.value;


                destinoRuta.value =
                origen;

            }

        );

    }



    //======================================
    // RUTA MÁS RÁPIDA
    //======================================

    if(btnRutaRapida){

        btnRutaRapida.addEventListener(

            "click",

            function(){

                preferenciaRuta =
                "rapida";


                actualizarPreferencia();


                if(rutaSeleccionada){

                    mostrarRuta(
                        rutaSeleccionada.id
                    );

                }

            }

        );

    }



    //======================================
    // RUTA MÁS ECONÓMICA
    //======================================

    if(btnRutaEconomica){

        btnRutaEconomica.addEventListener(

            "click",

            function(){

                preferenciaRuta =
                "economica";


                actualizarPreferencia();


                if(rutaSeleccionada){

                    mostrarRuta(
                        rutaSeleccionada.id
                    );

                }

            }

        );

    }



    //======================================
    // ACTUALIZAR BOTONES
    //======================================

    function actualizarPreferencia(){

        if(btnRutaRapida){

            btnRutaRapida.classList.toggle(

                "active",

                preferenciaRuta ===
                "rapida"

            );

        }


        if(btnRutaEconomica){

            btnRutaEconomica.classList.toggle(

                "active",

                preferenciaRuta ===
                "economica"

            );

        }

    }



    //======================================
    // ESTADO DEL BOTÓN BUSCAR
    //======================================

    function cambiarEstadoBoton(
        cargando
    ){

        if(!btnBuscarRuta){

            return;

        }


        if(cargando){

            btnBuscarRuta.disabled =
            true;


            btnBuscarRuta.dataset
            .textoOriginal =

            btnBuscarRuta.innerHTML;


            btnBuscarRuta.innerHTML = `

                <span
                    class="spinner-border
                    spinner-border-sm"
                    aria-hidden="true">
                </span>

                Calculando ruta...

            `;

        }

        else{

            btnBuscarRuta.disabled =
            false;


            if(
                btnBuscarRuta.dataset
                .textoOriginal
            ){

                btnBuscarRuta.innerHTML =

                btnBuscarRuta.dataset
                .textoOriginal;

            }

        }

    }



    //======================================
    // MENSAJES
    //======================================

    function mostrarMensaje(
        mensaje,
        tipo = "info"
    ){

        //==================================
        // USAR TOAST DEL DASHBOARD
        // SI EXISTE
        //==================================

        if(
            typeof window.mostrarToast ===
            "function"
        ){

            window.mostrarToast(
                mensaje,
                tipo
            );

            return;

        }


        //==================================
        // MENSAJE SIMPLE TEMPORAL
        //==================================

        let aviso =
        document.getElementById(
            "avisoRutaRoutify"
        );


        if(!aviso){

            aviso =
            document.createElement(
                "div"
            );


            aviso.id =
            "avisoRutaRoutify";


            aviso.style.position =
            "fixed";


            aviso.style.right =
            "24px";


            aviso.style.bottom =
            "24px";


            aviso.style.zIndex =
            "99999";


            aviso.style.maxWidth =
            "360px";


            aviso.style.padding =
            "14px 18px";


            aviso.style.borderRadius =
            "14px";


            aviso.style.fontFamily =
            "Inter, sans-serif";


            aviso.style.fontSize =
            "13px";


            aviso.style.fontWeight =
            "600";


            aviso.style.color =
            "#ffffff";


            aviso.style.boxShadow =
            "0 14px 35px rgba(0,0,0,.25)";


            aviso.style.transition =
            "all .25s ease";


            document.body.appendChild(
                aviso
            );

        }


        if(tipo === "error"){

            aviso.style.background =
            "#dc3545";

        }

        else if(
            tipo ===
            "advertencia"
        ){

            aviso.style.background =
            "#d97706";

        }

        else{

            aviso.style.background =
            "#1267ff";

        }


        aviso.textContent =
        mensaje;


        aviso.style.opacity =
        "1";


        aviso.style.transform =
        "translateY(0)";


        clearTimeout(
            aviso._temporizador
        );


        aviso._temporizador =
        setTimeout(

            function(){

                aviso.style.opacity =
                "0";


                aviso.style.transform =
                "translateY(10px)";

            },

            3500

        );

    }



    //======================================
    // RESTAURAR ÚLTIMA RUTA
    //======================================

    function restaurarRuta(){

        const guardada =
        sessionStorage.getItem(
            "rutaPasajeroROUTIFY"
        );


        if(!guardada){

            return;

        }


        try{

            const datos =
            JSON.parse(
                guardada
            );


            if(
                datos.id
                &&
                rutas[datos.id]
            ){

                rutaSeleccionada =
                rutas[datos.id];


                actualizarCampos(
                    rutaSeleccionada
                );

            }

        }

        catch(error){

            sessionStorage.removeItem(
                "rutaPasajeroROUTIFY"
            );

        }

    }



    //======================================
    // EXPONER RUTAS
    //======================================

    window.ROUTIFYRutasPasajero = {

        rutas:
        rutas,


        mostrarRuta:
        mostrarRuta,


        obtenerRutaSeleccionada:

        function(){

            return rutaSeleccionada;

        },


        seleccionarRuta:

        function(id){

            return mostrarRuta(id);

        }

    };



    //======================================
    // INICIALIZACIÓN
    //======================================

    actualizarPreferencia();


    restaurarRuta();


    console.log(
        "ROUTIFY: sistema de rutas del pasajero cargado."
    );

});