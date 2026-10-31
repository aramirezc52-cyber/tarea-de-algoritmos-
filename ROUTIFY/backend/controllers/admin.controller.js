//======================================
// IMPORTAR CONEXIÓN MYSQL
//======================================

const conexion = require("../database/conexion");



//======================================
// OBTENER USUARIOS
//======================================

const obtenerUsuarios = (req,res)=>{


const sql = `

SELECT 
id,
nombre,
correo,
telefono,
rol,
fecha_registro

FROM usuarios

ORDER BY id DESC

`;



conexion.query(
sql,
(error,resultado)=>{


if(error){

console.log(error);


return res.status(500).json({

mensaje:"Error obteniendo usuarios"

});

}



res.json(resultado);


}

);


};





//======================================
// OBTENER CONDUCTORES
//======================================

const obtenerConductores = (req,res)=>{


const sql = `

SELECT *

FROM conductores

ORDER BY id DESC

`;



conexion.query(

sql,

(error,resultado)=>{


if(error){

console.log(error);


return res.status(500).json({

mensaje:"Error obteniendo conductores"

});

}



res.json(resultado);



}

);



};







//======================================
// OBTENER BUSES
//======================================

const obtenerBuses = (req,res)=>{


const sql = `

SELECT *

FROM buses

ORDER BY id DESC

`;



conexion.query(

sql,

(error,resultado)=>{


if(error){

console.log(error);


return res.status(500).json({

mensaje:"Error obteniendo buses"

});

}



res.json(resultado);



}

);



};








//======================================
// OBTENER RUTAS
//======================================

const obtenerRutas = (req,res)=>{


const sql = `

SELECT *

FROM rutas

ORDER BY id DESC

`;



conexion.query(

sql,

(error,resultado)=>{


if(error){

console.log(error);


return res.status(500).json({

mensaje:"Error obteniendo rutas"

});

}



res.json(resultado);



}

);



};









//======================================
// OBTENER ALERTAS
//======================================

const obtenerAlertas = (req,res)=>{


const sql = `

SELECT *

FROM alertas

ORDER BY id DESC

`;



conexion.query(

sql,

(error,resultado)=>{


if(error){

console.log(error);


return res.status(500).json({

mensaje:"Error obteniendo alertas"

});

}



res.json(resultado);



}

);



};






//======================================
// EXPORTAR
//======================================

module.exports = {


obtenerUsuarios,

obtenerConductores,

obtenerBuses,

obtenerRutas,

obtenerAlertas


};