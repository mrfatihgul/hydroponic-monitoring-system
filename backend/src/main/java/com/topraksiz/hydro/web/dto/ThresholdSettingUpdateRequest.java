package com.topraksiz.hydro.web.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ThresholdSettingUpdateRequest {

  @NotNull(message = "Minimum value is required.")
  private Double minValue;

  @NotNull(message = "Maximum value is required.")
  private Double maxValue;
}
