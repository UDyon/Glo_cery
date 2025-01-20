package com.rehappy.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 게시글 ID

    @Column(nullable = false)
    private String title; // 제목

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 내용

    @Column(nullable = false)
    private String author; // 작성자 id

    @Column(nullable = false)
    private String authorName; // 작성자의 이름

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category; // 카테고리

    @Column(nullable = false)
    private LocalDateTime createdAt; // 생성일자

    @Column(nullable = false)
    private LocalDateTime updatedAt; // 수정일자

    public enum Category {
        PAIN_TIPS,          // 통증 관리 팁
        DISEASE_INFO,       // 질병 및 통증 정보
        TREATMENT_EXPERIENCE, // 치료 및 재활 경험
        HOSPITAL_REVIEW,    // 병원 리뷰
        HEALTH_CONSULTING   // 건강 상담
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}
