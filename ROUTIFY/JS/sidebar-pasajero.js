// ==========================================================
// ROUTIFY V2
// NAVEGACIÓN SIDEBAR PASAJERO
// ==========================================================



// ==========================================================
// 1. ELEMENTOS DEL SIDEBAR
// ==========================================================

const enlacesSidebar =

    document.querySelectorAll(

        ".sidebar-menu .menu-item[href^='#']"

    );



// ==========================================================
// 2. SCROLL SUAVE
// ==========================================================

enlacesSidebar.forEach(

    enlace => {

        enlace.addEventListener(

            "click",

            evento => {

                const destinoId =

                    enlace.getAttribute(

                        "href"

                    );



                if(

                    !destinoId ||

                    destinoId === "#"

                ){

                    return;

                }



                const destino =

                    document.querySelector(

                        destinoId

                    );



                if(!destino){

                    return;

                }



                evento.preventDefault();



                destino.scrollIntoView(

                    {

                        behavior:

                            "smooth",

                        block:

                            "start"

                    }

                );



                cambiarMenuActivo(

                    enlace

                );

            }

        );

    }

);



// ==========================================================
// 3. CAMBIAR ELEMENTO ACTIVO
// ==========================================================

function cambiarMenuActivo(

    enlaceActivo

){

    enlacesSidebar.forEach(

        enlace => {

            enlace.classList.remove(

                "active"

            );

        }

    );



    enlaceActivo.classList.add(

        "active"

    );

}



// ==========================================================
// 4. SECCIONES OBSERVADAS
// ==========================================================

const seccionesSidebar = [

    {

        id:

            "inicio",

        enlace:

            "#inicio"

    },

    {

        id:

            "rutas",

        enlace:

            "#rutas"

    },

    {

        id:

            "mapaSeccion",

        enlace:

            "#mapaSeccion"

    },

    {

        id:

            "favoritos",

        enlace:

            "#favoritos"

    },

    {

        id:

            "misViajes",

        enlace:

            "#misViajes"

    },

    {

        id:

            "alertasSeccion",

        enlace:

            "#alertasSeccion"

    }

];



// ==========================================================
// 5. OBSERVAR SCROLL
// ==========================================================

const observerSidebar =

    new IntersectionObserver(

        entradas => {

            entradas.forEach(

                entrada => {

                    if(

                        entrada.isIntersecting

                    ){

                        const seccion =

                            seccionesSidebar.find(

                                item =>

                                    item.id ===

                                    entrada.target.id

                            );



                        if(!seccion){

                            return;

                        }



                        const enlace =

                            document.querySelector(

                                `.sidebar-menu .menu-item[href="${seccion.enlace}"]`

                            );



                        if(enlace){

                            cambiarMenuActivo(

                                enlace

                            );

                        }

                    }

                }

            );

        },

        {

            root:

                null,

            threshold:

                0.35,

            rootMargin:

                "-80px 0px -45% 0px"

        }

    );



// ==========================================================
// 6. REGISTRAR SECCIONES
// ==========================================================

seccionesSidebar.forEach(

    seccion => {

        const elemento =

            document.getElementById(

                seccion.id

            );



        if(elemento){

            observerSidebar.observe(

                elemento

            );

        }

    }

);



// ==========================================================
// 7. REGRESAR ARRIBA
// ==========================================================

const enlaceInicio =

    document.querySelector(

        '.menu-item[href="#inicio"]'

    );



if(enlaceInicio){

    enlaceInicio.addEventListener(

        "click",

        () => {

            window.scrollTo(

                {

                    top:

                        0,

                    behavior:

                        "smooth"

                }

            );

        }

    );

}