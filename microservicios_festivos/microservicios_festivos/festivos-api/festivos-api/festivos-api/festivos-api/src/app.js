// Improta las librerias necesarias para crear la API, conectarse a MongoDB y permitir el consumo de la API desde otros servicios.
const express = require("express"); //Crea la Api 
const mongoose = require("mongoose"); //Se conecta con mongodb
const cors = require("cors"); //permite que otros servicios consuman la API
//Importar rutas
const festivoRoutes = require("./routes/festivosRoutes");

const app = express();//aqui se crea la api con express
//Middleware para permitir el consumo de la API desde otros servicios y para parsear el cuerpo de las solicitudes como JSON.
app.use(cors());
app.use(express.json());
//Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/festivos;")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err.message));
//Rutas
app.use("/api/festivos", festivoRoutes);
//Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log("Servidor corriendo en puerto 8080");
});