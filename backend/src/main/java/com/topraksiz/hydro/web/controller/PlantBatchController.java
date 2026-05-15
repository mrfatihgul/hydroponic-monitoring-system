package com.topraksiz.hydro.web.controller;

import com.topraksiz.hydro.service.PlantBatchService;
import com.topraksiz.hydro.web.dto.PlantBatchCreateRequest;
import com.topraksiz.hydro.web.dto.PlantBatchDto;
import com.topraksiz.hydro.web.dto.PlantBatchUpdateRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plant-batches")
@RequiredArgsConstructor
public class PlantBatchController {

  private final PlantBatchService plantBatchService;

  @GetMapping
  public List<PlantBatchDto> list() {
    return plantBatchService.findAll();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PlantBatchDto create(@Valid @RequestBody PlantBatchCreateRequest request) {
    return plantBatchService.create(request);
  }

  @PutMapping("/{id}")
  public PlantBatchDto update(@PathVariable Long id, @Valid @RequestBody PlantBatchUpdateRequest request) {
    return plantBatchService.update(id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    plantBatchService.delete(id);
  }
}
