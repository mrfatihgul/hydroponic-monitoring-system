package com.topraksiz.hydro.domain.evaluation;

import com.topraksiz.hydro.domain.ThresholdSnapshot;
import com.topraksiz.hydro.domain.entity.SensorReading;
import lombok.Getter;

public final class ReadingEvaluator {

  private static final double PH_MARGIN = 0.12;
  private static final double EC_MARGIN = 0.12;
  private static final double TEMP_MARGIN = 1.2;
  private static final double HUM_MARGIN = 4.0;
  private static final double WATER_MARGIN = 6.0;

  private ReadingEvaluator() {}

  public static BandStatus worst(BandStatus a, BandStatus b) {
    return a.ordinal() >= b.ordinal() ? a : b;
  }

  public static BandStatus statusForRange(double value, double min, double max, double margin) {
    if (value < min || value > max) {
      return BandStatus.CRITICAL;
    }
    if (value < min + margin || value > max - margin) {
      return BandStatus.WARNING;
    }
    return BandStatus.NORMAL;
  }

  public static OverallEvaluation evaluate(SensorReading reading, ThresholdSnapshot t) {
    BandStatus ph =
        statusForRange(reading.getPh(), t.getPhMin(), t.getPhMax(), PH_MARGIN);
    BandStatus ec =
        statusForRange(reading.getEc(), t.getEcMin(), t.getEcMax(), EC_MARGIN);
    BandStatus temp =
        statusForRange(
            reading.getTemperature(), t.getTemperatureMin(), t.getTemperatureMax(), TEMP_MARGIN);
    BandStatus hum =
        statusForRange(reading.getHumidity(), t.getHumidityMin(), t.getHumidityMax(), HUM_MARGIN);
    BandStatus water =
        statusForRange(
            reading.getWaterLevel(), t.getWaterLevelMin(), t.getWaterLevelMax(), WATER_MARGIN);

    BandStatus overall = worst(worst(worst(worst(ph, ec), temp), hum), water);
    return new OverallEvaluation(overall);
  }

  public enum BandStatus {
    NORMAL,
    WARNING,
    CRITICAL
  }

  @Getter
  public static final class OverallEvaluation {
    private final BandStatus overall;

    public OverallEvaluation(BandStatus overall) {
      this.overall = overall;
    }
  }
}
