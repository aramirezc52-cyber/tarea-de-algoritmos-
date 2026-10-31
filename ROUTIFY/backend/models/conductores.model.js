// ==========================================================
// ROUTIFY
// MODELO DE CONDUCTORES
// ==========================================================


const conexion = require(

    "../database/conexion"

);


// ==========================================================
// REGISTRAR CONDUCTOR
// ==========================================================

const registrarConductor = (

    datos,
    callback

) => {


    const sql = `

        INSERT INTO conductores
        (
            id_usuario,
            licencia,
            tipo_licencia,
            estado
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?
        )

    `;


    const valores = [

        datos.id_usuario,

        datos.licencia,

        datos.tipo_licencia,

        "activo"

    ];


    conexion.query(

        sql,

        valores,

        callback

    );

};


// ==========================================================
// BUSCAR CONDUCTOR POR USUARIO
// ==========================================================

const buscarPorUsuario = (

    idUsuario,
    callback

) => {


    const sql = `

        SELECT *

        FROM conductores

        WHERE id_usuario = ?

        LIMIT 1

    `;


    conexion.query(

        sql,

        [idUsuario],

        callback

    );

};


// ==========================================================
// EXPORTAR
// ==========================================================

module.exports = {

    registrarConductor,

    buscarPorUsuario

};