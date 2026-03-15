
package com.exam.calendario.client;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class FestivoClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> obtenerFestivos(int anio) {

        String url = "http://localhost:8080/api/festivos/obtener/" + anio;

        return restTemplate.getForObject(url, List.class);

    }

}
