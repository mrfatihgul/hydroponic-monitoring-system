package com.topraksiz.hydro.web.controller;

import com.topraksiz.hydro.service.SensorReadingService;
import com.topraksiz.hydro.web.dto.SensorReadingCreateRequest;
import com.topraksiz.hydro.web.dto.SensorReadingDto;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sensor-readings")
@RequiredArgsConstructor
public class SensorReadingController {

  private final SensorReadingService sensorReadingService;

  @GetMapping
  public List<SensorReadingDto> list() {
    return sensorReadingService.findAllForDisplay();
  }

  @GetMapping("/latest")
  public ResponseEntity<SensorReadingDto> latest() {
    return sensorReadingService
        .findLatest()
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.noContent().build());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SensorReadingDto create(@Valid @RequestBody SensorReadingCreateRequest request) {
    return sensorReadingService.create(request);
  }

  @DeleteMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteAll() {
    sensorReadingService.deleteAll();
  }
}
