package com.topraksiz.hydro.repository;

import com.topraksiz.hydro.domain.entity.SensorReading;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {

  List<SensorReading> findAllByOrderByTimestampAsc();

  List<SensorReading> findAllByOrderByTimestampDesc(Pageable pageable);

  @Modifying(clearAutomatically = true)
  @Query("delete from SensorReading")
  void deleteAllInBulk();
}
