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


app.use("/api/auth",require("./routes/auth"))

app.use("/api/ventas",require("./routes/moduloAdminVentas"))
// app.use("/api/pedidos",require("./routes/gestionPedidos"))

app.use("/api/productos",require("./routes/productos"))

// app.use("/api/historico-pedidos",require("./routes/historicoPedidos"))

app.use("/api/gestionusuarios",require("./routes/gestionUsuarios"))

app.use("/api/clientes",require("./routes/clientes"))




module.exports = app;