package com.rehappy.controller;

import com.rehappy.dto.ProfileCreationDto;
import com.rehappy.dto.ProfileDto;
import com.rehappy.model.User;
import com.rehappy.service.ProfileService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;
    private final JwtUtil jwtUtil;

    public ProfileController(ProfileService profileService, JwtUtil jwtUtil) {
        this.profileService = profileService;
        this.jwtUtil = jwtUtil;
    }

    @Operation(
            summary = "사용자 프로필 목록 조회",
            description = "현재 로그인된 사용자의 모든 프로필을 조회합니다. 'Authorization' 헤더에 JWT 토큰을 포함해야 합니다."
    )
    @GetMapping("/parent/users")
    public ResponseEntity<List<ProfileDto>> getProfilesByParentUser(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        List<ProfileDto> profiles = profileService.getProfilesByParentUser(email);
        return ResponseEntity.ok(profiles);
    }

    @Operation(
            summary = "새 프로필 생성",
            description = "현재 로그인된 사용자에 대해 새로운 프로필을 생성합니다. 프로필 이름과 새로운 사용자 정보를 입력받아 생성합니다. " +
                    "요청 본문(JSON 형식) 예시:\n" +
                    "{\n" +
                    "  \"profileName\": \"새 프로필\",\n" +
                    "  \"username\": \"새 사용자\",\n" +
                    "  \"email\": \"newuser@example.com\",\n" +
                    "  \"password\": \"password123\"\n" +
                    "}"
    )
    @PostMapping
    public ResponseEntity<?> createProfile(
            @Parameter(description = "프로필 생성에 필요한 데이터 (JSON 형식).")
            @RequestBody ProfileCreationDto dto,
            @Parameter(description = "JWT 토큰. 'Bearer {token}' 형식으로 전달.")
            @RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        profileService.createProfile(dto, email);
        return ResponseEntity.ok("프로필이 성공적으로 생성되었습니다.");
    }

    @Operation(
            summary = "프로필 선택 및 로그인",
            description = "사용자가 특정 프로필을 선택하고, 해당 프로필에 연결된 사용자로 로그인합니다. " +
                    "선택된 프로필 ID를 전달하여 새 JWT 토큰을 발급받습니다."
    )
    @PostMapping("/select")
    public ResponseEntity<?> selectProfile(
            @RequestParam Long profileId,
            HttpServletResponse response) {
        // 프로필 ID로 로그인하고 JWT 토큰 생성
        String token = profileService.loginWithProfile(profileId);

        // 쿠키 생성 및 설정
        Cookie cookie = new Cookie("authToken", token);
        cookie.setHttpOnly(false); // JavaScript에서 접근 가능
        cookie.setSecure(false);   // HTTPS가 아닌 HTTP에서도 작동
        cookie.setPath("/");       // 모든 경로에서 사용 가능
        cookie.setMaxAge(3600);    // 쿠키 유효기간 (초 단위)

        // 쿠키 추가
        response.addCookie(cookie);

        return ResponseEntity.ok("쿠키에 토큰이 저장되었습니다.");
    }
}
