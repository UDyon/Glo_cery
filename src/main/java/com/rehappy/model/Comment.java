package com.rehappy.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 댓글 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post; // 게시글과 연관 관계

    @Column(nullable = false)
    private String content; // 댓글 내용

    @Column(nullable = false)
    private String author; // 댓글 작성자 ID

    @Column(nullable = false)
    private String authorName; // 작성자의 이름

    @Column(nullable = false)
    private LocalDateTime createdAt; // 생성 일자
}
