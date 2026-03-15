const mongoose = require("mongoose");

const FestivoSchema = new mongoose.Schema({
  id: Number,
  tipo: String,
  modoCalculo: String,
  festivos: [
    {
      nombre: String,
      dia: Number,
      mes: Number,
      diasPascua: Number
    }
  ]
}, { strict: false });

module.exports = mongoose.model("Tipo", FestivoSchema, "tipos");