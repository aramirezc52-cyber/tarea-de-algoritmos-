// ==========================================================
// ROUTIFY V2
// REGISTRO.JS
// ==========================================================


// ==========================================================
// 1. ELEMENTOS DEL FORMULARIO
// ==========================================================

const formRegistro =
document.getElementById(
    "formRegistro"
);

const nombre =
document.getElementById(
    "nombre"
);

const correo =
document.getElementById(
    "correo"
);

const telefono =
document.getElementById(
    "telefono"
);

const password =
document.getElementById(
    "password"
);

const confirmPassword =
document.getElementById(
    "confirmPassword"
);

const terminos =
document.getElementById(
    "terminos"
);

const btnRegistro =
document.getElementById(
    "btnRegistro"
);

const mensajeRegistro =
document.getElementById(
    "mensajeRegistro"
);

const togglePassword =
document.getElementById(
    "togglePassword"
);

const toggleConfirmPassword =
document.getElementById(
    "toggleConfirmPassword"
);

const iconPassword =
document.getElementById(
    "iconPassword"
);

const iconConfirmPassword =
document.getElementById(
    "iconConfirmPassword"
);


// ==========================================================
// 2. MOSTRAR MENSAJES
// ==========================================================

function mostrarMensaje(
    mensaje,
    tipo = ""
){

    if(
        !mensajeRegistro
    ){
        return;
    }

    mensajeRegistro.textContent =
        mensaje;

    mensajeRegistro.classList.remove(
        "error",
        "success"
    );

    if(
        tipo
    ){

        mensajeRegistro.classList.add(
            tipo
        );

    }

}


// ==========================================================
// 3. MOSTRAR / OCULTAR CONTRASEÑA
// ==========================================================

if(
    togglePassword &&
    password
){

    togglePassword.addEventListener(
        "click",
        () => {

            const visible =
                password.type ===
                "text";

            password.type =
                visible
                    ? "password"
                    : "text";

            if(
                iconPassword
            ){

                iconPassword.className =
                    visible
                        ? "bi bi-eye"
                        : "bi bi-eye-slash";

            }

        }
    );

}


// ==========================================================
// 4. MOSTRAR / OCULTAR CONFIRMACIÓN
// ==========================================================

if(
    toggleConfirmPassword &&
    confirmPassword
){

    toggleConfirmPassword.addEventListener(
        "click",
        () => {

            const visible =
                confirmPassword.type ===
                "text";

            confirmPassword.type =
                visible
                    ? "password"
                    : "text";

            if(
                iconConfirmPassword
            ){

                iconConfirmPassword.className =
                    visible
                        ? "bi bi-eye"
                        : "bi bi-eye-slash";

            }

        }
    );

}


// ==========================================================
// 5. OBTENER CONTENEDOR
// ==========================================================

function obtenerContenedor(
    input
){

    if(
        !input
    ){
        return null;
    }

    return input.closest(
        ".input-container"
    );

}


// ==========================================================
// 6. MARCAR ERROR
// ==========================================================

