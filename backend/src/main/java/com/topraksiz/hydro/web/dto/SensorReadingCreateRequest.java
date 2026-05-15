package com.topraksiz.hydro.web.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SensorReadingCreateRequest {

  private LocalDateTime timestamp;

  @NotNull(message = "pH value is required.")
  private Double ph;

  @NotNull(message = "EC value is required.")
  private Double ec;

  @NotNull(message = "Temperature value is required.")
  private Double temperature;

  @NotNull(message = "Humidity value is required.")
  private Double humidity;

  @NotNull(message = "Water level value is required.")
  private Double waterLevel;
}
