package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.entity.PlantBatch;
import com.topraksiz.hydro.repository.PlantBatchRepository;
import com.topraksiz.hydro.service.exception.ResourceNotFoundException;
import com.topraksiz.hydro.service.mapper.DtoMapper;
import com.topraksiz.hydro.web.dto.PlantBatchCreateRequest;
import com.topraksiz.hydro.web.dto.PlantBatchDto;
import com.topraksiz.hydro.web.dto.PlantBatchUpdateRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlantBatchService {

  private final PlantBatchRepository plantBatchRepository;

  @Transactional(readOnly = true)
  public List<PlantBatchDto> findAll() {
    return DtoMapper.plantBatches(plantBatchRepository.findAll());
  }

  @Transactional
  public PlantBatchDto create(PlantBatchCreateRequest request) {
    PlantBatch entity = new PlantBatch();
    apply(entity, request.getCropName(), request.getStartDate(), request.getPlantCount(), request.getNotes());
    PlantBatch saved = plantBatchRepository.save(entity);
    return DtoMapper.toDto(saved);
  }

  @Transactional
  public PlantBatchDto update(Long id, PlantBatchUpdateRequest request) {
    PlantBatch entity =
        plantBatchRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
    apply(entity, request.getCropName(), request.getStartDate(), request.getPlantCount(), request.getNotes());
    return DtoMapper.toDto(plantBatchRepository.save(entity));
  }

  @Transactional
  public void delete(Long id) {
    if (!plantBatchRepository.existsById(id)) {
      throw new ResourceNotFoundException("Batch not found.");
    }
    plantBatchRepository.deleteById(id);
  }

  private static void apply(
      PlantBatch entity, String cropName, java.time.LocalDate startDate, Integer plantCount, String notes) {
    entity.setCropName(cropName);
    entity.setStartDate(startDate);
    entity.setPlantCount(plantCount);
    entity.setNotes(notes == null ? "" : notes);
  }
}
