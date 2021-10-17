const express = require("express");
const cors = require("cors");
const app = express();

//settings
app.set("port", process.env.PORT || 4000);



//middlewares
app.use(cors());
app.use(express.json());



//routes
app.get("/",(req,res)=>res.send())
app.get("/registeruser",(req,res)=>res.send())
app.get("/login",(req,res)=>res.send())
app.get("/api/gestionventas",(req,res)=>res.send())
app.get("/api/gestionpedidos",(req,res)=>res.send())
app.get("/api/crearproducto",(req,res)=>res.send())
app.get("/api/modificarproducto",(req,res)=>res.send())
app.get("/api/historico-pedidos",(req,res)=>res.send())
app.get("/api/verusuarios",(req,res)=>res.send())
app.get("/api/gestionusuarios",(req,res)=>res.send())





module.exports = app;