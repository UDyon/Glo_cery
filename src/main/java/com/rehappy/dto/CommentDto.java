package com.rehappy.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
    private Long id;
    private String content;
    private String author;
    private String authorName; // 작성자 이름
    private Long postId; // 댓글이 속한 게시글 ID
    private LocalDateTime createdAt;
}
