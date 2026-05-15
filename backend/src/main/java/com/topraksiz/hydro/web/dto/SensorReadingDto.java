package com.topraksiz.hydro.web.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SensorReadingDto {

  Long id;
  LocalDateTime timestamp;
  Double ph;
  Double ec;
  Double temperature;
  Double humidity;
  Double waterLevel;
}
