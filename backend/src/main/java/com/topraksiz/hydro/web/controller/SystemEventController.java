package com.topraksiz.hydro.web.controller;

import com.topraksiz.hydro.service.SystemEventService;
import com.topraksiz.hydro.web.dto.SystemEventCreateRequest;
import com.topraksiz.hydro.web.dto.SystemEventDto;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system-events")
@RequiredArgsConstructor
public class SystemEventController {

  private final SystemEventService systemEventService;

  @GetMapping
  public List<SystemEventDto> list() {
    return systemEventService.findAllOrdered();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SystemEventDto create(@Valid @RequestBody SystemEventCreateRequest request) {
    return systemEventService.create(request);
  }

  @DeleteMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteAll() {
    systemEventService.deleteAll();
  }
}
