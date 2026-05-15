package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.MetricNames;
import com.topraksiz.hydro.domain.entity.ThresholdSetting;
import com.topraksiz.hydro.repository.ThresholdSettingRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class DefaultThresholdFactory {

  public List<ThresholdSetting> buildDefaultRows() {
    List<ThresholdSetting> list = new ArrayList<>();
    list.add(row(MetricNames.PH, 5.5, 6.5, "pH"));
    list.add(row(MetricNames.EC, 0.8, 2.0, "mS/cm"));
    list.add(row(MetricNames.TEMPERATURE, 18.0, 28.0, "C"));
    list.add(row(MetricNames.HUMIDITY, 45.0, 75.0, "%"));
    list.add(row(MetricNames.WATER_LEVEL, 30.0, 100.0, "%"));
    return list;
  }

  public void insertAllDefaults(ThresholdSettingRepository repository) {
    repository.saveAll(buildDefaultRows());
  }

  private static ThresholdSetting row(String metric, double min, double max, String unit) {
    ThresholdSetting t = new ThresholdSetting();
    t.setMetricName(metric);
    t.setMinValue(min);
    t.setMaxValue(max);
    t.setUnit(unit);
    return t;
  }
}
