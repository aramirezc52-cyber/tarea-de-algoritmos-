// ==========================================================
// ROUTIFY V2
// REGISTRO DE CONDUCTOR
// ==========================================================


// ==========================================================
// 1. OBTENER SESIÓN ACTIVA
// ==========================================================

const usuarioActivo = JSON.parse(

    sessionStorage.getItem(
        "sesionROUTIFY"
    )

);


// ==========================================================
// 2. PROTEGER PÁGINA
// ==========================================================

if(!usuarioActivo){

    window.location.replace(
        "login.html"
    );

}


// ==========================================================
// 3. ELEMENTOS DEL FORMULARIO
// ==========================================================

const formulario =

document.getElementById(
    "formRegistroConductor"
);


const nombre =

document.getElementById(
    "nombreConductor"
);


const correo =

document.getElementById(
    "correoConductor"
);


const telefono =

document.getElementById(
    "telefonoConductor"
);


const licencia =

document.getElementById(
    "licenciaConductor"
);


const tipoLicencia =

document.getElementById(
    "tipoLicencia"
);


const password =

document.getElementById(
    "passwordConductor"
);


const confirmPassword =

document.getElementById(
    "confirmPasswordConductor"
);


const terminos =

document.getElementById(
    "terminosConductor"
);


const btnRegistro =

document.getElementById(
    "btnRegistroConductor"
);


const mensajeRegistro =

document.getElementById(
    "mensajeRegistroConductor"
);


// ==========================================================
// 4. BOTONES MOSTRAR CONTRASEÑA
// ==========================================================

const togglePassword =

document.getElementById(
    "togglePasswordConductor"
);


const iconPassword =

document.getElementById(
    "iconPasswordConductor"
);


const toggleConfirmPassword =

document.getElementById(
    "toggleConfirmPasswordConductor"
);


const iconConfirmPassword =

document.getElementById(
    "iconConfirmPasswordConductor"
);


// ==========================================================
// 5. CARGAR DATOS DEL USUARIO
// ==========================================================

function cargarDatosUsuario(){

    if(!usuarioActivo){

        return;

    }


    if(nombre){

        nombre.value =
            usuarioActivo.nombre || "";

    }


    if(correo){

        correo.value =
            usuarioActivo.correo || "";

    }


    if(telefono){

        telefono.value =
            usuarioActivo.telefono || "";

    }

}


cargarDatosUsuario();


// ==========================================================
// 6. MOSTRAR / OCULTAR CONTRASEÑA
// ==========================================================

if(
    togglePassword &&
    password
){

    togglePassword.addEventListener(

        "click",

        () => {

            const visible =
                password.type === "text";


            password.type =
                visible
                    ? "password"
                    : "text";


            if(iconPassword){

                iconPassword.className =
                    visible
                        ? "bi bi-eye"
                        : "bi bi-eye-slash";

            }

        }

    );

}


// ==========================================================
// 7. MOSTRAR / OCULTAR CONFIRMACIÓN
// ==========================================================

if(
    toggleConfirmPassword &&
    confirmPassword
){

    toggleConfirmPassword.addEventListener(

        "click",

        () => {

            const visible =
                confirmPassword.type === "text";


            confirmPassword.type =
                visible
                    ? "password"
                    : "text";


            if(iconConfirmPassword){

                iconConfirmPassword.className =
                    visible
                        ? "bi bi-eye"
                        : "bi bi-eye-slash";

            }

        }

    );

}


// ==========================================================
// 8. OBTENER GRUPO DEL CAMPO
// ==========================================================

function obtenerGrupo(elemento){

    if(!elemento){

        return null;

    }


    return elemento.closest(
        ".form-group"
    );

}


// ==========================================================
// 9. MOSTRAR ERROR
// ==========================================================

function mostrarError(
    elemento,
    mensaje
){

    const grupo =
        obtenerGrupo(elemento);


    if(!grupo){

        return;

    }


    grupo.classList.remove(
        "success"
    );


    grupo.classList.add(
        "error"
    );


    const mensajeHTML =

        grupo.querySelector(
            ".input-message"
        );


    if(mensajeHTML){

        mensajeHTML.textContent =
            mensaje;

    }

}


// ==========================================================
// 10. MOSTRAR CORRECTO
// ==========================================================

function mostrarCorrecto(elemento){

    const grupo =
        obtenerGrupo(elemento);


    if(!grupo){

        return;

    }


    grupo.classList.remove(
        "error"
    );


    grupo.classList.add(
        "success"
    );


    const mensajeHTML =

        grupo.querySelector(
            ".input-message"
        );


    if(mensajeHTML){

        mensajeHTML.textContent = "";

    }

}


