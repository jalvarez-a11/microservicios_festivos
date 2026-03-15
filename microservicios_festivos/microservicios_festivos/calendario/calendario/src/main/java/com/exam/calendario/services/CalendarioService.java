package com.exam.calendario.services;

import com.exam.calendario.dto.FestivoDTO;
import com.exam.calendario.models.Calendario;
import com.exam.calendario.models.Tipo;
import com.exam.calendario.repositories.CalendarioRepository;
import com.exam.calendario.repositories.TipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarioService {

    @Autowired
    private CalendarioRepository calendarioRepository;

    @Autowired
    private TipoRepository tipoRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<FestivoDTO> obtenerFestivos(int anio) {
        String url = "http://localhost:8080/api/festivos/obtener/" + anio;
        FestivoDTO[] festivos = restTemplate.getForObject(url, FestivoDTO[].class);
        return Arrays.asList(festivos);
    }

    public boolean generarCalendario(int anio) {
        List<String> fechasFestivas = obtenerFestivos(anio)
                .stream()
                .map(FestivoDTO::getFecha)
                .collect(Collectors.toList());

        Tipo laboral = tipoRepository.findById(1).orElseThrow();
        Tipo finSemana = tipoRepository.findById(2).orElseThrow();
        Tipo festivo = tipoRepository.findById(3).orElseThrow();

        List<Calendario> previos = calendarioRepository.findByAnio(anio);
        calendarioRepository.deleteAll(previos);

        LocalDate fecha = LocalDate.of(anio, 1, 1);
        LocalDate fin = LocalDate.of(anio, 12, 31);

        while (!fecha.isAfter(fin)) {
            Calendario dia = new Calendario();
            dia.setFecha(fecha);
            dia.setDescripcion(fecha.getDayOfWeek().toString());

            String fechaStr = fecha.toString();
            DayOfWeek dow = fecha.getDayOfWeek();

            if (fechasFestivas.contains(fechaStr)) {
                dia.setTipo(festivo);
            } else if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) {
                dia.setTipo(finSemana);
            } else {
                dia.setTipo(laboral);
            }

            calendarioRepository.save(dia);
            fecha = fecha.plusDays(1);
        }

        return true;
    }

    public List<Calendario> listarCalendario(int anio) {
        return calendarioRepository.findByAnio(anio);
    }
}