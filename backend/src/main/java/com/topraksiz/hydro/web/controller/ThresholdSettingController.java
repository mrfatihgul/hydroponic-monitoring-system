package com.topraksiz.hydro.web.controller;

import com.topraksiz.hydro.service.ThresholdSettingService;
import com.topraksiz.hydro.web.dto.ThresholdSettingDto;
import com.topraksiz.hydro.web.dto.ThresholdSettingUpdateRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/threshold-settings")
@RequiredArgsConstructor
public class ThresholdSettingController {

  private final ThresholdSettingService thresholdSettingService;

  @GetMapping
  public List<ThresholdSettingDto> list() {
    return thresholdSettingService.findAll();
  }

  @PutMapping("/{id}")
  public ThresholdSettingDto update(
      @PathVariable Long id, @Valid @RequestBody ThresholdSettingUpdateRequest request) {
    return thresholdSettingService.update(id, request);
  }

  @PostMapping("/reset-defaults")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void resetDefaults() {
    thresholdSettingService.resetToDefaults();
  }
}
