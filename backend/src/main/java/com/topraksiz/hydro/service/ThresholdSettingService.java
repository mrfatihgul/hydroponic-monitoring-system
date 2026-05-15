package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.entity.ThresholdSetting;
import com.topraksiz.hydro.repository.ThresholdSettingRepository;
import com.topraksiz.hydro.service.exception.ResourceNotFoundException;
import com.topraksiz.hydro.service.mapper.DtoMapper;
import com.topraksiz.hydro.web.dto.ThresholdSettingDto;
import com.topraksiz.hydro.web.dto.ThresholdSettingUpdateRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ThresholdSettingService {

  private final ThresholdSettingRepository thresholdSettingRepository;
  private final DefaultThresholdFactory defaultThresholdFactory;

  @Transactional(readOnly = true)
  public List<ThresholdSettingDto> findAll() {
    return DtoMapper.thresholds(thresholdSettingRepository.findAll());
  }

  @Transactional
  public ThresholdSettingDto update(Long id, ThresholdSettingUpdateRequest request) {
    ThresholdSetting entity =
        thresholdSettingRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Threshold setting not found."));
    if (request.getMinValue() >= request.getMaxValue()) {
      throw new IllegalArgumentException("Minimum must be less than maximum.");
    }
    entity.setMinValue(request.getMinValue());
    entity.setMaxValue(request.getMaxValue());
    return DtoMapper.toDto(thresholdSettingRepository.save(entity));
  }

  @Transactional
  public void resetToDefaults() {
    for (ThresholdSetting def : defaultThresholdFactory.buildDefaultRows()) {
      ThresholdSetting existing =
          thresholdSettingRepository
              .findByMetricName(def.getMetricName())
              .orElseThrow(() -> new IllegalStateException("Missing default threshold row: " + def.getMetricName()));
      existing.setMinValue(def.getMinValue());
      existing.setMaxValue(def.getMaxValue());
      existing.setUnit(def.getUnit());
      thresholdSettingRepository.save(existing);
    }
  }
}
