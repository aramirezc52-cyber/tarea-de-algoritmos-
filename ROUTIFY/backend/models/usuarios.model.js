//======================================
// IMPORTAR CONEXIÓN
//======================================

const conexion = require("../database/conexion");



//======================================
// REGISTRAR USUARIO
//======================================

const registrarUsuario = (datos, callback) => {

    const sql = `

        INSERT INTO usuarios

        (nombre, correo, telefono, password, rol)

        VALUES (?, ?, ?, ?, ?)

    `;

    conexion.query(

        sql,

        [

            datos.nombre,

            datos.correo,

            datos.telefono,

            datos.password,

            datos.rol

        ],

        callback

    );

};

//======================================
// BUSCAR USUARIO POR CORREO
//======================================

const buscarPorCorreo = (correo, callback) => {

    const sql = `

        SELECT *

        FROM usuarios

        WHERE correo = ?

    `;

    conexion.query(

        sql,

        [correo],

        callback

    );

};



//======================================
// EXPORTAR FUNCIONES
//======================================

module.exports = {

    registrarUsuario,

    buscarPorCorreo

};