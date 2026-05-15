package com.topraksiz.hydro.service;

import com.topraksiz.hydro.domain.entity.SystemEvent;
import com.topraksiz.hydro.repository.SystemEventRepository;
import com.topraksiz.hydro.service.mapper.DtoMapper;
import com.topraksiz.hydro.web.dto.SystemEventCreateRequest;
import com.topraksiz.hydro.web.dto.SystemEventDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SystemEventService {

  private final SystemEventRepository systemEventRepository;

  @Transactional(readOnly = true)
  public List<SystemEventDto> findAllOrdered() {
    return DtoMapper.systemEvents(systemEventRepository.findAllByOrderByTimestampDesc());
  }

  @Transactional
  public SystemEventDto create(SystemEventCreateRequest request) {
    SystemEvent e = new SystemEvent();
    e.setTimestamp(LocalDateTime.now());
    e.setType(request.getType());
    e.setMessage(request.getMessage());
    e.setSeverity(request.getSeverity());
    SystemEvent saved = systemEventRepository.save(e);
    return DtoMapper.toDto(saved);
  }

  @Transactional
  public void deleteAll() {
    systemEventRepository.deleteAllInBulk();
    systemEventRepository.flush();
  }
}
