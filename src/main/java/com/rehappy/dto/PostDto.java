package com.rehappy.dto;

import com.rehappy.model.Post.Category;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String authorName;
    private Category category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
