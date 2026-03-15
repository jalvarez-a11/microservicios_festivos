package com.exam.calendario.controllers;

import com.exam.calendario.dto.FestivoDTO;
import com.exam.calendario.models.Calendario;
import com.exam.calendario.services.CalendarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CalendarioController {

    @Autowired
    private CalendarioService calendarioService;

    @GetMapping("/festivos/obtener/{anio}")
    public List<FestivoDTO> obtenerFestivos(@PathVariable int anio) {
        return calendarioService.obtenerFestivos(anio);
    }

    @GetMapping("/calendario/generar/{anio}")
    public boolean generarCalendario(@PathVariable int anio) {
        return calendarioService.generarCalendario(anio);
    }

    @GetMapping("/calendario/listar/{anio}")
    public List<Calendario> listarCalendario(@PathVariable int anio) {
        return calendarioService.listarCalendario(anio);
    }
}