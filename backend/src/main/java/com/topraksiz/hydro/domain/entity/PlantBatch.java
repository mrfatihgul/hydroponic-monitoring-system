package com.topraksiz.hydro.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "plant_batches")
@Getter
@Setter
public class PlantBatch {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 200)
  private String cropName;

  @Column(nullable = false)
  private LocalDate startDate;

  @Column(nullable = false)
  private Integer plantCount;

  @Column(length = 2000)
  private String notes;
}