// ==========================================================
// 11. VALIDAR NOMBRE
// ==========================================================

function validarNombre(){

    const valor =
        nombre.value.trim();


    if(valor.length < 3){

        mostrarError(
            nombre,
            "Ingresa tu nombre completo."
        );

        return false;

    }


    mostrarCorrecto(nombre);

    return true;

}


// ==========================================================
// 12. VALIDAR CORREO
// ==========================================================

function validarCorreo(){

    const valor =
        correo.value.trim();


    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(
        !expresion.test(valor)
    ){

        mostrarError(
            correo,
            "Ingresa un correo válido."
        );

        return false;

    }


    mostrarCorrecto(correo);

    return true;

}


// ==========================================================
// 13. VALIDAR TELÉFONO
// ==========================================================

function validarTelefono(){

    const valor =

        telefono.value
            .replace(/\s/g, "")
            .trim();


    const expresion =
        /^[0-9]{8}$/;


    if(
        !expresion.test(valor)
    ){

        mostrarError(
            telefono,
            "El teléfono debe tener 8 números."
        );

        return false;

    }


    mostrarCorrecto(telefono);

    return true;

}


// ==========================================================
// 14. VALIDAR LICENCIA
// ==========================================================

function validarLicencia(){

    const valor =
        licencia.value.trim();


    if(valor.length < 4){

        mostrarError(
            licencia,
            "Ingresa un número de licencia válido."
        );

        return false;

    }


    mostrarCorrecto(licencia);

    return true;

}


// ==========================================================
// 15. VALIDAR TIPO DE LICENCIA
// ==========================================================

function validarTipoLicencia(){

    if(
        tipoLicencia.value === ""
    ){

        mostrarError(
            tipoLicencia,
            "Selecciona el tipo de licencia."
        );

        return false;

    }


    mostrarCorrecto(tipoLicencia);

    return true;

}


// ==========================================================
// 16. VALIDAR CONTRASEÑA
// ==========================================================

function validarPassword(){

    if(
        password.value.length < 8
    ){

        mostrarError(
            password,
            "La contraseña debe tener mínimo 8 caracteres."
        );

        return false;

    }


    mostrarCorrecto(password);

    return true;

}


// ==========================================================
// 17. VALIDAR CONFIRMACIÓN
// ==========================================================

function validarConfirmPassword(){

    if(
        confirmPassword.value === ""
    ){

        mostrarError(
            confirmPassword,
            "Confirma tu contraseña."
        );

        return false;

    }


    if(
        confirmPassword.value !==
        password.value
    ){

        mostrarError(
            confirmPassword,
            "Las contraseñas no coinciden."
        );

        return false;

    }


    mostrarCorrecto(
        confirmPassword
    );

    return true;

}


// ==========================================================
// 18. MENSAJE GENERAL
// ==========================================================

function mostrarMensajeGeneral(
    mensaje,
    tipo
){

    if(!mensajeRegistro){

        return;

    }


    mensajeRegistro.className =
        "form-message";


    mensajeRegistro.classList.add(
        tipo
    );


    mensajeRegistro.textContent =
        mensaje;

}


// ==========================================================
// 19. LIMPIAR MENSAJE
// ==========================================================

function limpiarMensajeGeneral(){

    if(!mensajeRegistro){

        return;

    }


    mensajeRegistro.className =
        "form-message";


    mensajeRegistro.textContent = "";

}


// ==========================================================
// 20. VALIDACIONES EN TIEMPO REAL
// ==========================================================

nombre?.addEventListener(
    "input",
    validarNombre
);


correo?.addEventListener(
    "input",
    validarCorreo
);


telefono?.addEventListener(
    "input",
    validarTelefono
);


licencia?.addEventListener(
    "input",
    validarLicencia
);


tipoLicencia?.addEventListener(
    "change",
    validarTipoLicencia
);


password?.addEventListener(

    "input",

    () => {

        validarPassword();


        if(
            confirmPassword.value !== ""
        ){

            validarConfirmPassword();

        }

    }

);


confirmPassword?.addEventListener(
    "input",
    validarConfirmPassword
);


// ==========================================================
// 21. ENVIAR REGISTRO AL BACKEND
// ==========================================================

