// ==========================================================
// ROUTIFY V2
// DASHBOARD PASAJERO
// ==========================================================

const usuario =
JSON.parse(
sessionStorage.getItem(
"sesionROUTIFY"
)
);


if(!usuario){

window.location.href =
"login.html";

}



if(
usuario.rol === "conductor"
){

window.location.href =
"dashboard-conductor.html";

}

document.addEventListener(

    "DOMContentLoaded",

    function(){

        "use strict";


        // ==================================================
        // 1. OBTENER USUARIO
        // ==================================================

        let usuarioActivo = null;


        try{

            usuarioActivo =
            JSON.parse(

                sessionStorage.getItem(
                    "sesionROUTIFY"
                )

            );

        }

        catch(error){

            console.error(

                "ROUTIFY: error leyendo sesión.",

                error

            );

        }


        if(!usuarioActivo){

            return;

        }



        // ==================================================
        // 2. DATOS DEL USUARIO
        // ==================================================

        const nombreUsuario =

        usuarioActivo.nombre

        ||

        usuarioActivo.name

        ||

        usuarioActivo.nombre_completo

        ||

        "Pasajero";


        const correoUsuario =

        usuarioActivo.correo

        ||

        usuarioActivo.email

        ||

        "No disponible";


        const telefonoUsuario =

        usuarioActivo.telefono

        ||

        "No disponible";



        // ==================================================
        // 3. FECHA ACTUAL
        // ==================================================

        const fechaActual =
        document.getElementById(
            "fechaActual"
        );


        if(fechaActual){

            const fecha =
            new Date();


            fechaActual.textContent =
            fecha.toLocaleDateString(

                "es-GT",

                {

                    weekday:
                    "long",

                    day:
                    "numeric",

                    month:
                    "long",

                    year:
                    "numeric"

                }

            );

        }



        // ==================================================
        // 4. PERFIL
        // ==================================================

        const enlacesPerfil =
        document.querySelectorAll(

            'a[href="Perfil.html"],' +

            'a[href="perfil.html"]'

        );


        enlacesPerfil.forEach(

            enlace => {

                enlace.addEventListener(

                    "click",

                    evento => {

                        evento.preventDefault();


                        abrirPerfil();

                    }

                );

            }

        );



        // ==================================================
        // 5. CONFIGURACIÓN
        // ==================================================

        const enlacesConfiguracion =
        document.querySelectorAll(

            'a[href="Configuracion.html"],' +

            'a[href="configuracion.html"]'

        );


        enlacesConfiguracion.forEach(

            enlace => {

                enlace.addEventListener(

                    "click",

                    evento => {

                        evento.preventDefault();


                        abrirConfiguracion();

                    }

                );

            }

        );



        // ==================================================
        // 6. CREAR MODAL
        // ==================================================

        function crearModal(){

            let modal =
            document.getElementById(
                "modalDashboardPasajero"
            );


            if(modal){

                return modal;

            }


            modal =
            document.createElement(
                "div"
            );


            modal.id =
            "modalDashboardPasajero";


            modal.innerHTML = `

                <div
                    class="routify-modal-backdrop">
                </div>


                <div
                    class="routify-modal">

                    <div
                        class="routify-modal-header">

                        <div>

                            <span
                                class="routify-modal-label">

                                ROUTIFY

                            </span>

                            <h3
                                id="tituloModalPasajero">

                                Información

                            </h3>

                        </div>


                        <button
                            type="button"
                            id="btnCerrarModalPasajero"
                            class="routify-modal-close"
                            aria-label="Cerrar">

                            <i
                                class="bi bi-x-lg">
                            </i>

                        </button>

                    </div>


                    <div
                        class="routify-modal-body"
                        id="contenidoModalPasajero">
                    </div>

                </div>

            `;


            document.body.appendChild(
                modal
            );


            agregarEstilosDashboard();


            const btnCerrar =
            modal.querySelector(
                "#btnCerrarModalPasajero"
            );


            const fondo =
            modal.querySelector(
                ".routify-modal-backdrop"
            );


            btnCerrar?.addEventListener(

                "click",

                cerrarModal

            );


            fondo?.addEventListener(

                "click",

                cerrarModal

            );


            return modal;

        }



        // ==================================================
        // 7. ABRIR PERFIL
        // ==================================================

        function abrirPerfil(){

            const modal =
            crearModal();


            const titulo =
            modal.querySelector(
                "#tituloModalPasajero"
            );


            const contenido =
            modal.querySelector(
                "#contenidoModalPasajero"
            );


            titulo.textContent =
            "Mi perfil";


            contenido.innerHTML = `

                <div
                    class="profile-modal-card">

                    <div
                        class="profile-modal-avatar">

                        <i
                            class="bi bi-person-fill">
                        </i>

                    </div>


                    <div>

                        <span>
                            Pasajero ROUTIFY
                        </span>

                        <h4>
                            ${escaparHTML(
                                nombreUsuario
                            )}
                        </h4>

                        <p>
                            ${escaparHTML(
                                correoUsuario
                            )}
                        </p>

                    </div>

                </div>


                <div
                    class="profile-information-grid">


                    <div
                        class="profile-information-item">

                        <span>

                            <i
                                class="bi bi-person">
                            </i>

                            Nombre

                        </span>

                        <strong>

                            ${escaparHTML(
                                nombreUsuario
                            )}

                        </strong>

                    </div>


                    <div
                        class="profile-information-item">

                        <span>

                            <i
                                class="bi bi-envelope">
                            </i>

                            Correo

                        </span>

                        <strong>

                            ${escaparHTML(
                                correoUsuario
                            )}

                        </strong>

                    </div>


                    <div
                        class="profile-information-item">

                        <span>

                            <i
                                class="bi bi-telephone">
                            </i>

                            Teléfono

                        </span>

                        <strong>

                            ${escaparHTML(
                                telefonoUsuario
                            )}

                        </strong>

                    </div>


                    <div
                        class="profile-information-item">

                        <span>

                            <i
                                class="bi bi-person-badge">
                            </i>

                            Tipo de cuenta

                        </span>

                        <strong>
                            Pasajero
                        </strong>

                    </div>

                </div>

            `;


            modal.classList.add(
                "show"
            );


            cerrarMenusHeader();

        }



        // ==================================================
        // 8. ABRIR CONFIGURACIÓN
        // ==================================================

        function abrirConfiguracion(){

            const modal =
            crearModal();


            const titulo =
            modal.querySelector(
                "#tituloModalPasajero"
            );


            const contenido =
            modal.querySelector(
                "#contenidoModalPasajero"
            );


            const configuracion =
            obtenerConfiguracion();


            titulo.textContent =
            "Configuración";


            contenido.innerHTML = `

                <div
                    class="settings-modal-list">


                    <label
                        class="settings-modal-item">

                        <div>

                            <span>

                                <i
                                    class="bi bi-bell">
                                </i>

                                Notificaciones

                            </span>

                            <small>

                                Mostrar alertas de rutas,
                                buses y transporte.

                            </small>

                        </div>


                        <input
                            type="checkbox"
                            id="configNotificacionesPasajero"
                            ${configuracion.notificaciones
                                ?
                                "checked"
                                :
                                ""}>

                    </label>


                    <label
                        class="settings-modal-item">

                        <div>

                            <span>

                                <i
                                    class="bi bi-volume-up">
                                </i>

                                Sonidos

                            </span>

                            <small>

                                Reproducir sonidos cuando
                                llegue una alerta.

                            </small>

                        </div>


                        <input
                            type="checkbox"
                            id="configSonidosPasajero"
                            ${configuracion.sonidos
                                ?
                                "checked"
                                :
                                ""}>

                    </label>


                    <label
                        class="settings-modal-item">

                        <div>

                            <span>

                                <i
                                    class="bi bi-bus-front">
                                </i>

                                Seguimiento de unidad

                            </span>

                            <small>

                                Mantener activo el seguimiento
                                del bus seleccionado.

                            </small>

                        </div>


                        <input
                            type="checkbox"
                            id="configSeguimientoPasajero"
                            ${configuracion.seguimiento
                                ?
                                "checked"
                                :
                                ""}>

                    </label>

                </div>


                <button
                    type="button"
                    class="routify-settings-save"
                    id="btnGuardarConfiguracionPasajero">

                    <i
                        class="bi bi-check2-circle">
                    </i>

                    Guardar configuración

                </button>

            `;


            modal.classList.add(
                "show"
            );


            cerrarMenusHeader();


            document
            .getElementById(
                "btnGuardarConfiguracionPasajero"
            )
            ?.addEventListener(

                "click",

                guardarConfiguracion

            );

        }



        // ==================================================
        // 9. CERRAR MODAL
        // ==================================================

        function cerrarModal(){

            document
            .getElementById(
                "modalDashboardPasajero"
            )
            ?.classList.remove(
                "show"
            );

        }



        // ==================================================
        // 10. CERRAR CON ESCAPE
        // ==================================================

        document.addEventListener(

            "keydown",

            evento => {

                if(
                    evento.key === "Escape"
                ){

                    cerrarModal();

                }

            }

        );



        // ==================================================
        // 11. CONFIGURACIÓN
        // ==================================================

        function obtenerConfiguracion(){

            const configuracionInicial = {

                notificaciones:
                true,

                sonidos:
                true,

                seguimiento:
                true

            };


            try{

                const guardada =
                JSON.parse(

                    localStorage.getItem(
                        "configPasajeroROUTIFY"
                    )

                );


                return {

                    ...configuracionInicial,

                    ...(guardada || {})

                };

            }

            catch(error){

                return configuracionInicial;

            }

        }



        // ==================================================
        // 12. GUARDAR CONFIGURACIÓN
        // ==================================================

        function guardarConfiguracion(){

            const notificaciones =
            document.getElementById(
                "configNotificacionesPasajero"
            );


            const sonidos =
            document.getElementById(
                "configSonidosPasajero"
            );


            const seguimiento =
            document.getElementById(
                "configSeguimientoPasajero"
            );


            const configuracion = {

                notificaciones:
                Boolean(
                    notificaciones?.checked
                ),

                sonidos:
                Boolean(
                    sonidos?.checked
                ),

                seguimiento:
                Boolean(
                    seguimiento?.checked
                )

            };


            localStorage.setItem(

                "configPasajeroROUTIFY",

                JSON.stringify(
                    configuracion
                )

            );


            cerrarModal();


            mostrarToast(

                "Configuración guardada correctamente.",

                "exito"

            );

        }



        // ==================================================
        // 13. FAVORITOS
        // ==================================================

        const botonesFavorito =
        document.querySelectorAll(

            "[data-favorito]," +

            ".btn-favorito"

        );


        botonesFavorito.forEach(

            boton => {

                boton.addEventListener(

                    "click",

                    () => {

                        boton.classList.toggle(
                            "active"
                        );


                        const activo =
                        boton.classList.contains(
                            "active"
                        );


                        const icono =
                        boton.querySelector(
                            "i"
                        );


                        if(icono){

                            icono.className =

                            activo

                            ?

                            "bi bi-heart-fill"

                            :

                            "bi bi-heart";

                        }


                        mostrarToast(

                            activo

                            ?

                            "Ruta agregada a favoritos."

                            :

                            "Ruta eliminada de favoritos.",

                            "info"

                        );

                    }

                );

            }

        );



        // ==================================================
        // 14. ALERTAS
        // ==========================================================

        function revisarAlerta(){

            const alertaGuardada =
            localStorage.getItem(
                "alertaROUTIFY"
            );


            if(!alertaGuardada){

                return;

            }


            try{

                const alerta =
                JSON.parse(
                    alertaGuardada
                );


                if(!alerta){

                    return;

                }


                const identificador =

                alerta.id

                ||

                alerta.fecha

                ||

                alerta.timestamp

                ||

                JSON.stringify(
                    alerta
                );


                const ultimaVista =
                sessionStorage.getItem(
                    "ultimaAlertaPasajeroROUTIFY"
                );


                if(
                    String(ultimaVista) ===
                    String(identificador)
                ){

                    return;

                }


                sessionStorage.setItem(

                    "ultimaAlertaPasajeroROUTIFY",

                    String(
                        identificador
                    )

                );


                agregarAlerta(
                    alerta
                );

            }

            catch(error){

                console.warn(

                    "ROUTIFY: alerta inválida.",

                    error

                );

            }

        }



        // ==================================================
        // 15. MOSTRAR ALERTA
        // ==========================================================

        function agregarAlerta(
            alerta
        ){

            const lista =
            document.getElementById(
                "lista-alertas"
            );


            const mensaje =

            alerta.mensaje

            ||

            alerta.descripcion

            ||

            alerta.tipo

            ||

            "Nueva alerta de transporte.";


            if(lista){

                const elemento =
                document.createElement(
                    "div"
                );


                elemento.className =
                "alert-item";


                elemento.innerHTML = `

                    <div
                        class="alert-item-icon">

                        <i
                            class="bi bi-exclamation-triangle">
                        </i>

                    </div>


                    <div>

                        <strong>
                            Alerta ROUTIFY
                        </strong>

                        <p>
                            ${escaparHTML(
                                mensaje
                            )}
                        </p>

                    </div>

                `;


                lista.prepend(
                    elemento
                );

            }


            const configuracion =
            obtenerConfiguracion();


            if(
                configuracion.notificaciones
            ){

                mostrarToast(

                    mensaje,

                    "advertencia"

                );

            }

        }



        // ==================================================
        // 16. ESCUCHAR ALERTAS
        // ==========================================================

        window.addEventListener(

            "storage",

            evento => {

                if(
                    evento.key ===
                    "alertaROUTIFY"
                ){

                    revisarAlerta();

                }

            }

        );


        revisarAlerta();



        // ==================================================
        // 17. TOAST
        // ==========================================================

        function mostrarToast(
            mensaje,
            tipo = "info"
        ){

            let toast =
            document.getElementById(
                "toastDashboardPasajero"
            );


            if(!toast){

                toast =
                document.createElement(
                    "div"
                );


                toast.id =
                "toastDashboardPasajero";


                toast.className =
                "dashboard-toast";


                toast.innerHTML = `

                    <div
                        class="dashboard-toast-icon">

                        <i
                            id="iconToastDashboard"
                            class="bi bi-info-circle-fill">
                        </i>

                    </div>


                    <div
                        class="dashboard-toast-content">

                        <strong
                            id="tituloToastDashboard">

                            ROUTIFY

                        </strong>

                        <span
                            id="mensajeToastDashboard">
                        </span>

                    </div>


                    <button
                        type="button"
                        id="cerrarToastDashboard">

                        <i
                            class="bi bi-x">
                        </i>

                    </button>

                `;


                document.body.appendChild(
                    toast
                );


                document
                .getElementById(
                    "cerrarToastDashboard"
                )
                ?.addEventListener(

                    "click",

                    () => {

                        toast.classList.remove(
                            "show"
                        );

                    }

                );

            }


            const icono =
            document.getElementById(
                "iconToastDashboard"
            );


            const titulo =
            document.getElementById(
                "tituloToastDashboard"
            );


            const texto =
            document.getElementById(
                "mensajeToastDashboard"
            );


            toast.dataset.tipo =
            tipo;


            if(
                tipo === "exito"
            ){

                icono.className =
                "bi bi-check-circle-fill";


                titulo.textContent =
                "Listo";

            }

            else if(
                tipo === "advertencia"
            ){

                icono.className =
                "bi bi-exclamation-triangle-fill";


                titulo.textContent =
                "Alerta";

            }

            else if(
                tipo === "error"
            ){

                icono.className =
                "bi bi-x-circle-fill";


                titulo.textContent =
                "Error";

            }

            else{

                icono.className =
                "bi bi-info-circle-fill";


                titulo.textContent =
                "ROUTIFY";

            }


            texto.textContent =
            mensaje;


            toast.classList.add(
                "show"
            );


            clearTimeout(
                toast._temporizador
            );


            toast._temporizador =
            setTimeout(

                () => {

                    toast.classList.remove(
                        "show"
                    );

                },

                3500

            );

        }



        // ==================================================
        // 18. CERRAR MENÚS DEL HEADER
        // ==========================================================

        function cerrarMenusHeader(){

            if(
                window.ROUTIFYHeaderPasajero
            ){

                window
                .ROUTIFYHeaderPasajero
                .cerrarMenus();

            }

        }



        // ==================================================
        // 19. ESCAPAR HTML
        // ==========================================================

        function escaparHTML(
            valor
        ){

            const elemento =
            document.createElement(
                "div"
            );


            elemento.textContent =
            String(
                valor ?? ""
            );


            return elemento.innerHTML;

        }



        // ==================================================
        // 20. ESTILOS
        // ==========================================================

        function agregarEstilosDashboard(){

            if(
                document.getElementById(
                    "estilosDashboardPasajeroJS"
                )
            ){

                return;

            }


            const estilos =
            document.createElement(
                "style"
            );


            estilos.id =
            "estilosDashboardPasajeroJS";


            estilos.textContent = `

                #modalDashboardPasajero{
                    position:fixed;
                    inset:0;
                    z-index:99999;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:20px;
                    opacity:0;
                    visibility:hidden;
                    transition:.25s ease;
                }


                #modalDashboardPasajero.show{
                    opacity:1;
                    visibility:visible;
                }


                .routify-modal-backdrop{
                    position:absolute;
                    inset:0;
                    background:rgba(1,9,17,.72);
                    backdrop-filter:blur(8px);
                }


                .routify-modal{
                    position:relative;
                    width:min(560px,100%);
                    max-height:85vh;
                    overflow:auto;
                    background:#071827;
                    border:1px solid rgba(255,255,255,.09);
                    border-radius:24px;
                    box-shadow:
                    0 25px 70px rgba(0,0,0,.45);
                    transform:
                    translateY(15px) scale(.98);
                    transition:.25s ease;
                }


                #modalDashboardPasajero.show
                .routify-modal{
                    transform:
                    translateY(0) scale(1);
                }


                .routify-modal-header{
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:15px;
                    padding:22px 24px;
                    border-bottom:
                    1px solid rgba(255,255,255,.08);
                }


                .routify-modal-label{
                    display:block;
                    margin-bottom:5px;
                    color:#22d3ee;
                    font-size:10px;
                    font-weight:800;
                    letter-spacing:1.5px;
                }


                .routify-modal-header h3{
                    margin:0;
                    color:#fff;
                    font-size:20px;
                }


                .routify-modal-close{
                    width:38px;
                    height:38px;
                    border:none;
                    border-radius:12px;
                    background:
                    rgba(255,255,255,.07);
                    color:#fff;
                    cursor:pointer;
                }


                .routify-modal-body{
                    padding:24px;
                }


                .profile-modal-card{
                    display:flex;
                    align-items:center;
                    gap:16px;
                    margin-bottom:22px;
                    padding:18px;
                    border-radius:18px;
                    background:
                    linear-gradient(
                        135deg,
                        rgba(18,103,255,.16),
                        rgba(34,227,154,.08)
                    );
                    border:
                    1px solid rgba(34,211,238,.15);
                }


                .profile-modal-avatar{
                    width:60px;
                    height:60px;
                    flex-shrink:0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:18px;
                    background:
                    linear-gradient(
                        135deg,
                        #1267ff,
                        #22d3ee
                    );
                    color:#fff;
                    font-size:25px;
                }


                .profile-modal-card span{
                    color:#22e39a;
                    font-size:11px;
                    font-weight:700;
                }


                .profile-modal-card h4{
                    margin:3px 0;
                    color:#fff;
                    font-size:18px;
                }


                .profile-modal-card p{
                    margin:0;
                    color:#8fa5b7;
                    font-size:12px;
                }


                .profile-information-grid{
                    display:grid;
                    grid-template-columns:
                    repeat(2,1fr);
                    gap:12px;
                }


                .profile-information-item{
                    padding:16px;
                    border-radius:16px;
                    background:
                    rgba(255,255,255,.035);
                    border:
                    1px solid rgba(255,255,255,.07);
                }


                .profile-information-item span{
                    display:block;
                    margin-bottom:7px;
                    color:#8fa5b7;
                    font-size:11px;
                }


                .profile-information-item span i{
                    margin-right:5px;
                    color:#22d3ee;
                }


                .profile-information-item strong{
                    color:#fff;
                    font-size:13px;
                }


                .settings-modal-list{
                    display:flex;
                    flex-direction:column;
                    gap:12px;
                }


                .settings-modal-item{
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:20px;
                    padding:17px;
                    border-radius:16px;
                    background:
                    rgba(255,255,255,.035);
                    border:
                    1px solid rgba(255,255,255,.07);
                    cursor:pointer;
                }


                .settings-modal-item span{
                    display:block;
                    color:#fff;
                    font-size:13px;
                    font-weight:700;
                }


                .settings-modal-item span i{
                    margin-right:7px;
                    color:#22d3ee;
                }


                .settings-modal-item small{
                    display:block;
                    margin-top:4px;
                    color:#8299ab;
                    font-size:10px;
                    line-height:1.5;
                }


                .settings-modal-item input{
                    width:18px;
                    height:18px;
                    accent-color:#1267ff;
                }


                .routify-settings-save{
                    width:100%;
                    margin-top:18px;
                    padding:13px;
                    border:none;
                    border-radius:13px;
                    background:
                    linear-gradient(
                        135deg,
                        #1267ff,
                        #22d3ee
                    );
                    color:#fff;
                    font-weight:700;
                    cursor:pointer;
                }


                .dashboard-toast{
                    position:fixed;
                    right:25px;
                    bottom:25px;
                    z-index:100000;
                    width:min(
                        380px,
                        calc(100% - 30px)
                    );
                    display:flex;
                    align-items:center;
                    gap:12px;
                    padding:15px;
                    border:
                    1px solid rgba(255,255,255,.1);
                    border-radius:16px;
                    background:#071827;
                    color:#fff;
                    box-shadow:
                    0 18px 45px rgba(0,0,0,.4);
                    opacity:0;
                    visibility:hidden;
                    transform:
                    translateY(15px);
                    transition:.25s ease;
                }


                .dashboard-toast.show{
                    opacity:1;
                    visibility:visible;
                    transform:
                    translateY(0);
                }


                .dashboard-toast-icon{
                    font-size:21px;
                    color:#22d3ee;
                }


                .dashboard-toast[data-tipo="exito"]
                .dashboard-toast-icon{
                    color:#22e39a;
                }


                .dashboard-toast[data-tipo="advertencia"]
                .dashboard-toast-icon{
                    color:#f59e0b;
                }


                .dashboard-toast[data-tipo="error"]
                .dashboard-toast-icon{
                    color:#ef4444;
                }


                .dashboard-toast-content{
                    flex:1;
                }


                .dashboard-toast-content strong{
                    display:block;
                    margin-bottom:2px;
                    font-size:12px;
                }


                .dashboard-toast-content span{
                    color:#a4b5c2;
                    font-size:11px;
                }


                .dashboard-toast button{
                    border:none;
                    background:transparent;
                    color:#8fa5b7;
                    font-size:18px;
                    cursor:pointer;
                }


                @media(max-width:600px){

                    .profile-information-grid{
                        grid-template-columns:1fr;
                    }


                    .routify-modal{
                        border-radius:20px;
                    }


                    .routify-modal-header,
                    .routify-modal-body{
                        padding:18px;
                    }


                    .dashboard-toast{
                        right:15px;
                        bottom:15px;
                    }

                }

            `;


            document.head.appendChild(
                estilos
            );

        }



        // ==================================================
        // 21. INICIAR ESTILOS
        // ==========================================================

        agregarEstilosDashboard();



        // ==================================================
        // 22. HACER TOAST GLOBAL
        // ==========================================================

        window.mostrarToast =
        mostrarToast;



        // ==================================================
        // 23. API DEL DASHBOARD
        // ==========================================================

        window.ROUTIFYDashboardPasajero = {

            abrirPerfil:
            abrirPerfil,


            abrirConfiguracion:
            abrirConfiguracion,


            cerrarModal:
            cerrarModal,


            mostrarToast:
            mostrarToast,


            revisarAlerta:
            revisarAlerta

        };



        // ==================================================
        // 24. DASHBOARD LISTO
        // ==========================================================

        console.log(

            "ROUTIFY: dashboard pasajero listo."

        );

    }

);