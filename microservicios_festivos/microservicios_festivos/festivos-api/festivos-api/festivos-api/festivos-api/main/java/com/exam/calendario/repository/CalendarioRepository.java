
package com.exam.calendario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.calendario.model.Calendario;

public interface CalendarioRepository extends JpaRepository<Calendario, Long> {
}
