package com.topraksiz.hydro.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "threshold_settings")
@Getter
@Setter
public class ThresholdSetting {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 64)
  private String metricName;

  @Column(nullable = false)
  private Double minValue;

  @Column(nullable = false)
  private Double maxValue;

  @Column(nullable = false, length = 32)
  private String unit;
}
