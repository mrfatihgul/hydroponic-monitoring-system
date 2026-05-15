package com.topraksiz.hydro.repository;

import com.topraksiz.hydro.domain.entity.SystemEvent;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SystemEventRepository extends JpaRepository<SystemEvent, Long> {

  List<SystemEvent> findAllByOrderByTimestampDesc();

  @Modifying(clearAutomatically = true)
  @Query("delete from SystemEvent")
  void deleteAllInBulk();
}
