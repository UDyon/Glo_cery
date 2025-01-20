package com.rehappy.service;

import com.rehappy.dto.CommentDto;
import com.rehappy.model.Comment;
import com.rehappy.model.Post;
import com.rehappy.Util.JwtUtil;
import com.rehappy.repository.CommentRepository;
import com.rehappy.repository.PostRepository;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, JwtUtil jwtUtil) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.jwtUtil = jwtUtil;
    }

    // 댓글 작성
    public CommentDto createComment(CommentDto commentDto, String token) {
        Long userId = jwtUtil.extractUserId(token);
        String username = jwtUtil.extractUsername(token);

        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + commentDto.getPostId()));

        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .author(userId.toString())
                .authorName(username) // 작성자 이름 설정
                .post(post)
                .createdAt(LocalDateTime.now())
                .build();

        Comment savedComment = commentRepository.save(comment);
        return convertToDto(savedComment);
    }



    // 특정 게시글의 댓글 조회
    public List<CommentDto> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 댓글 삭제
    public void deleteComment(Long commentId, String authorId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));

        if (!comment.getAuthor().equals(authorId)) {
            throw new IllegalArgumentException("You are not authorized to delete this comment.");
        }

        commentRepository.delete(comment);
    }

    private CommentDto convertToDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getAuthor())
                .authorName(comment.getAuthorName())
                .postId(comment.getPost().getId())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
