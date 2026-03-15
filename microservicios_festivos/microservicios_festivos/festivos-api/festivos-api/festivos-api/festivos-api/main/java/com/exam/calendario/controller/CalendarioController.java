package com.exam.calendario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.exam.calendario.service.CalendarioService;

@RestController
@RequestMapping("/api/calendario")
public class CalendarioController {

    @Autowired
    CalendarioService service;

    @GetMapping("/generar/{anio}")
    public boolean generar(@PathVariable int anio) {

        return service.generarCalendario(anio);

    }

}
