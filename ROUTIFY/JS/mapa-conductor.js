// ==========================================================
// ROUTIFY V2
// MAPA DEL CONDUCTOR - RUTAS DINÁMICAS
// PARTE 1/3
// ==========================================================


// ==========================================================
// 1. CONFIGURACIÓN DEL MAPA
// ==========================================================

const mapaConductor = L.map(

    "mapaConductor",

    {

        zoomControl:false,

        attributionControl:true

    }

)

.setView(

    [

        14.6349,

        -90.5069

    ],

    14

);



// ==========================================================
// 2. MAPA OSCURO
// ==========================================================

L.tileLayer(

    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",

    {

        maxZoom:20,

        subdomains:"abcd",

        attribution:
        '&copy; OpenStreetMap &copy; CARTO'

    }

)

.addTo(

    mapaConductor

);



// ==========================================================
// 3. CONTROL ZOOM
// ==========================================================

L.control.zoom({

    position:"bottomright"

})

.addTo(

    mapaConductor

);



// ==========================================================
// 4. RUTAS ROUTIFY
// ==========================================================


const rutasConductor = {


    1:{


        id:1,


        nombre:"Ruta 1",


        codigo:"R-01",


        color:"#ef4444",


        puntos:[


            [

                14.6349,

                -90.5069

            ],


            [

                14.6380,

                -90.5150

            ],


            [

                14.6400,

                -90.5250

            ]

        ],


        paradas:[


            {

                nombre:"El Milagro",

                coordenadas:[

                    14.6349,

                    -90.5069

                ],

                indiceRuta:0

            },


            {

                nombre:"San Juan",

                coordenadas:[

                    14.6380,

                    -90.5150

                ],

                indiceRuta:1

            },


            {

                nombre:"Periférico",

                coordenadas:[

                    14.6400,

                    -90.5250

                ],

                indiceRuta:2

            }


        ]


    },



    2:{


        id:2,


        nombre:"Ruta 2",


        codigo:"R-02",


        color:"#1267ff",


        puntos:[


            [

                14.5250,

                -90.5900

            ],


            [

                14.5500,

                -90.5800

            ],


            [

                14.5900,

                -90.5700

            ],


            [

                14.6200,

                -90.5500

            ]


        ],


        paradas:[


            {

                nombre:"Mixco",

                coordenadas:[

                    14.5250,

                    -90.5900

                ],

                indiceRuta:0

            },


            {

                nombre:"San Cristóbal",

                coordenadas:[

                    14.5500,

                    -90.5800

                ],

                indiceRuta:1

            },


            {

                nombre:"Zona 10",

                coordenadas:[

                    14.6200,

                    -90.5500

                ],

                indiceRuta:3

            }


        ]


    },



    3:{


        id:3,


        nombre:"Ruta 3",


        codigo:"R-03",


        color:"#22e39a",


        puntos:[


            [

                14.6500,

                -90.5200

            ],


            [

                14.6600,

                -90.5300

            ],


            [

                14.6800,

                -90.5500

            ]


        ],


        paradas:[


            {

                nombre:"Zona 1",

                coordenadas:[

                    14.6500,

                    -90.5200

                ],

                indiceRuta:0

            },


            {

                nombre:"Zona 18",

                coordenadas:[

                    14.6800,

                    -90.5500

                ],

                indiceRuta:2

            }


        ]


    }


};



// ==========================================================
// 5. VARIABLES DE RUTA ACTUAL
// ==========================================================


let rutaSeleccionadaConductor =

    rutasConductor[1];



let recorridoConductor =

    rutaSeleccionadaConductor.puntos;



let paradasConductor =

    rutaSeleccionadaConductor.paradas;



let colorRutaActual =

    rutaSeleccionadaConductor.color;



let rutaConductor = null;



let sombraRutaConductor = null;



let marcadoresParadasConductor = [];



// ==========================================================
// 6. ICONO DEL BUS
// ==========================================================


const iconoBusConductor = L.divIcon({

    className:"",

    html:

    `

    <div class="driver-bus-marker">

        <div class="driver-bus-pulse"></div>


        <div class="driver-bus-icon">

            <i class="bi bi-bus-front-fill"></i>

        </div>


    </div>

    `,


    iconSize:[46,46],

    iconAnchor:[23,23]


});



// ==========================================================
// 7. ICONO PARADA
// ==========================================================


const iconoParadaConductor = L.divIcon({

    className:"",

    html:

    `

    <div class="driver-stop-marker">

        <i class="bi bi-geo-alt-fill"></i>

    </div>

    `,


    iconSize:[26,26],

    iconAnchor:[13,13]


});

