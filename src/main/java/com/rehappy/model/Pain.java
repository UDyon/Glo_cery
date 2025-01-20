package com.rehappy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Pain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId; // 작성자 ID

    @Column(nullable = false)
    private LocalDate painDate; // 통증 발생 날짜

    @Column(nullable = false)
    private String painTime; // 통증 시작 시간

    @Column(nullable = false)
    private int intensity; // 통증 강도 (0~10)

    @Column(nullable = false)
    private String location; // 통증 부위

    @Column(nullable = true)
    private String pattern; // 통증 양상 (예: 날카로움, 둔함)

    private String duration; // 지속 시간 (분/시간)
    private String aggravatingFactors; // 악화 요인
    private String relievingFactors; // 완화 요인
    private String treatmentResponse; // 치료 반응
    private String notes; // 추가 메모
}
