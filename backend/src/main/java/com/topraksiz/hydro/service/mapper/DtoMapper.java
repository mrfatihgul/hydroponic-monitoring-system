package com.topraksiz.hydro.service.mapper;

import com.topraksiz.hydro.domain.entity.PlantBatch;
import com.topraksiz.hydro.domain.entity.SensorReading;
import com.topraksiz.hydro.domain.entity.SystemEvent;
import com.topraksiz.hydro.domain.entity.ThresholdSetting;
import com.topraksiz.hydro.web.dto.PlantBatchDto;
import com.topraksiz.hydro.web.dto.SensorReadingDto;
import com.topraksiz.hydro.web.dto.SystemEventDto;
import com.topraksiz.hydro.web.dto.ThresholdSettingDto;
import java.util.List;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DtoMapper {

  public SensorReadingDto toDto(SensorReading e) {
    return SensorReadingDto.builder()
        .id(e.getId())
        .timestamp(e.getTimestamp())
        .ph(e.getPh())
        .ec(e.getEc())
        .temperature(e.getTemperature())
        .humidity(e.getHumidity())
        .waterLevel(e.getWaterLevel())
        .build();
  }

  public PlantBatchDto toDto(PlantBatch e) {
    return PlantBatchDto.builder()
        .id(e.getId())
        .cropName(e.getCropName())
        .startDate(e.getStartDate())
        .plantCount(e.getPlantCount())
        .notes(e.getNotes())
        .build();
  }

  public ThresholdSettingDto toDto(ThresholdSetting e) {
    return ThresholdSettingDto.builder()
        .id(e.getId())
        .metricName(e.getMetricName())
        .minValue(e.getMinValue())
        .maxValue(e.getMaxValue())
        .unit(e.getUnit())
        .build();
  }

  public SystemEventDto toDto(SystemEvent e) {
    return SystemEventDto.builder()
        .id(e.getId())
        .timestamp(e.getTimestamp())
        .type(e.getType())
        .message(e.getMessage())
        .severity(e.getSeverity())
        .build();
  }

  public List<SensorReadingDto> sensorReadings(List<SensorReading> list) {
    return list.stream().map(DtoMapper::toDto).toList();
  }

  public List<PlantBatchDto> plantBatches(List<PlantBatch> list) {
    return list.stream().map(DtoMapper::toDto).toList();
  }

  public List<ThresholdSettingDto> thresholds(List<ThresholdSetting> list) {
    return list.stream().map(DtoMapper::toDto).toList();
  }

  public List<SystemEventDto> systemEvents(List<SystemEvent> list) {
    return list.stream().map(DtoMapper::toDto).toList();
  }
}