// ==========================================================
// 8. DIBUJAR RUTA SELECCIONADA
// ==========================================================


function dibujarRutaConductor(){


    // limpiar ruta anterior

    if(rutaConductor){

        mapaConductor.removeLayer(
            rutaConductor
        );

    }


    if(sombraRutaConductor){

        mapaConductor.removeLayer(
            sombraRutaConductor
        );

    }



    // limpiar paradas anteriores

    marcadoresParadasConductor.forEach(

        marcador => {

            mapaConductor.removeLayer(
                marcador
            );

        }

    );


    marcadoresParadasConductor = [];



    // sombra de ruta

    sombraRutaConductor = L.polyline(

        recorridoConductor,

        {

            color:"#020617",

            weight:12,

            opacity:.55,

            lineCap:"round"

        }

    )

    .addTo(

        mapaConductor

    );



    // ruta principal

    rutaConductor = L.polyline(

        recorridoConductor,

        {

            color:
            colorRutaActual,

            weight:6,

            opacity:.95,

            lineCap:"round"

        }

    )

    .addTo(

        mapaConductor

    );



    // agregar paradas

    paradasConductor.forEach(

        parada => {


            const marcador = L.marker(

                parada.coordenadas,

                {

                    icon:
                    iconoParadaConductor

                }

            )

            .addTo(

                mapaConductor

            )

            .bindPopup(

            `

            <div class="driver-popup">

                <strong>

                    ${parada.nombre}

                </strong>

                <span>

                    ${rutaSeleccionadaConductor.nombre}

                </span>

            </div>

            `

            );


            marcadoresParadasConductor.push(

                marcador

            );


        }

    );



    mapaConductor.fitBounds(

        rutaConductor.getBounds(),

        {

            padding:[

                60,

                60

            ]

        }

    );


}




// ==========================================================
// 9. CAMBIAR RUTA DEL CONDUCTOR
// ==========================================================


function cargarRutaConductor(idRuta){


    const nuevaRuta =

        rutasConductor[idRuta];



    if(!nuevaRuta){

        console.error(

            "ROUTIFY: Ruta no encontrada"

        );

        return;

    }



    rutaSeleccionadaConductor =

        nuevaRuta;



    recorridoConductor =

        nuevaRuta.puntos;



    paradasConductor =

        nuevaRuta.paradas;



    colorRutaActual =

        nuevaRuta.color;



    // reiniciar recorrido

    indiceRecorrido = 0;

    servicioActivo = false;

    servicioPausado = false;

    servicioFinalizado = false;



    if(animacionBus){

        cancelAnimationFrame(

            animacionBus

        );

    }



    marcadorBusConductor.setLatLng(

        recorridoConductor[0]

    );



    dibujarRutaConductor();



    renderizarParadasConductor();



    actualizarProgresoMapa();



    console.log(

        "Ruta cargada:",

        nuevaRuta.nombre

    );

}





// ==========================================================
// 10. MARCADOR DEL BUS
// ==========================================================


const marcadorBusConductor = L.marker(

    recorridoConductor[0],

    {

        icon:

        iconoBusConductor,

        zIndexOffset:1000

    }

)

.addTo(

    mapaConductor

);



marcadorBusConductor.bindPopup(

`

<div class="driver-popup">

<strong>

${rutaSeleccionadaConductor.nombre}

</strong>


<span>

Unidad ROUTIFY activa

</span>


<small>

Conductor conectado

</small>


</div>

`

);




// ==========================================================
// 11. VARIABLES DEL MOVIMIENTO
// ==========================================================


let indiceRecorrido = 0;


let animacionBus = null;


let servicioActivo = false;


let servicioPausado = false;


let servicioFinalizado = false;


let movimientoEnCurso = false;



let distanciaTotalRecorrida = 0;



let ultimaPosicionDistancia =

L.latLng(

    recorridoConductor[0]

);




// ==========================================================
// 12. INTERPOLACIÓN DEL BUS
// ==========================================================


function interpolarCoordenadas(

    inicio,

    fin,

    progreso

){


    const lat =

        inicio.lat +

        (

            fin.lat -

            inicio.lat

        )

        *

        progreso;



    const lng =

        inicio.lng +

        (

            fin.lng -

            inicio.lng

        )

        *

        progreso;



    return [

        lat,

        lng

    ];


}




// ==========================================================
// 13. ANIMAR BUS
// ==========================================================


