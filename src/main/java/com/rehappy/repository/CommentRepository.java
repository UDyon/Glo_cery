package com.rehappy.repository;

import com.rehappy.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId); // 특정 게시글의 댓글 조회
}
