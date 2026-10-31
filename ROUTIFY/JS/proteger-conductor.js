const sesion =
JSON.parse(
sessionStorage.getItem(
"sesionROUTIFY"
)
);



if(!sesion){

window.location.replace(
"login.html"
);

}



if(
sesion.rol !== "conductor" &&
sesion.rol !== "administrador"
){

alert(
"No tienes permisos para entrar al panel conductor"
);


window.location.replace(
"dashboard-pasajero.html"
);


}