package com.exam.calendario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.exam.calendario.models")
@EnableJpaRepositories("com.exam.calendario.repositories")
public class CalendarioApplication {

    public static void main(String[] args) {
        SpringApplication.run(CalendarioApplication.class, args);
    }

}