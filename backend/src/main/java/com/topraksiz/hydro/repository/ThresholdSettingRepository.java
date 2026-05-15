package com.topraksiz.hydro.repository;

import com.topraksiz.hydro.domain.entity.ThresholdSetting;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThresholdSettingRepository extends JpaRepository<ThresholdSetting, Long> {

  Optional<ThresholdSetting> findByMetricName(String metricName);
}