function animarBusConductor(

    destino,

    duracion = 4500

){


    if(

        movimientoEnCurso ||

        !servicioActivo ||

        servicioPausado ||

        servicioFinalizado

    ){

        return;

    }



    movimientoEnCurso = true;



    const inicio =

        marcadorBusConductor.getLatLng();



    const final =

        L.latLng(

            destino

        );



    const tiempoInicio =

        performance.now();



    function mover(

        tiempo

    ){


        if(

            servicioPausado ||

            servicioFinalizado

        ){

            movimientoEnCurso=false;

            return;

        }



        let progreso =

        (

            tiempo -

            tiempoInicio

        )

        /

        duracion;



        progreso = Math.min(

            progreso,

            1

        );



        const suave =

        progreso *

        progreso *

        (

            3 -

            2 *

            progreso

        );



        marcadorBusConductor.setLatLng(

            interpolarCoordenadas(

                inicio,

                final,

                suave

            )

        );



        if(progreso < 1){


            animacionBus =

            requestAnimationFrame(

                mover

            );


        }

        else{


            movimientoEnCurso=false;



            actualizarProgresoMapa();



            setTimeout(

                avanzarBusConductor,

                700

            );


        }


    }



    animacionBus =

    requestAnimationFrame(

        mover

    );


}




// ==========================================================
// 14. AVANZAR BUS
// ==========================================================


function avanzarBusConductor(){


    if(

        !servicioActivo ||

        servicioPausado ||

        servicioFinalizado

    ){

        return;

    }



    if(

        indiceRecorrido >=

        recorridoConductor.length - 1

    ){

        finalizarMapaConductor();

        return;

    }



    indiceRecorrido++;



    animarBusConductor(

        recorridoConductor[

            indiceRecorrido

        ]

    );


}

// ==========================================================
// ROUTIFY V2
// MAPA DEL CONDUCTOR
// PARTE 3/3
// ==========================================================


// ==========================================================
// 15. ELEMENTOS DEL DASHBOARD
// ==========================================================


const porcentajeRutaConductor =

document.getElementById(

    "porcentajeRuta"

);



const barraRutaConductor =

document.getElementById(

    "barraProgresoRuta"

);



const proximaParadaConductor =

document.getElementById(

    "proximaParadaConductor"

);



const paradasCompletadasConductor =

document.getElementById(

    "paradasCompletadas"

);



const velocidadConductor =

document.getElementById(

    "velocidadBus"

);



const listaParadasConductor =

document.getElementById(

    "listaParadasConductor"

);




// ==========================================================
// 16. OBTENER PRÓXIMA PARADA
// ==========================================================


function obtenerProximaParada(){


    return paradasConductor.find(

        parada =>

            parada.indiceRuta >= indiceRecorrido

    );


}




// ==========================================================
// 17. RENDERIZAR PARADAS
// ==========================================================


function renderizarParadasConductor(){


    if(!listaParadasConductor){

        return;

    }



    listaParadasConductor.innerHTML="";



    paradasConductor.forEach(

        (

            parada,

            indice

        )=>{


            const item =

            document.createElement(

                "div"

            );



            item.className=

            "driver-stop";



            if(

                indiceRecorrido >

                parada.indiceRuta

            ){

                item.classList.add(

                    "completed"

                );

            }



            const siguiente =

            obtenerProximaParada();



            if(

                siguiente &&

                siguiente.nombre ===

                parada.nombre

            ){

                item.classList.add(

                    "active"

                );

            }



            item.innerHTML=

            `

            <span></span>


            <div class="driver-stop-text">


                <strong>

                    ${parada.nombre}

                </strong>


                <small>

                    ${
                    indiceRecorrido >

                    parada.indiceRuta

                    ?

                    "Completada"

                    :

                    siguiente &&

                    siguiente.nombre ===

                    parada.nombre

                    ?

                    "Próxima parada"

                    :

                    "Pendiente"

                    }

                </small>


            </div>

            `;



            listaParadasConductor.appendChild(

                item

            );


        }

    );


}





// ==========================================================
// 18. ACTUALIZAR PROGRESO
// ==========================================================


function actualizarProgresoMapa(){



    const porcentaje = Math.round(

        (

            indiceRecorrido /

            (

                recorridoConductor.length - 1

            )

        )

        *

        100

    );



    if(porcentajeRutaConductor){


        porcentajeRutaConductor.textContent=

        porcentaje+"%";


    }



    if(barraRutaConductor){


        barraRutaConductor.style.width=

        porcentaje+"%";


    }



    const siguiente =

    obtenerProximaParada();



    if(proximaParadaConductor){


        proximaParadaConductor.textContent=

        siguiente

        ?

        siguiente.nombre

        :

        "Destino alcanzado";


    }



    const completadas =

    paradasConductor.filter(

        parada =>

        indiceRecorrido >

        parada.indiceRuta

    ).length;



    if(paradasCompletadasConductor){


        paradasCompletadasConductor.textContent=

        completadas+

        " / "+

        paradasConductor.length;


    }



    renderizarParadasConductor();


}




