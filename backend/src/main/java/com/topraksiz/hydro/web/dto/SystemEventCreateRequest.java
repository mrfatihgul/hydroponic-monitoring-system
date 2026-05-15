package com.topraksiz.hydro.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SystemEventCreateRequest {

  @NotBlank(message = "Event type is required.")
  private String type;

  @NotBlank(message = "Message is required.")
  private String message;

  @NotBlank(message = "Severity is required.")
  private String severity;
}
