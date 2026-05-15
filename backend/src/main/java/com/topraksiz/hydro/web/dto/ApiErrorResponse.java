package com.topraksiz.hydro.web.dto;

import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ApiErrorResponse {

  String message;
  List<String> details;
}
