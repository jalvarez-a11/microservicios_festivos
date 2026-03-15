
package com.exam.calendario.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Calendario {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private LocalDate fecha;

 private String tipo;

 public Long getId() { return id; }
 public void setId(Long id) { this.id = id; }

 public LocalDate getFecha() { return fecha; }
 public void setFecha(LocalDate fecha) { this.fecha = fecha; }

 public String getTipo() { return tipo; }
 public void setTipo(String tipo) { this.tipo = tipo; }
}
