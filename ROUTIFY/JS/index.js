// ==========================================================
// ROUTIFY V2
// INDEX.JS
// ==========================================================



// ==========================================================
// 1. ELEMENTOS DEL NAVBAR
// ==========================================================

const navbar =

document.querySelector(

    ".navbar-routify"

);



const navbarMenu =

document.getElementById(

    "navbarMenu"

);



const btnMobile =

document.getElementById(

    "btnMobile"

);



const enlacesNavbar =

document.querySelectorAll(

    ".nav-link"

);



// ==========================================================
// 2. ABRIR / CERRAR MENÚ MÓVIL
// ==========================================================

if(

    btnMobile &&

    navbarMenu

){

    btnMobile.addEventListener(

        "click",

        () => {

            navbarMenu.classList.toggle(

                "mobile-open"

            );


            actualizarIconoMenu();

        }

    );

}



// ==========================================================
// 3. CAMBIAR ICONO DEL MENÚ
// ==========================================================

function actualizarIconoMenu(){

    if(!btnMobile){

        return;

    }


    const icono =

        btnMobile.querySelector(

            "i"

        );


    if(!icono){

        return;

    }


    if(

        navbarMenu.classList.contains(

            "mobile-open"

        )

    ){

        icono.className =

            "bi bi-x-lg";

    }

    else{

        icono.className =

            "bi bi-list";

    }

}



// ==========================================================
// 4. CERRAR MENÚ MÓVIL
// ==========================================================

function cerrarMenuMobile(){

    if(!navbarMenu){

        return;

    }


    navbarMenu.classList.remove(

        "mobile-open"

    );


    actualizarIconoMenu();

}



// ==========================================================
// 5. SCROLL SUAVE DE LOS LINKS INTERNOS
// ==========================================================

document.querySelectorAll(

    'a[href^="#"]'

).forEach(

    enlace => {

        enlace.addEventListener(

            "click",

            event => {

                const destinoID =

                    enlace.getAttribute(

                        "href"

                    );


                if(

                    !destinoID ||

                    destinoID === "#"

                ){

                    return;

                }


                const destino =

                    document.querySelector(

                        destinoID

                    );


                if(!destino){

                    return;

                }


                event.preventDefault();


                const alturaNavbar =

                    navbar
                        ?.offsetHeight ||

                    80;


                const posicion =

                    destino.offsetTop -

                    alturaNavbar +

                    1;


                window.scrollTo(

                    {

                        top:

                            posicion,

                        behavior:

                            "smooth"

                    }

                );


                cerrarMenuMobile();

            }

        );

    }

);



// ==========================================================
// 6. SECCIONES DE LA PÁGINA
// ==========================================================

const secciones =

document.querySelectorAll(

    "section[id], footer[id]"

);



// ==========================================================
// 7. ACTUALIZAR LINK ACTIVO
// ==========================================================

function actualizarNavbarActivo(){

    const alturaNavbar =

        navbar
            ?.offsetHeight ||

        80;


    const posicionScroll =

        window.scrollY +

        alturaNavbar +

        120;


    let seccionActual =

        "inicio";


    secciones.forEach(

        seccion => {

            const inicio =

                seccion.offsetTop;


            const final =

                inicio +

                seccion.offsetHeight;


            if(

                posicionScroll >= inicio &&

                posicionScroll < final

            ){

                seccionActual =

                    seccion.id;

            }

        }

    );


    enlacesNavbar.forEach(

        enlace => {

            enlace.classList.remove(

                "active"

            );


            const destino =

                enlace.getAttribute(

                    "href"

                );


            if(

                destino ===

                "#" +
                seccionActual

            ){

                enlace.classList.add(

                    "active"

                );

            }

        }

    );

}



// ==========================================================
// 8. NAVBAR AL HACER SCROLL
// ==========================================================

function actualizarNavbarScroll(){

    if(!navbar){

        return;

    }


    if(

        window.scrollY >
        35

    ){

        navbar.classList.add(

            "navbar-scrolled"

        );

    }

    else{

        navbar.classList.remove(

            "navbar-scrolled"

        );

    }

}



// ==========================================================
// 9. EVENTO SCROLL
// ==========================================================

window.addEventListener(

    "scroll",

    () => {

        actualizarNavbarActivo();

        actualizarNavbarScroll();

    }

);



// ==========================================================
// 10. CERRAR MENÚ AL CAMBIAR DE TAMAÑO
// ==========================================================

window.addEventListener(

    "resize",

    () => {

        if(

            window.innerWidth >
            720

        ){

            cerrarMenuMobile();

        }

    }

);



// ==========================================================
// 11. CERRAR MENÚ AL HACER CLICK FUERA
// ==========================================================

document.addEventListener(

    "click",

    event => {

        if(

            !navbarMenu ||

            !btnMobile

        ){

            return;

        }


        if(

            !navbarMenu.classList.contains(

                "mobile-open"

            )

        ){

            return;

        }


        const clickDentroMenu =

            navbarMenu.contains(

                event.target

            );


        const clickBoton =

            btnMobile.contains(

                event.target

            );


        if(

            !clickDentroMenu &&

            !clickBoton

        ){

            cerrarMenuMobile();

        }

    }

);



// ==========================================================
// 12. TECLA ESC
// ==========================================================

document.addEventListener(

    "keydown",

    event => {

        if(

            event.key ===
            "Escape"

        ){

            cerrarMenuMobile();

        }

    }

);



// ==========================================================
// 13. EFECTO DE LAS TARJETAS
// ==========================================================

const tarjetas =

document.querySelectorAll(

    ".feature-card, .stat-item, .role-card"

);


tarjetas.forEach(

    tarjeta => {

        tarjeta.addEventListener(

            "mouseenter",

            () => {

                tarjeta.classList.add(

                    "card-hover"

                );

            }

        );


        tarjeta.addEventListener(

            "mouseleave",

            () => {

                tarjeta.classList.remove(

                    "card-hover"

                );

            }

        );

    }

);



// ==========================================================
// 14. ANIMACIÓN AL APARECER ELEMENTOS
// ==========================================================

const elementosAnimados =

document.querySelectorAll(

    ".feature-card, .stat-item, .role-card, .cta-panel"

);



const observer =

new IntersectionObserver(

    entradas => {

        entradas.forEach(

            entrada => {

                if(

                    entrada.isIntersecting

                ){

                    entrada.target
                        .classList.add(

                            "visible"

                        );


                    observer.unobserve(

                        entrada.target

                    );

                }

            }

        );

    },

    {

        threshold:

            0.12

    }

);



elementosAnimados.forEach(

    elemento => {

        observer.observe(

            elemento

        );

    }

);



// ==========================================================
// 15. INICIALIZAR
// ==========================================================

actualizarNavbarActivo();

actualizarNavbarScroll();