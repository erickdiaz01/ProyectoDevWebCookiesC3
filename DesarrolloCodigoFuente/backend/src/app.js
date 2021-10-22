const express = require("express");
const cors = require("cors");
const app = express();
const {dbConnection}=require("./database");
//settings
app.set("port", process.env.PORT || 4000);

//Levantar la conexion a la DB
dbConnection();

//middlewares
app.use(cors());
app.use(express.json());



//routes
app.use("/api",require("./routes/auth"))
app.use("/api/auth",require("./routes/auth"))

app.use("/api/gestionventas",require("./routes/moduloAdminVentas"))
app.use("/api/gestionpedidos",require("./routes/gestionPedidos"))
app.use("/api/crearproducto",require("./routes/createProduct"))
app.use("/api/modificarproducto",require("./routes/modificarProducto"))
app.use("/api/historico-pedidos",require("./routes/historicoPedidos"))
app.use("/api/verusuarios",require("./routes/verUsuarios"))
app.use("/api/gestionusuarios",require("./routes/gestionUsuarios"))





module.exports = app;