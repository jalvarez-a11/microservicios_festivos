package com.exam.calendario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.exam.calendario.repository.CalendarioRepository;
import com.exam.calendario.model.Calendario;
import com.exam.calendario.client.FestivoClient;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarioService {

    @Autowired
    CalendarioRepository repository;

    @Autowired
    FestivoClient festivoClient;

    public boolean generarCalendario(int anio) {

        List<String> festivos = festivoClient.obtenerFestivos(anio);

        LocalDate fecha = LocalDate.of(anio, 1, 1);
        LocalDate fin = LocalDate.of(anio, 12, 31);

        while (!fecha.isAfter(fin)) {

            Calendario c = new Calendario();
            c.setFecha(fecha);

            if (festivos.contains(fecha.toString())) {
                c.setTipo("Festivo");
            } else if (fecha.getDayOfWeek().getValue() == 6 || fecha.getDayOfWeek().getValue() == 7) {
                c.setTipo("Fin de semana");
            } else {
                c.setTipo("Laboral");
            }

            repository.save(c);

            fecha = fecha.plusDays(1);
        }

        return true;

    }

}