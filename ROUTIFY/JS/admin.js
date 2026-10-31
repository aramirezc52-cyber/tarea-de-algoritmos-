// ==========================================================
// ROUTIFY V2
// ADMIN DASHBOARD
// CONEXIÓN MYSQL
// ==========================================================


// ==========================================================
// 1. VALIDAR SESIÓN ADMINISTRADOR
// ==========================================================


const sesionAdmin = JSON.parse(

    sessionStorage.getItem(
        "sesionROUTIFY"
    )

);



if(!sesionAdmin){

    window.location.replace(
        "login.html"
    );

}



if(
    sesionAdmin &&
    sesionAdmin.rol !== "administrador"
){

    window.location.replace(
        "seleccion.html"
    );

}




// ==========================================================
// 2. MOSTRAR NOMBRE ADMIN
// ==========================================================


const nombreAdministrador = 
document.getElementById(
    "nombreAdministrador"
);



if(nombreAdministrador){

    nombreAdministrador.textContent =
    sesionAdmin.nombre;

}




// ==========================================================
// 3. URL BACKEND
// ==========================================================


const API = 
"http://localhost:3000/admin";





// ==========================================================
// 4. CARGAR USUARIOS
// ==========================================================


async function cargarUsuarios(){


try{


const respuesta =
await fetch(
`${API}/usuarios`
);



const usuarios =
await respuesta.json();



const tabla =
document.getElementById(
"tablaUsuarios"
);



const total =
document.getElementById(
"totalUsuarios"
);



if(total){

total.textContent =
usuarios.length;

}



if(tabla){


tabla.innerHTML="";



usuarios.forEach(usuario=>{


tabla.innerHTML += `

<tr>

<td>
${usuario.nombre}
</td>


<td>
${usuario.correo}
</td>


<td>
${usuario.rol}
</td>


<td>

<button>

<i class="bi bi-eye"></i>

</button>

</td>


</tr>

`;



});


}



}
catch(error){

console.error(
"Error usuarios:",
error
);

}



}







// ==========================================================
// 5. CARGAR CONDUCTORES
// ==========================================================


async function cargarConductores(){


try{


const respuesta =
await fetch(
`${API}/conductores`
);



const conductores =
await respuesta.json();



const tabla =
document.getElementById(
"tablaConductores"
);



const total =
document.getElementById(
"totalConductores"
);



if(total){

total.textContent =
conductores.length;

}



if(tabla){


tabla.innerHTML="";



conductores.forEach(conductor=>{


tabla.innerHTML += `

<tr>

<td>
${conductor.nombre || "Sin nombre"}
</td>


<td>
${conductor.correo || "-"}
</td>


<td>
Activo
</td>


<td>

<button>

<i class="bi bi-check-circle"></i>

</button>


</td>


</tr>

`;



});



}



}
catch(error){

console.error(
"Error conductores:",
error
);

}


}







// ==========================================================
// 6. CARGAR BUSES
// ==========================================================


async function cargarBuses(){


try{


const respuesta =
await fetch(
`${API}/buses`
);



const buses =
await respuesta.json();



const total =
document.getElementById(
"totalBuses"
);



if(total){

total.textContent =
buses.length;

}



const contenedor =
document.getElementById(
"listaBuses"
);



if(contenedor){


contenedor.innerHTML="";



buses.forEach(bus=>{


contenedor.innerHTML += `

<div class="item-admin">


<i class="bi bi-bus-front-fill"></i>


<h3>

${bus.numero || "Bus"}

</h3>


<p>

Estado:
${bus.estado || "Disponible"}

</p>


</div>

`;



});



}



}
catch(error){

console.error(
"Error buses:",
error
);


}


}








// ==========================================================
// 7. CARGAR RUTAS
// ==========================================================


async function cargarRutas(){


try{


const respuesta =
await fetch(
`${API}/rutas`
);



const rutas =
await respuesta.json();




const total =
document.getElementById(
"totalRutas"
);



if(total){

total.textContent =
rutas.length;

}




const lista =
document.getElementById(
"listaRutas"
);



if(lista){


lista.innerHTML="";



rutas.forEach(ruta=>{


lista.innerHTML += `


<div class="item-admin">


<i class="bi bi-signpost-split-fill"></i>


<h3>

${ruta.nombre}

</h3>


<p>

${ruta.origen || ""}
-
${ruta.destino || ""}

</p>


</div>


`;



});



}



}
catch(error){

console.error(
"Error rutas:",
error
);


}



}








// ==========================================================
// 8. CARGAR ALERTAS
// ==========================================================


async function cargarAlertas(){


try{


const respuesta =
await fetch(
`${API}/alertas`
);



const alertas =
await respuesta.json();



const lista =
document.getElementById(
"listaAlertas"
);



if(lista){


lista.innerHTML="";



alertas.forEach(alerta=>{


lista.innerHTML += `


<div class="alerta">


<i class="bi bi-bell-fill"></i>


<div>


<strong>
${alerta.tipo}
</strong>


<p>
${alerta.mensaje}
</p>


</div>


</div>


`;



});



}



}
catch(error){

console.error(
"Error alertas:",
error
);


}



}








// ==========================================================
// 9. CERRAR SESIÓN
// ==========================================================


const btnCerrarSesion =
document.getElementById(
"btnCerrarSesion"
);



if(btnCerrarSesion){


btnCerrarSesion.addEventListener(
"click",
()=>{


sessionStorage.removeItem(
"sesionROUTIFY"
);



window.location.replace(
"login.html"
);



}

);



}






// ==========================================================
// 10. INICIAR DASHBOARD
// ==========================================================


cargarUsuarios();

cargarConductores();

cargarBuses();

cargarRutas();

cargarAlertas();