if(formulario){

    formulario.addEventListener(

        "submit",

        async(event) => {

            event.preventDefault();


            limpiarMensajeGeneral();


            // ==================================================
            // VALIDAR FORMULARIO
            // ==================================================

            const nombreValido =
                validarNombre();


            const correoValido =
                validarCorreo();


            const telefonoValido =
                validarTelefono();


            const licenciaValida =
                validarLicencia();


            const tipoLicenciaValida =
                validarTipoLicencia();


            const passwordValido =
                validarPassword();


            const confirmacionValida =
                validarConfirmPassword();


            // ==================================================
            // VALIDAR TÉRMINOS
            // ==================================================

            if(!terminos.checked){

                mostrarMensajeGeneral(

                    "Debes aceptar los términos para continuar.",

                    "error"

                );


                return;

            }


            // ==================================================
            // COMPROBAR CAMPOS
            // ==================================================

            if(
                !nombreValido ||
                !correoValido ||
                !telefonoValido ||
                !licenciaValida ||
                !tipoLicenciaValida ||
                !passwordValido ||
                !confirmacionValida
            ){

                mostrarMensajeGeneral(

                    "Revisa los campos marcados antes de continuar.",

                    "error"

                );


                return;

            }


            // ==================================================
            // COMPROBAR ID DEL USUARIO
            // ==================================================

            if(!usuarioActivo.id){

                mostrarMensajeGeneral(

                    "No se encontró el identificador del usuario. Inicia sesión nuevamente.",

                    "error"

                );


                return;

            }


            // ==================================================
            // DATOS PARA MYSQL
            // ==================================================

            const datosConductor = {

                id_usuario:
                    usuarioActivo.id,

                licencia:
                    licencia.value.trim(),

                tipo_licencia:
                    tipoLicencia.value

            };


            // ==================================================
            // ESTADO DEL BOTÓN
            // ==================================================

            const contenidoOriginal =
                btnRegistro.innerHTML;


            btnRegistro.disabled = true;


            btnRegistro.innerHTML = `

                <span>
                    Registrando...
                </span>

                <i class="bi bi-arrow-repeat"></i>

            `;


            // ==================================================
            // CONECTAR CON BACKEND
            // ==================================================

            try{

                const respuesta = await fetch(

                    "http://localhost:3000/conductores",

                    {

                        method:
                            "POST",

                        headers:{

                            "Content-Type":
                                "application/json"

                        },

                        body:JSON.stringify(
                            datosConductor
                        )

                    }

                );


                // ==================================================
                // COMPROBAR RESPUESTA
                // ==================================================

                const contentType =

                    respuesta.headers.get(
                        "content-type"
                    );


                if(
                    !contentType ||
                    !contentType.includes(
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
                // ERROR DEL BACKEND
                // ==================================================

                if(!respuesta.ok){

                    mostrarMensajeGeneral(

                        datos.mensaje ||
                        "No se pudo registrar el conductor.",

                        "error"

                    );


                    btnRegistro.disabled =
                        false;


                    btnRegistro.innerHTML =
                        contenidoOriginal;


                    return;

                }


                // ==================================================
                // ACTUALIZAR USUARIO DE LA SESIÓN
                // ==================================================

                const usuarioActualizado = {

                    ...usuarioActivo,

                    roles:[
                        "pasajero",
                        "conductor"
                    ],

                    esConductor:
                        true,

                    estadoConductor:
                        datos.conductor?.estado ||
                        "activo",

                    conductor:
                        datos.conductor

                };


                // ==================================================
                // GUARDAR SESIÓN ACTUALIZADA
                // ==================================================

                sessionStorage.setItem(

                    "sesionROUTIFY",

                    JSON.stringify(
                        usuarioActualizado
                    )

                );


                // ==================================================
                // ACTIVAR PANEL CONDUCTOR
                // ==================================================

                sessionStorage.setItem(

                    "rolActivoROUTIFY",

                    "conductor"

                );


                // ==================================================
                // MENSAJE CORRECTO
                // ==================================================

                mostrarMensajeGeneral(

                    datos.mensaje ||
                    "Conductor registrado correctamente.",

                    "success"

                );


                // ==================================================
                // REDIRECCIÓN
                // ==================================================

                setTimeout(

                    () => {

                        window.location.href =
                            "dashboard-conductor.html";

                    },

                    1000

                );

            }
            catch(error){

                console.error(

                    "Error registro conductor:",

                    error

                );


                mostrarMensajeGeneral(

                    "No se pudo conectar con el servidor. Verifica que el backend esté encendido.",

                    "error"

                );


                btnRegistro.disabled =
                    false;


                btnRegistro.innerHTML =
                    contenidoOriginal;

            }

        }

    );

}