function marcarError(
    input
){

    const contenedor =
        obtenerContenedor(
            input
        );

    if(
        !contenedor
    ){
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

function marcarCorrecto(
    input
){

    const contenedor =
        obtenerContenedor(
            input
        );

    if(
        !contenedor
    ){
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
// 8. LIMPIAR ESTADO
// ==========================================================

function limpiarEstado(
    input
){

    const contenedor =
        obtenerContenedor(
            input
        );

    if(
        !contenedor
    ){
        return;
    }

    contenedor.classList.remove(
        "input-error",
        "input-success"
    );

}


// ==========================================================
// 9. VALIDAR CORREO
// ==========================================================

function validarCorreo(
    email
){

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(
        email
    );

}


// ==========================================================
// 10. VALIDAR TELÉFONO
// ==========================================================

function validarTelefono(
    numero
){

    const limpio =
        numero.replace(
            /\D/g,
            ""
        );

    return limpio.length >= 8;

}


// ==========================================================
// 11. VALIDAR CONTRASEÑA
// ==========================================================

function validarPassword(
    clave
){

    return clave.length >= 8;

}


// ==========================================================
// 12. VALIDAR FORMULARIO
// ==========================================================

function validarFormulario(){

    if(
        !nombre ||
        !correo ||
        !telefono ||
        !password ||
        !confirmPassword
    ){

        mostrarMensaje(
            "Hay campos del formulario que no fueron encontrados.",
            "error"
        );

        return false;

    }


    const nombreValor =
        nombre.value.trim();

    const correoValor =
        correo.value.trim();

    const telefonoValor =
        telefono.value.trim();

    const passwordValor =
        password.value;

    const confirmPasswordValor =
        confirmPassword.value;


    if(
        nombreValor.length < 3
    ){

        marcarError(
            nombre
        );

        mostrarMensaje(
            "Ingresa un nombre válido.",
            "error"
        );

        return false;

    }


    marcarCorrecto(
        nombre
    );


    if(
        !validarCorreo(
            correoValor
        )
    ){

        marcarError(
            correo
        );

        mostrarMensaje(
            "Ingresa un correo electrónico válido.",
            "error"
        );

        return false;

    }


    marcarCorrecto(
        correo
    );


    if(
        !validarTelefono(
            telefonoValor
        )
    ){

        marcarError(
            telefono
        );

        mostrarMensaje(
            "Ingresa un número de teléfono válido.",
            "error"
        );

        return false;

    }


    marcarCorrecto(
        telefono
    );


    if(
        !validarPassword(
            passwordValor
        )
    ){

        marcarError(
            password
        );

        mostrarMensaje(
            "La contraseña debe tener al menos 8 caracteres.",
            "error"
        );

        return false;

    }


    marcarCorrecto(
        password
    );


    if(
        passwordValor !==
        confirmPasswordValor
    ){

        marcarError(
            password
        );

        marcarError(
            confirmPassword
        );

        mostrarMensaje(
            "Las contraseñas no coinciden.",
            "error"
        );

        return false;

    }


    marcarCorrecto(
        confirmPassword
    );


    if(
        terminos &&
        !terminos.checked
    ){

        mostrarMensaje(
            "Debes aceptar los términos y condiciones.",
            "error"
        );

        return false;

    }


    return true;

}


// ==========================================================
// 13. ACTIVAR CARGA
// ==========================================================

function activarCarga(){

    if(
        !btnRegistro
    ){
        return;
    }

    btnRegistro.disabled =
        true;

    btnRegistro.innerHTML =
        `
            <span>
                Creando cuenta...
            </span>

            <i class="bi bi-arrow-repeat register-spinner"></i>
        `;

}


// ==========================================================
// 14. DESACTIVAR CARGA
// ==========================================================

function desactivarCarga(){

    if(
        !btnRegistro
    ){
        return;
    }

    btnRegistro.disabled =
        false;

    btnRegistro.innerHTML =
        `
            <span>
                Crear mi cuenta
            </span>

            <i class="bi bi-arrow-right"></i>
        `;

}


// ==========================================================
// 15. REGISTRAR USUARIO EN MYSQL
// ==========================================================

async function registrarUsuario(
    nuevoUsuario
){

    activarCarga();

    mostrarMensaje(
        "",
        ""
    );

    try{

        console.log(
            "Enviando usuario al backend:",
            nuevoUsuario
        );


        const respuesta =
        await fetch(
            "http://localhost:3000/usuarios",
            {

                method:
                    "POST",

                headers:
                {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        nuevoUsuario
                    )

            }
        );


        console.log(
            "Estado HTTP:",
            respuesta.status
        );


        const texto =
            await respuesta.text();


        console.log(
            "Respuesta del backend:",
            texto
        );


        let datos = {};

        if(
            texto
        ){

            try{

                datos =
                    JSON.parse(
                        texto
                    );

            }
            catch(
                error
            ){

                console.error(
                    "La respuesta no es JSON:",
                    texto
                );

                throw new Error(
                    "El servidor respondió incorrectamente."
                );

            }

        }


        if(
            !respuesta.ok
        ){

            throw new Error(
                datos.mensaje ||
                datos.error ||
                "No fue posible registrar el usuario."
            );

        }


        mostrarMensaje(
            datos.mensaje ||
            "Usuario registrado correctamente.",
            "success"
        );


        console.log(
            "Usuario guardado correctamente:",
            datos
        );


        // ==================================================
        // GUARDAR SESIÓN SI EL BACKEND DEVUELVE USUARIO
        // ==================================================

        if(
            datos.usuario
        ){

            sessionStorage.setItem(
                "sesionROUTIFY",
                JSON.stringify(
                    datos.usuario
                )
            );

        }


        // ==================================================
        // GUARDAR TOKEN SI EXISTE
        // ==================================================

        if(
            datos.token
        ){

            sessionStorage.setItem(
                "tokenROUTIFY",
                datos.token
            );

        }


        // ==================================================
        // LIMPIAR FORMULARIO
        // ==================================================

        if(
            formRegistro
        ){

            formRegistro.reset();

        }


        // ==================================================
        // REDIRECCIONAR
        // ==================================================

        setTimeout(
            () => {

                window.location.href =
                    "Seleccion.html";

            },
            1200
        );


    }
    catch(
        error
    ){

        console.error(
            "ERROR DE REGISTRO:",
            error
        );


        mostrarMensaje(
            error.message ||
            "No se pudo conectar con el servidor.",
            "error"
        );


        desactivarCarga();

    }

}


// ==========================================================
// 16. SUBMIT DEL FORMULARIO
// ==========================================================

if(
    formRegistro
){

    formRegistro.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if(
                !validarFormulario()
            ){

                return;

            }


            const nuevoUsuario =
            {

                nombre:
                    nombre.value.trim(),

                correo:
                    correo.value.trim(),

                telefono:
                    telefono.value.trim(),

                password:
                    password.value

            };


            await registrarUsuario(
                nuevoUsuario
            );

        }
    );

}


// ==========================================================
// 17. LIMPIAR ERRORES AL ESCRIBIR
// ==========================================================

const camposRegistro =
[
    nombre,
    correo,
    telefono,
    password,
    confirmPassword
];


camposRegistro.forEach(
    campo => {

        if(
            !campo
        ){
            return;
        }

        campo.addEventListener(
            "input",
            () => {

                limpiarEstado(
                    campo
                );

                mostrarMensaje(
                    "",
                    ""
                );

            }
        );

    }
);


// ==========================================================
// 18. VALIDACIONES VISUALES
// ==========================================================

if(
    nombre
){

    nombre.addEventListener(
        "blur",
        () => {

            if(
                nombre.value.trim().length >= 3
            ){

                marcarCorrecto(
                    nombre
                );

            }

        }
    );

}


if(
    correo
){

    correo.addEventListener(
        "blur",
        () => {

            if(
                validarCorreo(
                    correo.value.trim()
                )
            ){

                marcarCorrecto(
                    correo
                );

            }

        }
    );

}


if(
    telefono
){

    telefono.addEventListener(
        "blur",
        () => {

            if(
                validarTelefono(
                    telefono.value.trim()
                )
            ){

                marcarCorrecto(
                    telefono
                );

            }

        }
    );

}


if(
    password
){

    password.addEventListener(
        "blur",
        () => {

            if(
                validarPassword(
                    password.value
                )
            ){

                marcarCorrecto(
                    password
                );

            }

        }
    );

}


if(
    confirmPassword
){

    confirmPassword.addEventListener(
        "input",
        () => {

            if(
                confirmPassword.value === ""
            ){

                limpiarEstado(
                    confirmPassword
                );

                return;

            }


            if(
                password &&
                password.value ===
                confirmPassword.value
            ){

                marcarCorrecto(
                    confirmPassword
                );

            }
            else{

                marcarError(
                    confirmPassword
                );

            }

        }
    );

}