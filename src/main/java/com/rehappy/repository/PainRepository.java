package com.rehappy.repository;

import com.rehappy.model.Pain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PainRepository extends JpaRepository<Pain, Long> {
    List<Pain> findByUserId(Long userId);
}
