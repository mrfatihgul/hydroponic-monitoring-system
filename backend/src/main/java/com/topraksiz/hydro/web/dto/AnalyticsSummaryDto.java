package com.topraksiz.hydro.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnalyticsSummaryDto {

  Double averagePh;
  Double averageEc;
  Double averageTemperature;
  Double averageHumidity;
  Double averageWaterLevel;
  Integer criticalAlertCount;
  Integer stabilityScore;
  Double estimatedDailyWaterUsage;
  Long totalReadingCount;
}
