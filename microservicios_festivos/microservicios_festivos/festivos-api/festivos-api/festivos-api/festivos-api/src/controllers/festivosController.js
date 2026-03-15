const festivoService = require("../services/festivoService");
// ─────────────────────────────────────────────
// GET /api/festivos/verificar/:anio/:mes/:dia
// Verifica si una fecha específica es festiva.
//
// Respuestas:
//   200 → { error: "Fecha no válida" }          (ej: día 35, mes 13, etc.)
//   200 → { fecha: "YYYY-MM-DD", esFestivo: true/false }
// ─────────────────────────────────────────────
exports.verificarFestivo = async (req, res) => {
  try {
    const { anio, mes, dia } = req.params;

    // ── 1. Validar que la fecha sea real ──────
    if (!festivoService.esFechaValida(anio, mes, dia)) {
      return res.status(200).json({ error: "Fecha no válida" });
    }

    // ── 2. Construir string de la fecha a consultar ──
    const fechaBuscada = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

    // ── 3. Obtener todos los festivos del año ──
    const festivos = await festivoService.obtenerFestivos(anio);

    // ── 4. Comparar contra la lista ───────────
    const esFestivo = festivos.some((f) => f.fecha === fechaBuscada);

    return res.status(200).json({ fecha: fechaBuscada, esFestivo });

  } catch (error) {
    console.error("Error en verificarFestivo:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// GET /api/festivos/obtener/:anio
// Retorna la lista completa de festivos de un año.
// Útil para el punto 2 (Spring Boot consume este endpoint).
//
// Respuesta 200 → [ { festivo: "Nombre", fecha: "YYYY-MM-DD" }, ... ]
// ─────────────────────────────────────────────
exports.listarFestivos = async (req, res) => {
  try {
    const { anio } = req.params;

    if (isNaN(parseInt(anio))) {
      return res.status(400).json({ error: "Año no válido" });
    }

    const festivos = await festivoService.obtenerFestivos(anio);
    return res.status(200).json(festivos);

  } catch (error) {
    console.error("Error en listarFestivos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};