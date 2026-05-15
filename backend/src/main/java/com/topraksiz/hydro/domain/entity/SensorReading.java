package com.topraksiz.hydro.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "sensor_readings")
@Getter
@Setter
public class SensorReading {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private LocalDateTime timestamp;

  @Column(nullable = false)
  private Double ph;

  @Column(nullable = false)
  private Double ec;

  @Column(nullable = false)
  private Double temperature;

  @Column(nullable = false)
  private Double humidity;

  @Column(nullable = false)
  private Double waterLevel;
}
