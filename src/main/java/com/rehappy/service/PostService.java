package com.rehappy.service;

import com.rehappy.dto.PostDto;
import com.rehappy.model.Post;
import com.rehappy.model.Post.Category;
import com.rehappy.repository.PostRepository;
import com.rehappy.Util.JwtUtil;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;

    public PostService(PostRepository postRepository, JwtUtil jwtUtil) {
        this.postRepository = postRepository;
        this.jwtUtil = jwtUtil;
    }

    public List<PostDto> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PostDto> getPostsByCategory(Category category) {
        return postRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        return convertToDto(post);
    }

    public PostDto createPost(PostDto postDto, String token) {
        Long userId = jwtUtil.extractUserId(token);
        String username = jwtUtil.extractUsername(token);

        postDto.setAuthor(userId.toString()); // 작성자 ID 설정
        postDto.setAuthorName(username); // 작성자 이름 설정

        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .author(postDto.getAuthor())
                .authorName(postDto.getAuthorName()) // 작성자 이름 저장
                .category(postDto.getCategory())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }


    public PostDto updatePost(Long id, PostDto postDto, HttpServletRequest request) {
        // 토큰에서 사용자 ID 추출
        String token = resolveToken(request);
        Long userId = jwtUtil.extractUserId(token);

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        // 작성자 검증
        if (!post.getAuthor().equals(userId.toString())) {
            throw new IllegalArgumentException("You are not authorized to update this post.");
        }

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setCategory(postDto.getCategory());
        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);
        return convertToDto(updatedPost);
    }

    public void deletePost(Long id, HttpServletRequest request) {
        // 토큰에서 사용자 ID 추출
        String token = resolveToken(request);
        Long userId = jwtUtil.extractUserId(token);

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        // 작성자 검증
        if (!post.getAuthor().equals(userId.toString())) {
            throw new IllegalArgumentException("You are not authorized to delete this post.");
        }

        postRepository.deleteById(id);
    }

    public List<PostDto> searchPosts(String keyword) {
        List<Post> posts = postRepository.searchByTitleOrContent(keyword);
        return posts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    private PostDto convertToDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .authorName(post.getAuthorName())
                .category(post.getCategory())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
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