// ==========================================================
// 19. INICIAR RECORRIDO
// ==========================================================


function iniciarMapaConductor(){


    servicioActivo=true;


    servicioPausado=false;


    servicioFinalizado=false;



    avanzarBusConductor();


}




// ==========================================================
// 20. PAUSAR RECORRIDO
// ==========================================================


function pausarMapaConductor(){


    servicioPausado=true;



    if(animacionBus){


        cancelAnimationFrame(

            animacionBus

        );


    }



    movimientoEnCurso=false;



    if(velocidadConductor){


        velocidadConductor.textContent=

        "0 km/h";


    }


}




// ==========================================================
// 21. REANUDAR RECORRIDO
// ==========================================================


function reanudarMapaConductor(){


    servicioPausado=false;


    servicioActivo=true;


    avanzarBusConductor();


}





// ==========================================================
// 22. FINALIZAR RECORRIDO
// ==========================================================


function finalizarMapaConductor(){


    servicioActivo=false;


    servicioFinalizado=true;


    movimientoEnCurso=false;



    marcadorBusConductor.setLatLng(

        recorridoConductor[

            recorridoConductor.length-1

        ]

    );



    if(porcentajeRutaConductor){


        porcentajeRutaConductor.textContent=

        "100%";


    }



    if(barraRutaConductor){


        barraRutaConductor.style.width=

        "100%";


    }



}





// ==========================================================
// 23. EVENTOS DEL DASHBOARD
// ==========================================================


document.addEventListener(

    "routify:iniciar-recorrido",

    ()=>{


        iniciarMapaConductor();


    }

);



document.addEventListener(

    "routify:pausar-recorrido",

    ()=>{


        pausarMapaConductor();


    }

);



document.addEventListener(

    "routify:reanudar-recorrido",

    ()=>{


        reanudarMapaConductor();


    }

);



document.addEventListener(

    "routify:finalizar-recorrido",

    ()=>{


        finalizarMapaConductor();


    }

);




// ==========================================================
// 24. SELECTOR DE RUTA
// ==========================================================


const selectorRutaConductor =

document.getElementById(

    "selectorRutaConductor"

);



if(selectorRutaConductor){


    selectorRutaConductor.addEventListener(

        "change",

        function(){


            cargarRutaConductor(

                this.value

            );


        }

    );


}




// ==========================================================
// 25. BOTÓN CENTRAR BUS
// ==========================================================


const btnCentrarBus =

document.getElementById(

    "btnCentrarBus"

);



if(btnCentrarBus){


    btnCentrarBus.addEventListener(

        "click",

        ()=>{


            mapaConductor.flyTo(

                marcadorBusConductor.getLatLng(),

                16,

                {

                    duration:1

                }

            );


            marcadorBusConductor.openPopup();


        }

    );


}




// ==========================================================
// 26. PANTALLA COMPLETA
// ==========================================================


const btnPantallaCompleta =

document.getElementById(

    "btnPantallaCompleta"

);



const tarjetaMapaConductor =

document.querySelector(

    ".driver-map-card"

);



if(

    btnPantallaCompleta &&

    tarjetaMapaConductor

){


    btnPantallaCompleta.addEventListener(

        "click",

        async ()=>{


            if(

                !document.fullscreenElement

            ){


                await tarjetaMapaConductor.requestFullscreen();


            }

            else{


                await document.exitFullscreen();


            }



            setTimeout(

                ()=>{


                    mapaConductor.invalidateSize();


                },

                300

            );


        }

    );


}




// ==========================================================
// 27. REDIMENSIONAR MAPA
// ==========================================================


window.addEventListener(

    "resize",

    ()=>{


        mapaConductor.invalidateSize();


    }

);





// ==========================================================
// 28. INICIAR MAPA
// ==========================================================


dibujarRutaConductor();


renderizarParadasConductor();


actualizarProgresoMapa();





// ==========================================================
// 29. API DISPONIBLE
// ==========================================================


window.ROUTIFYMapaConductor = {


    cargarRuta:

    cargarRutaConductor,


    iniciar:

    iniciarMapaConductor,


    pausar:

    pausarMapaConductor,


    finalizar:

    finalizarMapaConductor,


    mapa:

    mapaConductor,


    obtenerRutaActual(){

        return rutaSeleccionadaConductor;

    }


};



console.log(

    "ROUTIFY: mapa conductor cargado correctamente"

);