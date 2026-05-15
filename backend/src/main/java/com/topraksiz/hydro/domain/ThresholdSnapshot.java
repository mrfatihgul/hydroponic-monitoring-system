package com.topraksiz.hydro.domain;

import com.topraksiz.hydro.domain.entity.ThresholdSetting;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ThresholdSnapshot {

  double phMin;
  double phMax;
  double ecMin;
  double ecMax;
  double temperatureMin;
  double temperatureMax;
  double humidityMin;
  double humidityMax;
  double waterLevelMin;
  double waterLevelMax;

  public static ThresholdSnapshot fromEntities(List<ThresholdSetting> rows) {
    Map<String, ThresholdSetting> byMetric = new java.util.HashMap<>();
    for (ThresholdSetting row : rows) {
      byMetric.put(row.getMetricName(), row);
    }
    return ThresholdSnapshot.builder()
        .phMin(require(byMetric, MetricNames.PH).getMinValue())
        .phMax(require(byMetric, MetricNames.PH).getMaxValue())
        .ecMin(require(byMetric, MetricNames.EC).getMinValue())
        .ecMax(require(byMetric, MetricNames.EC).getMaxValue())
        .temperatureMin(require(byMetric, MetricNames.TEMPERATURE).getMinValue())
        .temperatureMax(require(byMetric, MetricNames.TEMPERATURE).getMaxValue())
        .humidityMin(require(byMetric, MetricNames.HUMIDITY).getMinValue())
        .humidityMax(require(byMetric, MetricNames.HUMIDITY).getMaxValue())
        .waterLevelMin(require(byMetric, MetricNames.WATER_LEVEL).getMinValue())
        .waterLevelMax(require(byMetric, MetricNames.WATER_LEVEL).getMaxValue())
        .build();
  }

  private static ThresholdSetting require(Map<String, ThresholdSetting> map, String key) {
    ThresholdSetting row = map.get(key);
    if (row == null) {
      throw new IllegalStateException("Missing threshold setting: " + key);
    }
    return row;
  }
}
