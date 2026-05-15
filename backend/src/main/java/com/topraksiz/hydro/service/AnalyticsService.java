package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.ThresholdSnapshot;
import com.topraksiz.hydro.domain.entity.SensorReading;
import com.topraksiz.hydro.domain.evaluation.ReadingEvaluator;
import com.topraksiz.hydro.domain.evaluation.ReadingEvaluator.BandStatus;
import com.topraksiz.hydro.repository.SensorReadingRepository;
import com.topraksiz.hydro.repository.ThresholdSettingRepository;
import com.topraksiz.hydro.web.dto.AnalyticsSummaryDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

  private static final int ANALYSIS_WINDOW = 24;
  private static final double WATER_ESTIMATE_BASE_L = 8.5;
  private static final double WATER_LEVEL_COEFF = 0.12;
  private static final double TEMP_DEV_COEFF = 0.25;
  private static final double TEMP_REFERENCE_C = 22.0;

  private final SensorReadingRepository sensorReadingRepository;
  private final ThresholdSettingRepository thresholdSettingRepository;

  @Transactional(readOnly = true)
  public AnalyticsSummaryDto summary() {
    List<SensorReading> readings = sensorReadingRepository.findAllByOrderByTimestampAsc();
    long total = readings.size();
    if (total == 0) {
      return AnalyticsSummaryDto.builder()
          .averagePh(null)
          .averageEc(null)
          .averageTemperature(null)
          .averageHumidity(null)
          .averageWaterLevel(null)
          .criticalAlertCount(0)
          .stabilityScore(null)
          .estimatedDailyWaterUsage(null)
          .totalReadingCount(0L)
          .build();
    }

    ThresholdSnapshot thresholds =
        ThresholdSnapshot.fromEntities(thresholdSettingRepository.findAll());

    double sumPh = 0;
    double sumEc = 0;
    double sumTemp = 0;
    double sumHum = 0;
    double sumWater = 0;
    long normalCount = 0;
    for (SensorReading r : readings) {
      sumPh += r.getPh();
      sumEc += r.getEc();
      sumTemp += r.getTemperature();
      sumHum += r.getHumidity();
      sumWater += r.getWaterLevel();
      BandStatus overall = ReadingEvaluator.evaluate(r, thresholds).getOverall();
      if (overall == BandStatus.NORMAL) {
        normalCount++;
      }
    }

    int from = Math.max(0, readings.size() - ANALYSIS_WINDOW);
    List<SensorReading> tail = readings.subList(from, readings.size());
    int criticalInWindow = 0;
    for (SensorReading r : tail) {
      BandStatus overall = ReadingEvaluator.evaluate(r, thresholds).getOverall();
      if (overall == BandStatus.CRITICAL) {
        criticalInWindow++;
      }
    }

    double avgPh = sumPh / total;
    double avgEc = sumEc / total;
    double avgTemp = sumTemp / total;
    double avgHum = sumHum / total;
    double avgWater = sumWater / total;

    int stability = (int) Math.round((normalCount * 100.0) / total);
    stability = Math.max(0, Math.min(100, stability));

    double waterEstimate =
        Math.max(
            0,
            Math.round(
                    (WATER_ESTIMATE_BASE_L
                            + (100 - avgWater) * WATER_LEVEL_COEFF
                            + Math.abs(avgTemp - TEMP_REFERENCE_C) * TEMP_DEV_COEFF)
                        * 10)
                / 10.0);

    return AnalyticsSummaryDto.builder()
        .averagePh(avgPh)
        .averageEc(avgEc)
        .averageTemperature(avgTemp)
        .averageHumidity(avgHum)
        .averageWaterLevel(avgWater)
        .criticalAlertCount(criticalInWindow)
        .stabilityScore(stability)
        .estimatedDailyWaterUsage(waterEstimate)
        .totalReadingCount(total)
        .build();
  }
}
