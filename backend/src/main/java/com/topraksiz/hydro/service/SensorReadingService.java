package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.entity.SensorReading;
import com.topraksiz.hydro.repository.SensorReadingRepository;
import com.topraksiz.hydro.service.mapper.DtoMapper;
import com.topraksiz.hydro.web.dto.SensorReadingCreateRequest;
import com.topraksiz.hydro.web.dto.SensorReadingDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SensorReadingService {

  private static final int MAX_POINTS = 500;

  private final SensorReadingRepository sensorReadingRepository;

  @Transactional(readOnly = true)
  public List<SensorReadingDto> findAllForDisplay() {
    long total = sensorReadingRepository.count();
    if (total <= MAX_POINTS) {
      return DtoMapper.sensorReadings(sensorReadingRepository.findAllByOrderByTimestampAsc());
    }
    List<SensorReading> lastDesc =
        sensorReadingRepository.findAllByOrderByTimestampDesc(PageRequest.of(0, MAX_POINTS));
    List<SensorReading> asc = new ArrayList<>(lastDesc);
    asc.sort((a, b) -> a.getTimestamp().compareTo(b.getTimestamp()));
    return DtoMapper.sensorReadings(asc);
  }

  @Transactional(readOnly = true)
  public Optional<SensorReadingDto> findLatest() {
    List<SensorReading> all = sensorReadingRepository.findAllByOrderByTimestampDesc(PageRequest.of(0, 1));
    if (all.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(DtoMapper.toDto(all.get(0)));
  }

  @Transactional
  public SensorReadingDto create(SensorReadingCreateRequest request) {
    LocalDateTime ts = request.getTimestamp() != null ? request.getTimestamp() : LocalDateTime.now();
    SensorReading entity = new SensorReading();
    entity.setTimestamp(ts);
    entity.setPh(request.getPh());
    entity.setEc(request.getEc());
    entity.setTemperature(request.getTemperature());
    entity.setHumidity(request.getHumidity());
    entity.setWaterLevel(request.getWaterLevel());
    SensorReading saved = sensorReadingRepository.save(entity);
    return DtoMapper.toDto(saved);
  }

  @Transactional
  public void deleteAll() {
    sensorReadingRepository.deleteAllInBulk();
    sensorReadingRepository.flush();
  }
}
