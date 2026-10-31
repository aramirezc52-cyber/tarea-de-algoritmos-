// ==========================================================
// ROUTIFY V2
// LOGIN.JS
// ==========================================================


// ==========================================================
// 1. ELEMENTOS DEL FORMULARIO
// ==========================================================

const formLogin =
document.getElementById(
    "formLogin"
);


const correoLogin =
document.getElementById(
    "correoLogin"
);


const passwordLogin =
document.getElementById(
    "passwordLogin"
);


const togglePassword =
document.getElementById(
    "togglePassword"
);


const iconEye =
document.getElementById(
    "iconEye"
);


const mensajeLogin =
document.getElementById(
    "mensajeLogin"
);


const btnLogin =
document.getElementById(
    "btnLogin"
);


const recordarme =
document.getElementById(
    "recordarme"
);


// ==========================================================
// 2. MOSTRAR / OCULTAR CONTRASEÑA
// ==========================================================

if(
    togglePassword &&
    passwordLogin
){

    togglePassword.addEventListener(
        "click",
        () => {

            const visible =
                passwordLogin.type === "text";


            if(visible){

                passwordLogin.type =
                    "password";


                if(iconEye){

                    iconEye.className =
                        "bi bi-eye";

                }


                togglePassword.setAttribute(
                    "aria-label",
                    "Mostrar contraseña"
                );

            }
            else{

                passwordLogin.type =
                    "text";


                if(iconEye){

                    iconEye.className =
                        "bi bi-eye-slash";

                }


                togglePassword.setAttribute(
                    "aria-label",
                    "Ocultar contraseña"
                );

            }

        }
    );

}


// ==========================================================
// 3. MOSTRAR MENSAJE
// ==========================================================

function mostrarMensaje(
    mensaje,
    tipo = ""
){

    if(!mensajeLogin){

        return;

    }


    mensajeLogin.textContent =
        mensaje;


    mensajeLogin.classList.remove(
        "error",
        "success"
    );


    if(tipo){

        mensajeLogin.classList.add(
            tipo
        );

    }

}


// ==========================================================
// 4. OBTENER CONTENEDOR DEL INPUT
// ==========================================================

function obtenerContenedor(input){

    if(!input){

        return null;

    }


    return input.closest(
        ".input-container"
    );

}


// ==========================================================
// 5. LIMPIAR ESTADO
// ==========================================================

function limpiarEstadoInput(input){

    const contenedor =
        obtenerContenedor(input);


    if(!contenedor){

        return;

    }


    contenedor.classList.remove(
        "input-error",
        "input-success"
    );

}


// ==========================================================
// 6. MARCAR ERROR
// ==========================================================

function marcarError(input){

    const contenedor =
        obtenerContenedor(input);


    if(!contenedor){

        return;

    }


    contenedor.classList.remove(
        "input-success"
    );


    contenedor.classList.add(
        "input-error"
    );

}


// ==========================================================
// 7. MARCAR CORRECTO
// ==========================================================

function marcarCorrecto(input){

    const contenedor =
        obtenerContenedor(input);


    if(!contenedor){

        return;

    }


    contenedor.classList.remove(
        "input-error"
    );


    contenedor.classList.add(
        "input-success"
    );

}


// ==========================================================
// 8. VALIDAR CORREO
// ==========================================================

function validarCorreo(correo){

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return expresionCorreo.test(
        correo
    );

}


// ==========================================================
// 9. VALIDAR FORMULARIO
// ==========================================================

function validarFormulario(){

    let formularioValido =
        true;


    const correo =
        correoLogin.value.trim();


    const password =
        passwordLogin.value;


    // ======================================================
    // VALIDAR CORREO
    // ======================================================

    if(correo === ""){

        marcarError(
            correoLogin
        );


        mostrarMensaje(
            "Ingresa tu correo electrónico.",
            "error"
        );


        formularioValido =
            false;

    }
    else if(
        !validarCorreo(correo)
    ){

        marcarError(
            correoLogin
        );


        mostrarMensaje(
            "Ingresa un correo electrónico válido.",
            "error"
        );


        formularioValido =
            false;

    }
    else{

        marcarCorrecto(
            correoLogin
        );

    }


    // ======================================================
    // VALIDAR CONTRASEÑA
    // ======================================================

    if(password === ""){

        marcarError(
            passwordLogin
        );


        mostrarMensaje(
            "Ingresa tu contraseña.",
            "error"
        );


        formularioValido =
            false;

    }
    else{

        marcarCorrecto(
            passwordLogin
        );

    }


    return formularioValido;

}


// ==========================================================
// 10. ACTIVAR CARGA
// ==========================================================

function activarCarga(){

    if(!btnLogin){

        return;

    }


    btnLogin.disabled =
        true;


    btnLogin.innerHTML = `

        <span>
            Iniciando sesión...
        </span>

        <i class="bi bi-arrow-repeat login-spinner"></i>

    `;

}


// ==========================================================
// 11. DESACTIVAR CARGA
// ==========================================================

function desactivarCarga(){

    if(!btnLogin){

        return;

    }


    btnLogin.disabled =
        false;


    btnLogin.innerHTML = `

        <span>
            Iniciar sesión
        </span>

        <i class="bi bi-arrow-right"></i>

    `;

}


// ==========================================================
// 12. GUARDAR SESIÓN
// ==========================================================

