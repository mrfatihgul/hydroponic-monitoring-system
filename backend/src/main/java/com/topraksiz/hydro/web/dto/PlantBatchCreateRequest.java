package com.topraksiz.hydro.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;

@Data
public class PlantBatchCreateRequest {

  @NotBlank(message = "Crop name is required.")
  private String cropName;

  @NotNull(message = "Start date is required.")
  private LocalDate startDate;

  @NotNull(message = "Plant count is required.")
  @Min(value = 0, message = "Plant count cannot be negative.")
  private Integer plantCount;

  private String notes;
}
