const express = require("express");
const cors = require("cors");
const app = express();

//settings
app.set("port", process.env.PORT || 4000);



//middlewares
app.use(cors());
app.use(express.json());



//routes
app.use("/",require("./routes/createUser"))
app.use("/registeruser",require("./routes/createUser"))
app.use("/login",require("./routes/login"))
app.use("/api/gestionventas",require("./routes/moduloAdminVentas"))
app.use("/api/gestionpedidos",require("./routes/gestionPedidos"))
app.use("/api/crearproducto",require("./routes/createProduct"))
app.use("/api/modificarproducto",require("./routes/modificarProducto"))
app.use("/api/historico-pedidos",require("./routes/historicoPedidos"))
app.use("/api/verusuarios",require("./routes/verUsuarios"))
app.use("/api/gestionusuarios",require("./routes/gestionUsuarios"))





module.exports = app;