function guardarSesion(datos){

    const usuario =
        datos.usuario;


    // ======================================================
    // GUARDAR USUARIO ACTIVO
    // ======================================================

    sessionStorage.setItem(
        "sesionROUTIFY",
        JSON.stringify(
            usuario
        )
    );


    // ======================================================
    // GUARDAR TOKEN SI EL BACKEND LO ENVÍA
    // ======================================================

    if(datos.token){

        sessionStorage.setItem(
            "tokenROUTIFY",
            datos.token
        );

    }


    // ======================================================
    // RECORDAR CORREO
    // ======================================================

    if(
        recordarme &&
        recordarme.checked
    ){

        localStorage.setItem(
            "correoROUTIFY",
            usuario.correo ||
            correoLogin.value.trim()
        );

    }
    else{

        localStorage.removeItem(
            "correoROUTIFY"
        );

    }

}


// ==========================================================
// 13. INICIAR SESIÓN
// ==========================================================

async function iniciarSesion(
    correo,
    password
){

    try{

        activarCarga();


        mostrarMensaje(
            "",
            ""
        );


        // ==================================================
        // ENVIAR LOGIN AL BACKEND
        // ==================================================

        const respuesta =
        await fetch(
            "http://localhost:3000/usuarios/login",
            {

                method:
                    "POST",

                headers:{
                    "Content-Type":
                        "application/json"
                },

                body:JSON.stringify({

                    correo:
                        correo,

                    password:
                        password

                })

            }
        );


        // ==================================================
        // COMPROBAR RESPUESTA
        // ==================================================

        const tipoContenido =
            respuesta.headers.get(
                "content-type"
            );


        if(
            !tipoContenido ||
            !tipoContenido.includes(
                "application/json"
            )
        ){

            throw new Error(
                "El servidor no devolvió una respuesta válida."
            );

        }


        const datos =
            await respuesta.json();


        // ==================================================
        // LOGIN INCORRECTO
        // ==================================================

        if(!respuesta.ok){

            throw new Error(
                datos.mensaje ||
                "Correo o contraseña incorrectos."
            );

        }


        // ==================================================
        // COMPROBAR USUARIO
        // ==================================================

        if(!datos.usuario){

            throw new Error(
                "El servidor no devolvió los datos del usuario."
            );

        }


        // ==================================================
        // GUARDAR SESIÓN
        // ==================================================

        guardarSesion(
            datos
        );


        // ==================================================
        // MENSAJE CORRECTO
        // ==================================================

        mostrarMensaje(
            "Inicio de sesión correcto. Redirigiendo...",
            "success"
        );


        // ==================================================
        // IR A SELECCIÓN DE USUARIO
        // ==================================================

        const usuario = datos.usuario;

        if(usuario.rol==="administrador"){

            window.location.href =
                "dashboard-admin.html";

        }
        else if(usuario.rol==="conductor"){

            window.location.href =
                "dashboard-conductor.html";

        }
        else{

            window.location.href =
                "dashboard-pasajero.html";

        }

    }
    catch(error){

        console.error(
            "Error al iniciar sesión:",
            error
        );


        // ==================================================
        // ERROR DE CONEXIÓN
        // ==================================================

        if(
            error instanceof TypeError
        ){

            mostrarMensaje(
                "No se pudo conectar con el servidor.",
                "error"
            );

        }
        else{

            mostrarMensaje(
                error.message ||
                "No fue posible iniciar sesión.",
                "error"
            );

        }


        marcarError(
            correoLogin
        );


        marcarError(
            passwordLogin
        );


        desactivarCarga();

    }

}


// ==========================================================
// 14. EVENTO SUBMIT
// ==========================================================

if(formLogin){

    formLogin.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            // ==================================================
            // VALIDAR FORMULARIO
            // ==================================================

            const formularioValido =
                validarFormulario();


            if(!formularioValido){

                return;

            }


            // ==================================================
            // OBTENER DATOS
            // ==================================================

            const correo =
                correoLogin.value.trim();


            const password =
                passwordLogin.value;


            // ==================================================
            // INICIAR LOGIN
            // ==================================================

            iniciarSesion(
                correo,
                password
            );

        }
    );

}


// ==========================================================
// 15. LIMPIAR ERROR DEL CORREO
// ==========================================================

if(correoLogin){

    correoLogin.addEventListener(
        "input",
        () => {

            limpiarEstadoInput(
                correoLogin
            );


            mostrarMensaje(
                "",
                ""
            );

        }
    );

}


// ==========================================================
// 16. LIMPIAR ERROR DE CONTRASEÑA
// ==========================================================

if(passwordLogin){

    passwordLogin.addEventListener(
        "input",
        () => {

            limpiarEstadoInput(
                passwordLogin
            );


            mostrarMensaje(
                "",
                ""
            );

        }
    );

}


// ==========================================================
// 17. CARGAR CORREO RECORDADO
// ==========================================================

function cargarCorreoRecordado(){

    const correoGuardado =
        localStorage.getItem(
            "correoROUTIFY"
        );


    if(
        !correoGuardado ||
        !correoLogin
    ){

        return;

    }


    correoLogin.value =
        correoGuardado;


    if(recordarme){

        recordarme.checked =
            true;

    }

}


// ==========================================================
// 18. INICIALIZACIÓN
// ==========================================================

cargarCorreoRecordado();