package com.topraksiz.hydro.web.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SystemEventDto {

  Long id;
  LocalDateTime timestamp;
  String type;
  String message;
  String severity;
}
