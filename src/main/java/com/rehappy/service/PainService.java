package com.rehappy.service;

import com.rehappy.model.Pain;
import com.rehappy.repository.PainRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PainService {

    private final PainRepository painRepository;

    public PainService(PainRepository painRepository) {
        this.painRepository = painRepository;
    }

    // 통증 기록 저장
    public Pain savePain(Pain pain) {
        return painRepository.save(pain);
    }

    // 특정 사용자의 통증 기록 조회
    public List<Pain> getPainsByUserId(Long userId) {
        return painRepository.findByUserId(userId);
    }
}
