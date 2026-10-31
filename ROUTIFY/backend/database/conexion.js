//======================================
// CONEXION MYSQL ROUTIFY
//======================================


const mysql = require("mysql2");

const dotenv = require("dotenv");



dotenv.config();




//======================================
// CREAR CONEXION
//======================================


const conexion = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME


});




//======================================
// CONECTAR
//======================================


conexion.connect((error)=>{


    if(error){


        console.log(

            "Error conectando a MySQL:",
            error.message

        );


        return;


    }



    console.log(

        "MySQL conectado correctamente"

    );



});





module.exports = conexion;