package com.rehappy.controller;

import com.rehappy.dto.CommentDto;
import com.rehappy.service.CommentService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final JwtUtil jwtUtil;

    public CommentController(CommentService commentService, JwtUtil jwtUtil) {
        this.commentService = commentService;
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "댓글 작성", description = "특정 게시글에 댓글을 작성합니다. JWT 토큰을 통해 작성자 정보를 확인합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "401", description = "인증 실패: 유효하지 않은 JWT 토큰")
    })
    @PostMapping
    public ResponseEntity<CommentDto> createComment(
            @RequestBody CommentDto commentDto,
            @Parameter(hidden = true) HttpServletRequest request) {
        // JWT 토큰 추출
        String token = resolveToken(request);
        // Service에 CommentDto와 토큰 전달
        return ResponseEntity.ok(commentService.createComment(commentDto, token));
    }

    @Operation(summary = "게시글의 댓글 조회", description = "특정 게시글에 작성된 모든 댓글을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글")
    })
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(
            @Parameter(description = "댓글을 조회할 게시글의 ID", example = "1") @PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @Operation(summary = "댓글 삭제", description = "특정 댓글을 삭제합니다. 작성자만 삭제할 수 있습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "댓글 삭제 성공"),
            @ApiResponse(responseCode = "403", description = "권한 없음: 작성자가 아님"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 댓글")
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @Parameter(description = "삭제할 댓글의 ID", example = "1") @PathVariable Long commentId,
            @Parameter(hidden = true) HttpServletRequest request) {
        String token = resolveToken(request);
        Long userId = jwtUtil.extractUserId(token); // 토큰에서 사용자 ID 추출
        commentService.deleteComment(commentId, userId.toString());
        return ResponseEntity.noContent().build();
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
