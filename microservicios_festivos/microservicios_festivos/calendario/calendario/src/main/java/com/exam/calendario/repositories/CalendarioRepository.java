package com.exam.calendario.repositories;

import com.exam.calendario.models.Calendario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CalendarioRepository extends JpaRepository<Calendario, Integer> {

    @Query("SELECT c FROM Calendario c WHERE YEAR(c.fecha) = :anio")
    List<Calendario> findByAnio(@Param("anio") int anio);
}