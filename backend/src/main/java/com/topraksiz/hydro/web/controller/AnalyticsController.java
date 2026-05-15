package com.topraksiz.hydro.web.controller;

import com.topraksiz.hydro.service.AnalyticsService;
import com.topraksiz.hydro.web.dto.AnalyticsSummaryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

  private final AnalyticsService analyticsService;

  @GetMapping("/summary")
  public AnalyticsSummaryDto summary() {
    return analyticsService.summary();
  }
}
