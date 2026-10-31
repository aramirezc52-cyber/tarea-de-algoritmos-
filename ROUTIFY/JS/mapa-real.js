//======================================
// ROUTIFY - MAPA REAL DEL PASAJERO
//======================================

document.addEventListener("DOMContentLoaded", function(){

    "use strict";


    //======================================
    // ELEMENTOS
    //======================================

    const contenedorMapa =
    document.getElementById("mapa");


    if(!contenedorMapa){

        console.warn(
            "ROUTIFY: No se encontró #mapa."
        );

        return;

    }


    if(typeof L === "undefined"){

        console.error(
            "ROUTIFY: Leaflet no está cargado."
        );

        return;

    }



    //======================================
    // CONFIGURACIÓN DEL MAPA
    //======================================

    const CENTRO_INICIAL = [

        14.6349,

        -90.5069

    ];


    const ZOOM_INICIAL = 13;


    const mapa = L.map(

        "mapa",

        {

            preferCanvas: true,

            zoomControl: true,

            attributionControl: true,

            zoomAnimation: true,

            fadeAnimation: true,

            markerZoomAnimation: true

        }

    ).setView(

        CENTRO_INICIAL,

        ZOOM_INICIAL

    );



    //======================================
    // OPENSTREETMAP
    //======================================

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 19,

            minZoom: 3,

            updateWhenIdle: true,

            keepBuffer: 3,

            attribution:
            "&copy; OpenStreetMap contributors"

        }

    ).addTo(mapa);



    //======================================
    // CAPAS
    //======================================

    const capaParadas =
    L.layerGroup().addTo(mapa);


    const capaPuntosRuta =
    L.layerGroup().addTo(mapa);


    let capaRuta = null;


    let marcadorBus = null;


    let marcadorPasajero = null;


    let posicionBus = null;


    let posicionPasajero = null;


    let rutaActual = null;


    let animacionBus = null;


    let ultimaUbicacionBus = "";


    let seguimientoBus = false;



    //======================================
    // ESTILOS DE MARCADORES
    //======================================

    const estilosMapa =
    document.createElement("style");


    estilosMapa.textContent = `

        .routify-marker{
            display:flex;
            align-items:center;
            justify-content:center;
            width:42px;
            height:42px;
            border-radius:14px;
            color:#ffffff;
            border:3px solid rgba(255,255,255,.95);
            box-shadow:
            0 8px 24px rgba(0,0,0,.30);
            font-size:19px;
        }


        .routify-marker-bus{
            background:
            linear-gradient(
                135deg,
                #1267ff,
                #22d3ee
            );
        }


        .routify-marker-pasajero{
            width:34px;
            height:34px;
            border-radius:50%;
            background:
            linear-gradient(
                135deg,
                #22e39a,
                #16a36f
            );
            font-size:15px;
        }


        .routify-marker-parada{
            width:31px;
            height:31px;
            border-radius:50%;
            background:#071b2d;
            border:3px solid #22d3ee;
            font-size:13px;
        }


        .routify-popup h4{
            margin:0 0 8px;
            font-size:14px;
        }


        .routify-popup p{
            margin:4px 0;
            font-size:12px;
        }


        .routify-popup strong{
            font-weight:700;
        }


        #mapa:fullscreen{
            width:100%;
            height:100%;
            background:#06111e;
        }


        .mapa-routify-fullscreen{
            width:100% !important;
            height:100% !important;
        }

    `;


    document.head.appendChild(
        estilosMapa
    );



    //======================================
    // ICONO DEL BUS
    //======================================

    const iconoBus =
    L.divIcon({

        className: "",

        html: `

            <div class="routify-marker routify-marker-bus">

                <i class="bi bi-bus-front-fill"></i>

            </div>

        `,

        iconSize: [42, 42],

        iconAnchor: [21, 21],

        popupAnchor: [0, -24]

    });



    //======================================
    // ICONO DEL PASAJERO
    //======================================

    const iconoPasajero =
    L.divIcon({

        className: "",

        html: `

            <div class="routify-marker routify-marker-pasajero">

                <i class="bi bi-person-fill"></i>

            </div>

        `,

        iconSize: [34, 34],

        iconAnchor: [17, 17],

        popupAnchor: [0, -20]

    });



    //======================================
    // CREAR ICONO DE PARADA
    //======================================

    function crearIconoParada(){

        return L.divIcon({

            className: "",

            html: `

                <div class="routify-marker routify-marker-parada">

                    <i class="bi bi-geo-alt-fill"></i>

                </div>

            `,

            iconSize: [31, 31],

            iconAnchor: [15, 15],

            popupAnchor: [0, -18]

        });

    }



    //======================================
    // VALIDAR COORDENADAS
    //======================================

    function coordenadaValida(
        latitud,
        longitud
    ){

        return (

            Number.isFinite(
                Number(latitud)
            )

            &&

            Number.isFinite(
                Number(longitud)
            )

            &&

            Number(latitud) >= -90

            &&

            Number(latitud) <= 90

            &&

            Number(longitud) >= -180

            &&

            Number(longitud) <= 180

        );

    }



    //======================================
    // NORMALIZAR COORDENADA
    //======================================

    function normalizarCoordenada(
        coordenada
    ){

        if(
            Array.isArray(coordenada)
            &&
            coordenada.length >= 2
        ){

            const latitud =
            Number(coordenada[0]);


            const longitud =
            Number(coordenada[1]);


            if(
                coordenadaValida(
                    latitud,
                    longitud
                )
            ){

                return [

                    latitud,

                    longitud

                ];

            }

        }


        if(
            coordenada
            &&
            typeof coordenada === "object"
        ){

            const latitud =
            Number(

                coordenada.lat ??

                coordenada.latitud ??

                coordenada.latitude

            );


            const longitud =
            Number(

                coordenada.lng ??

                coordenada.lon ??

                coordenada.longitud ??

                coordenada.longitude

            );


            if(
                coordenadaValida(
                    latitud,
                    longitud
                )
            ){

                return [

                    latitud,

                    longitud

                ];

            }

        }


        return null;

    }



    //======================================
    // CALCULAR DISTANCIA
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
        grados =>
        grados * Math.PI / 180;


        const diferenciaLatitud =
        convertirRadianes(
            lat2 - lat1
        );


        const diferenciaLongitud =
        convertirRadianes(
            lon2 - lon1
        );


        const a =

        Math.sin(
            diferenciaLatitud / 2
        ) ** 2

        +

        Math.cos(
            convertirRadianes(lat1)
        )

        *

        Math.cos(
            convertirRadianes(lat2)
        )

        *

        Math.sin(
            diferenciaLongitud / 2
        ) ** 2;


        const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );


        return radioTierra * c;

    }



    //======================================
    // ACTUALIZAR DISTANCIA BUS
    //======================================

    function actualizarDistanciaBus(){

        if(
            !posicionBus
            ||
            !posicionPasajero
        ){

            return;

        }


        const distancia =
        calcularDistancia(

            posicionPasajero.lat,

            posicionPasajero.lng,

            posicionBus.lat,

            posicionBus.lng

        );


        const distanciaBus =
        document.getElementById(
            "distanciaBus"
        );


        const distanciaDashboard =
        document.getElementById(
            "distancia"
        );


        let textoDistancia;


        if(distancia < 1){

            textoDistancia =

            Math.round(
                distancia * 1000
            )

            + " m";

        }

        else{

            textoDistancia =

            distancia.toFixed(1)

            + " km";

        }


        if(distanciaBus){

            distanciaBus.textContent =
            textoDistancia;

        }


        if(distanciaDashboard){

            distanciaDashboard.textContent =
            textoDistancia;

        }

    }



    //======================================
    // ANIMAR MARCADOR DEL BUS
    //======================================

    function animarBus(
        destino
    ){

        if(!marcadorBus){

            return;

        }


        if(animacionBus){

            cancelAnimationFrame(
                animacionBus
            );

        }


        const inicio =
        marcadorBus.getLatLng();


        const inicioAnimacion =
        performance.now();


        const duracion =
        900;


        function mover(
            tiempoActual
        ){

            const progreso =
            Math.min(

                (
                    tiempoActual -
                    inicioAnimacion
                )

                /

                duracion,

                1

            );


            const suavizado =

            1 -

            Math.pow(
                1 - progreso,
                3
            );


            const latitud =

            inicio.lat

            +

            (
                destino.lat -
                inicio.lat
            )

            *

            suavizado;


            const longitud =

            inicio.lng

            +

            (
                destino.lng -
                inicio.lng
            )

            *

            suavizado;


            marcadorBus.setLatLng([

                latitud,

                longitud

            ]);


            if(progreso < 1){

                animacionBus =
                requestAnimationFrame(
                    mover
                );

            }

            else{

                animacionBus = null;

            }

        }


        animacionBus =
        requestAnimationFrame(
            mover
        );

    }



    //======================================
    // ACTUALIZAR BUS
    //======================================

    function actualizarBus(
        datos
    ){

        if(!datos){

            return;

        }


        const latitud =
        Number(

            datos.lat ??

            datos.latitud ??

            datos.latitude

        );


        const longitud =
        Number(

            datos.lng ??

            datos.lon ??

            datos.longitud ??

            datos.longitude

        );


        if(
            !coordenadaValida(
                latitud,
                longitud
            )
        ){

            return;

        }


        posicionBus = {

            lat: latitud,

            lng: longitud

        };


        if(!marcadorBus){

            marcadorBus =
            L.marker(

                [
                    latitud,
                    longitud
                ],

                {

                    icon: iconoBus,

                    zIndexOffset: 1000

                }

            ).addTo(mapa);


            marcadorBus.bindPopup(`

                <div class="routify-popup">

                    <h4>
                        Unidad ROUTIFY
                    </h4>

                    <p>
                        Seguimiento en tiempo real
                    </p>

                </div>

            `);

        }

        else{

            animarBus(
                posicionBus
            );

        }


        if(seguimientoBus){

            mapa.panTo(

                [
                    latitud,
                    longitud
                ],

                {

                    animate: true,

                    duration: .5

                }

            );

        }


        actualizarDistanciaBus();

    }



    //======================================
    // LEER BUS DE LOCALSTORAGE
    //======================================

    function leerUbicacionBus(){

        const ubicacionGuardada =
        localStorage.getItem(
            "ubicacionBus"
        );


        if(
            !ubicacionGuardada
            ||
            ubicacionGuardada ===
            ultimaUbicacionBus
        ){

            return;

        }


        ultimaUbicacionBus =
        ubicacionGuardada;


        try{

            const datos =
            JSON.parse(
                ubicacionGuardada
            );


            actualizarBus(
                datos
            );

        }

        catch(error){

            console.error(
                "ROUTIFY: ubicación del bus inválida.",
                error
            );

        }

    }



    //======================================
    // EVENTO STORAGE
    //======================================

    window.addEventListener(

        "storage",

        function(evento){

            if(
                evento.key ===
                "ubicacionBus"
            ){

                leerUbicacionBus();

            }

        }

    );



    //======================================
    // COMPROBAR UBICACIÓN DEL BUS
    //======================================

    leerUbicacionBus();


    const intervaloBus =
    setInterval(

        leerUbicacionBus,

        1500

    );



    //======================================
    // UBICACIÓN DEL PASAJERO
    //======================================

    function solicitarUbicacionUsuario(){

        return new Promise(

            function(resolve, reject){

                if(
                    !navigator.geolocation
                ){

                    reject(
                        new Error(
                            "Geolocalización no disponible."
                        )
                    );

                    return;

                }


                navigator.geolocation.getCurrentPosition(

                    function(posicion){

                        const latitud =
                        posicion.coords.latitude;


                        const longitud =
                        posicion.coords.longitude;


                        posicionPasajero = {

                            lat: latitud,

                            lng: longitud

                        };


                        if(!marcadorPasajero){

                            marcadorPasajero =
                            L.marker(

                                [
                                    latitud,
                                    longitud
                                ],

                                {

                                    icon:
                                    iconoPasajero,

                                    zIndexOffset:
                                    900

                                }

                            ).addTo(mapa);


                            marcadorPasajero.bindPopup(`

                                <div class="routify-popup">

                                    <h4>
                                        Tu ubicación
                                    </h4>

                                    <p>
                                        Ubicación utilizada solamente
                                        durante esta sesión del mapa.
                                    </p>

                                </div>

                            `);

                        }

                        else{

                            marcadorPasajero.setLatLng([

                                latitud,

                                longitud

                            ]);

                        }


                        actualizarDistanciaBus();


                        resolve({

                            lat: latitud,

                            lng: longitud

                        });

                    },


                    function(error){

                        reject(error);

                    },


                    {

                        enableHighAccuracy:
                        false,

                        timeout:
                        10000,

                        maximumAge:
                        15000

                    }

                );

            }

        );

    }



    //======================================
    // MOSTRAR PARADAS
    //======================================

    function mostrarParadas(
        paradas = []
    ){

        capaParadas.clearLayers();


        paradas.forEach(

            function(parada, indice){

                const coordenada =
                normalizarCoordenada(

                    parada.coordenadas ??

                    parada

                );


                if(!coordenada){

                    return;

                }


                const nombre =

                parada.nombre ??

                `Parada ${indice + 1}`;


                const marcador =
                L.marker(

                    coordenada,

                    {

                        icon:
                        crearIconoParada()

                    }

                );


                marcador.bindPopup(`

                    <div class="routify-popup">

                        <h4>
                            ${nombre}
                        </h4>

                        <p>
                            Parada ${indice + 1}
                        </p>

                    </div>

                `);


                marcador.addTo(
                    capaParadas
                );

            }

        );

    }



    //======================================
    // DIBUJAR RECORRIDO
    //======================================

    function dibujarRuta(

        coordenadas = [],

        opciones = {}

    ){

        const coordenadasValidas =

        coordenadas

        .map(
            normalizarCoordenada
        )

        .filter(Boolean);


        if(
            coordenadasValidas.length < 2
        ){

            console.warn(
                "ROUTIFY: la ruta necesita al menos dos coordenadas."
            );

            return null;

        }


        if(capaRuta){

            mapa.removeLayer(
                capaRuta
            );

            capaRuta = null;

        }


        const color =

        opciones.color ??

        "#1267ff";


        capaRuta =
        L.polyline(

            coordenadasValidas,

            {

                color: color,

                weight: 6,

                opacity: .9,

                lineCap: "round",

                lineJoin: "round",

                smoothFactor: 1.5

            }

        ).addTo(mapa);


        rutaActual = {

            coordenadas:
            coordenadasValidas,

            nombre:
            opciones.nombre ??
            "Ruta ROUTIFY",

            color:
            color

        };


        if(
            opciones.ajustar !== false
        ){

            mapa.fitBounds(

                capaRuta.getBounds(),

                {

                    padding:
                    [45, 45],

                    maxZoom:
                    16

                }

            );

        }


        return capaRuta;

    }



    //======================================
    // DIBUJAR GEOJSON
    //======================================

    function dibujarRutaGeoJSON(

        geoJSON,

        opciones = {}

    ){

        if(!geoJSON){

            return null;

        }


        if(capaRuta){

            mapa.removeLayer(
                capaRuta
            );

            capaRuta = null;

        }


        capaRuta =
        L.geoJSON(

            geoJSON,

            {

                style: {

                    color:

                    opciones.color ??

                    "#1267ff",

                    weight:
                    6,

                    opacity:
                    .9,

                    lineCap:
                    "round",

                    lineJoin:
                    "round"

                }

            }

        ).addTo(mapa);


        rutaActual = {

            geoJSON: geoJSON,

            nombre:

            opciones.nombre ??

            "Ruta ROUTIFY"

        };


        if(
            opciones.ajustar !== false
            &&
            capaRuta.getBounds().isValid()
        ){

            mapa.fitBounds(

                capaRuta.getBounds(),

                {

                    padding:
                    [45, 45],

                    maxZoom:
                    16

                }

            );

        }


        return capaRuta;

    }



    //======================================
    // LIMPIAR RUTA
    //======================================

    function limpiarRuta(){

        if(capaRuta){

            mapa.removeLayer(
                capaRuta
            );

            capaRuta = null;

        }


        capaParadas.clearLayers();


        capaPuntosRuta.clearLayers();


        rutaActual = null;

    }



    //======================================
    // CENTRAR EN BUS
    //======================================

    function centrarBus(){

        if(!posicionBus){

            return false;

        }


        mapa.flyTo(

            [
                posicionBus.lat,
                posicionBus.lng
            ],

            16,

            {

                animate:
                true,

                duration:
                .7

            }

        );


        return true;

    }



    //======================================
    // CENTRAR PASAJERO
    //======================================

    async function centrarPasajero(){

        try{

            if(!posicionPasajero){

                await solicitarUbicacionUsuario();

            }


            mapa.flyTo(

                [
                    posicionPasajero.lat,
                    posicionPasajero.lng
                ],

                16,

                {

                    animate:
                    true,

                    duration:
                    .7

                }

            );


            return true;

        }

        catch(error){

            console.warn(
                "No fue posible obtener la ubicación.",
                error
            );


            return false;

        }

    }



    //======================================
    // BOTÓN CENTRAR MAPA
    //======================================

    const btnCentrarMapa =

    document.getElementById(
        "btnCentrarMapa"
    )

    ||

    document.querySelector(
        ".map-action-button"
    );


    if(btnCentrarMapa){

        btnCentrarMapa.addEventListener(

            "click",

            async function(){

                if(centrarBus()){

                    return;

                }


                await centrarPasajero();

            }

        );

    }



    //======================================
    // BOTÓN PANTALLA COMPLETA
    //======================================

    const botonesMapa =
    document.querySelectorAll(
        ".map-action-button"
    );


    const btnPantallaCompleta =

    document.getElementById(
        "btnPantallaCompleta"
    )

    ||

    botonesMapa[1];


    const seccionMapa =

    document.getElementById(
        "mapaSeccion"
    )

    ||

    contenedorMapa;


    if(btnPantallaCompleta){

        btnPantallaCompleta.addEventListener(

            "click",

            async function(){

                try{

                    if(
                        !document.fullscreenElement
                    ){

                        await seccionMapa
                        .requestFullscreen();

                    }

                    else{

                        await document
                        .exitFullscreen();

                    }

                }

                catch(error){

                    console.warn(
                        "Pantalla completa no disponible.",
                        error
                    );

                }

            }

        );

    }



    //======================================
    // ACTUALIZAR MAPA AL CAMBIAR TAMAÑO
    //======================================

    document.addEventListener(

        "fullscreenchange",

        function(){

            setTimeout(

                function(){

                    mapa.invalidateSize();

                },

                250

            );

        }

    );


    window.addEventListener(

        "resize",

        function(){

            mapa.invalidateSize({

                pan: false

            });

        }

    );



    //======================================
    // SEGUIMIENTO DEL BUS
    //======================================

    function activarSeguimientoBus(){

        seguimientoBus = true;


        centrarBus();

    }


    function desactivarSeguimientoBus(){

        seguimientoBus = false;

    }



    //======================================
    // EXPONER API DEL MAPA
    //======================================

    window.ROUTIFYMapaPasajero = {

        mapa:
        mapa,


        dibujarRuta:
        dibujarRuta,


        dibujarRutaGeoJSON:
        dibujarRutaGeoJSON,


        mostrarParadas:
        mostrarParadas,


        limpiarRuta:
        limpiarRuta,


        actualizarBus:
        actualizarBus,


        solicitarUbicacionUsuario:
        solicitarUbicacionUsuario,


        centrarBus:
        centrarBus,


        centrarPasajero:
        centrarPasajero,


        activarSeguimientoBus:
        activarSeguimientoBus,


        desactivarSeguimientoBus:
        desactivarSeguimientoBus,


        obtenerPosicionBus:

        function(){

            return posicionBus;

        },


        obtenerPosicionPasajero:

        function(){

            return posicionPasajero;

        },


        obtenerRutaActual:

        function(){

            return rutaActual;

        }

    };



    //======================================
    // MAPA LISTO
    //======================================

    setTimeout(

        function(){

            mapa.invalidateSize();

        },

        300

    );



    //======================================
    // LIMPIEZA
    //======================================

    window.addEventListener(

        "beforeunload",

        function(){

            clearInterval(
                intervaloBus
            );


            if(animacionBus){

                cancelAnimationFrame(
                    animacionBus
                );

            }

        }

    );


    console.log(
        "ROUTIFY: mapa del pasajero cargado correctamente."
    );

});