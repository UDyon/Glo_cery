package com.rehappy.controller;

import com.rehappy.model.User;
import com.rehappy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "회원가입",
            description = "일반 사용자 및 의료진 회원가입을 처리합니다. 'isDoctor' 플래그를 사용해 의료진 여부를 구분하며, 이메일, 비밀번호, 이름을 입력받습니다. " +
                    "의료진일 경우 병원 이름과 면허 번호를 추가로 입력받을 수 있습니다. (현재는 사용하지 않음). " +
                    "회원가입 후 기본 프로필이 자동으로 생성됩니다."
    )
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody @Parameter(description = "회원가입 요청 정보 (이메일, 비밀번호, 이름)") User user,
            @RequestParam @Parameter(description = "의료진 여부 플래그") boolean isDoctor) {
        User registeredUser = userService.registerUser(user, isDoctor);
        return ResponseEntity.ok(registeredUser);
    }

    @Operation(
            summary = "로그인",
            description = "사용자가 이메일과 비밀번호를 입력해 로그인하고, JWT 토큰을 반환합니다."
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam @Parameter(description = "사용자 이메일 주소") String email,
            @RequestParam @Parameter(description = "사용자 비밀번호") String password,
            HttpServletResponse response) { // HttpServletResponse 추가
        try {
            // JWT 생성
            String token = userService.login(email, password);

            // 쿠키 생성 및 설정
            Cookie cookie = new Cookie("authToken", token);
            cookie.setHttpOnly(false); // JavaScript에서 접근 불가능
            cookie.setSecure(false); // HTTPS 환경에서만 동작
            cookie.setPath("/"); // 전체 경로에서 쿠키 사용
            cookie.setMaxAge(7 * 24 * 60 * 60); // 7일 동안 유효

            // 쿠키를 응답에 추가
            response.addCookie(cookie);

            // 응답 반환 (필요에 따라 메세지 추가 가능)
            return ResponseEntity.ok("로그인 성공!");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }

}
