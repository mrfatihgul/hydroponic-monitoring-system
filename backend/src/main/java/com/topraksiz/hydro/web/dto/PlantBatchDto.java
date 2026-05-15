package com.topraksiz.hydro.web.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PlantBatchDto {

  Long id;
  String cropName;
  LocalDate startDate;
  Integer plantCount;
  String notes;
}
