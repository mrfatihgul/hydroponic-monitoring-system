package com.topraksiz.hydro.bootstrap;

import com.topraksiz.hydro.domain.EventSeverity;
import com.topraksiz.hydro.domain.EventTypes;
import com.topraksiz.hydro.domain.entity.PlantBatch;
import com.topraksiz.hydro.domain.entity.SensorReading;
import com.topraksiz.hydro.domain.entity.SystemEvent;
import com.topraksiz.hydro.repository.PlantBatchRepository;
import com.topraksiz.hydro.repository.SensorReadingRepository;
import com.topraksiz.hydro.repository.SystemEventRepository;
import com.topraksiz.hydro.repository.ThresholdSettingRepository;
import com.topraksiz.hydro.service.DefaultThresholdFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Order(1)
@RequiredArgsConstructor
@Profile("!test")
public class DataSeeder implements CommandLineRunner {

  private final ThresholdSettingRepository thresholdSettingRepository;
  private final PlantBatchRepository plantBatchRepository;
  private final SensorReadingRepository sensorReadingRepository;
  private final SystemEventRepository systemEventRepository;
  private final DefaultThresholdFactory defaultThresholdFactory;

  @Override
  @Transactional
  public void run(String... args) {
    if (thresholdSettingRepository.count() > 0) {
      return;
    }
    defaultThresholdFactory.insertAllDefaults(thresholdSettingRepository);

    PlantBatch b1 = new PlantBatch();
    b1.setCropName("Lettuce");
    b1.setStartDate(LocalDate.of(2026, 5, 1));
    b1.setPlantCount(30);
    b1.setNotes("NFT channel trial crop");
    plantBatchRepository.save(b1);

    PlantBatch b2 = new PlantBatch();
    b2.setCropName("Arugula");
    b2.setStartDate(LocalDate.of(2026, 5, 10));
    b2.setPlantCount(48);
    b2.setNotes("Second batch");
    plantBatchRepository.save(b2);

    seedSensorHistory();
    seedEvents();
  }

  private void seedSensorHistory() {
    ThreadLocalRandom rnd = ThreadLocalRandom.current();
    double ph = 5.9;
    double ec = 1.2;
    double temp = 22.0;
    double hum = 58.0;
    double water = 72.0;
    LocalDateTime t = LocalDateTime.now().minusHours(6);
    for (int i = 0; i < 48; i++) {
      ph = clamp(ph + rnd.nextDouble(-0.08, 0.08), 5.2, 6.8);
      ec = clamp(ec + rnd.nextDouble(-0.05, 0.05), 0.6, 2.2);
      temp = clamp(temp + rnd.nextDouble(-0.4, 0.4), 17.0, 29.0);
      hum = clamp(hum + rnd.nextDouble(-1.2, 1.2), 40.0, 80.0);
      water = clamp(water + rnd.nextDouble(-1.5, 1.5), 25.0, 98.0);
      t = t.plusMinutes(7);
      SensorReading r = new SensorReading();
      r.setTimestamp(t);
      r.setPh(ph);
      r.setEc(ec);
      r.setTemperature(temp);
      r.setHumidity(hum);
      r.setWaterLevel(water);
      sensorReadingRepository.save(r);
    }
  }

  private static double clamp(double v, double min, double max) {
    return Math.max(min, Math.min(max, v));
  }

  private void seedEvents() {
    LocalDateTime now = LocalDateTime.now();
    addEvent(now.minusMinutes(40), EventTypes.SYSTEM, EventSeverity.INFO, "Sample event: system started.");
    addEvent(now.minusMinutes(25), EventTypes.THRESHOLD, EventSeverity.WARNING, "Sample event: temperature in warning band.");
    addEvent(now.minusMinutes(10), EventTypes.THRESHOLD, EventSeverity.CRITICAL, "Sample event: pH outside critical limits.");
    addEvent(now.minusMinutes(5), EventTypes.OPERATOR, EventSeverity.SYSTEM, "Sample event: operator note.");
  }

  private void addEvent(LocalDateTime ts, String type, String severity, String message) {
    SystemEvent e = new SystemEvent();
    e.setTimestamp(ts);
    e.setType(type);
    e.setSeverity(severity);
    e.setMessage(message);
    systemEventRepository.save(e);
  }
}
