const Festivo = require("../models/Festivo");
// ─────────────────────────────────────────────
// Cálcula el Domingo de Pascua
// ─────────────────────────────────────────────
function calcularDomingoPascua(anio) {
  const a = anio % 19;
  const b = anio % 4;
  const c = anio % 7;
  const d = (19 * a + 24) % 30;
  const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;

  // Domingo de Ramos = 15 de marzo + dias
  // Domingo de Pascua = Domingo de Ramos + 7
  const domRamos = new Date(anio, 2, 15 + dias); // mes 2 = marzo (0-indexed)
  const domPascua = new Date(domRamos);
  domPascua.setDate(domPascua.getDate() + 7);
  return domPascua;
}

// ─────────────────────────────────────────────
// Ley de Puente Festivo:
// Si el día NO es lunes, se mueve al siguiente lunes
// ─────────────────────────────────────────────
function moverAlSiguienteLunes(fecha) {
  const diaSemana = fecha.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
  if (diaSemana === 1) return new Date(fecha); // ya es lunes, no se mueve
  const diasHastaLunes = diaSemana === 0 ? 1 : (8 - diaSemana);
  const lunes = new Date(fecha);
  lunes.setDate(lunes.getDate() + diasHastaLunes);
  return lunes;
}

// ─────────────────────────────────────────────
// Convierte un Date a string "YYYY-MM-DD"
// sin depender de toISOString (evita problemas de zona horaria)
// ─────────────────────────────────────────────
function toDateString(fecha) {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ─────────────────────────────────────────────
// Valida que una fecha sea real (ej: 35/02 es inválida)
// ─────────────────────────────────────────────
function esFechaValida(anio, mes, dia) {
  const y = parseInt(anio);
  const m = parseInt(mes);
  const d = parseInt(dia);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return false;
  const fecha = new Date(y, m - 1, d);
  return (
    fecha.getFullYear() === y &&
    fecha.getMonth() === m - 1 &&
    fecha.getDate() === d
  );
}

// ─────────────────────────────────────────────
// Calcula y retorna todos los festivos de un año
// como array de strings "YYYY-MM-DD"
// ─────────────────────────────────────────────
async function obtenerFestivos(anio) {
  const y = parseInt(anio);
  const tipos = await Festivo.find().sort({ id: 1 });
  const domPascua = calcularDomingoPascua(y);
  const resultado = [];

  for (const tipo of tipos) {
    // Protección: si festivos no existe o está vacío, se omite el documento
    const listaFestivos = tipo.festivos ?? [];
    if (listaFestivos.length === 0) continue;

    for (const f of listaFestivos) {
      let fecha;

      try {
        if (tipo.id === 1) {
          // ── Tipo 1: Fijo ──────────────────────────────
          // La fecha nunca varía: día y mes exactos
          fecha = new Date(y, f.mes - 1, f.dia);

        } else if (tipo.id === 2) {
          // ── Tipo 2: Ley de Puente Festivo ────────────
          // Se toma la fecha original y se traslada al siguiente lunes
          const fechaBase = new Date(y, f.mes - 1, f.dia);
          fecha = moverAlSiguienteLunes(fechaBase);

        } else if (tipo.id === 3) {
          // ── Tipo 3: Relativo a Pascua (sin traslado) ─
          // Domingo de Pascua ± diasPascua
          fecha = new Date(domPascua);
          fecha.setDate(fecha.getDate() + f.diasPascua);

        } else if (tipo.id === 4) {
          // ── Tipo 4: Relativo a Pascua + Puente ───────
          // Domingo de Pascua ± diasPascua → luego al siguiente lunes
          const fechaBase = new Date(domPascua);
          fechaBase.setDate(fechaBase.getDate() + f.diasPascua);
          fecha = moverAlSiguienteLunes(fechaBase);
        }

        if (fecha) {
          resultado.push({
            festivo: f.nombre,
            fecha: toDateString(fecha)
          });
        }
      } catch (err) {
        // Si un festivo individual tiene datos corruptos, se omite sin romper todo
        console.warn(`Festivo omitido por error: ${f.nombre} →`, err.message);
      }
    }
  }

  // Ordenar por fecha ascendente
  resultado.sort((a, b) => (a.fecha > b.fecha ? 1 : -1));
  return resultado;
}

module.exports = { obtenerFestivos, esFechaValida };