package com.rehappy.controller;

import com.rehappy.dto.PostDto;
import com.rehappy.model.Post.Category;
import com.rehappy.service.PostService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final JwtUtil jwtUtil;

    public PostController(PostService postService, JwtUtil jwtUtil) {
        this.postService = postService;
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "전체 게시글 조회", description = "모든 게시글의 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 목록 조회 성공")
    })
    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @Operation(summary = "카테고리별 게시글 조회", description = "특정 카테고리의 게시글 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "카테고리별 게시글 목록 조회 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 카테고리 요청")
    })
    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostDto>> getPostsByCategory(
            @Parameter(description = "조회할 카테고리", example = "PAIN_TIPS") @PathVariable Category category) {
        return ResponseEntity.ok(postService.getPostsByCategory(category));
    }

    @Operation(summary = "게시글 상세 조회", description = "ID를 기반으로 특정 게시글의 상세 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 상세 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시글을 찾을 수 없음")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(
            @Parameter(description = "조회할 게시글의 ID", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @Operation(summary = "게시글 생성", description = "새로운 게시글을 작성합니다. 작성자는 JWT 토큰에서 추출됩니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "게시글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 입력값")
    })
    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto, HttpServletRequest request) {
        // JWT 토큰 추출
        String token = resolveToken(request);
        // Service에 PostDto와 토큰 전달
        return ResponseEntity.ok(postService.createPost(postDto, token));
    }

    @Operation(summary = "게시글 수정", description = "기존 게시글의 내용을 수정합니다. 작성자만 수정할 수 있습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 수정 성공"),
            @ApiResponse(responseCode = "403", description = "수정 권한 없음"),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시글을 찾을 수 없음")
    })
    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(
            @Parameter(description = "수정할 게시글의 ID", example = "1") @PathVariable Long id,
            @RequestBody PostDto postDto,
            @Parameter(hidden = true) HttpServletRequest request) {
        String token = resolveToken(request);
        Long userId = jwtUtil.extractUserId(token);
        postDto.setAuthor(userId.toString());
        return ResponseEntity.ok(postService.updatePost(id, postDto, request));
    }

    @Operation(summary = "게시글 삭제", description = "ID를 기반으로 게시글을 삭제합니다. 작성자만 삭제할 수 있습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "게시글 삭제 성공"),
            @ApiResponse(responseCode = "403", description = "삭제 권한 없음"),
            @ApiResponse(responseCode = "404", description = "해당 ID의 게시글을 찾을 수 없음")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @Parameter(description = "삭제할 게시글의 ID", example = "1") @PathVariable Long id,
            @Parameter(hidden = true) HttpServletRequest request) {
        String token = resolveToken(request);
        Long userId = jwtUtil.extractUserId(token);
        postService.deletePost(id, request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "게시글 검색", description = "제목과 내용에 키워드를 포함하는 게시글을 검색합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "검색 결과 반환 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @GetMapping("/search")
    public ResponseEntity<List<PostDto>> searchPosts(
            @Parameter(description = "검색 키워드", example = "통증 관리") @RequestParam String keyword) {
        return ResponseEntity.ok(postService.searchPosts(keyword));
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
