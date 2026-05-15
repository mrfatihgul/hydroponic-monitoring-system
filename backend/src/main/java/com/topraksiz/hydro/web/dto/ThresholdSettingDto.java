package com.topraksiz.hydro.web.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ThresholdSettingDto {

  Long id;
  String metricName;
  Double minValue;
  Double maxValue;
  String unit;
}
