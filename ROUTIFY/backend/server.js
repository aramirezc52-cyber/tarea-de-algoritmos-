//======================================
// IMPORTAR LIBRERÍAS
//======================================

const express = require("express");

const cors = require("cors");

require("dotenv").config();



//======================================
// IMPORTAR CONEXIÓN
//======================================

require("./database/conexion");



//======================================
// IMPORTAR RUTAS
//======================================

const usuariosRoutes = require("./routes/usuarios.routes");

const conductoresRoutes = require("./routes/conductores.routes");

const adminRoutes = require("./routes/admin.routes");



//======================================
// CREAR SERVIDOR
//======================================

const app = express();



//======================================
// CONFIGURACIONES
//======================================

app.use(cors());

app.use(express.json());



//======================================
// USAR RUTAS
//======================================

app.use(
    "/usuarios",
    usuariosRoutes
);


app.use(
    "/conductores",
    conductoresRoutes
);


app.use(
    "/admin",
    adminRoutes
);



//======================================
// RUTA DE PRUEBA
//======================================

app.get("/", (req, res) => {

    res.send(
        "Servidor ROUTIFY funcionando"
    );

});



//======================================
// ENCENDER SERVIDOR
//======================================

app.listen(
    process.env.PORT,
    () => {

        console.log(

            `Servidor ejecutándose en el puerto ${process.env.PORT}`

        );

    }
);