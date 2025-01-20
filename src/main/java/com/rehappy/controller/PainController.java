package com.rehappy.controller;

import com.rehappy.model.Pain;
import com.rehappy.service.PainService;
import com.rehappy.service.UserService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pains")
public class PainController {

    private final PainService painService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public PainController(PainService painService, JwtUtil jwtUtil, UserService userService) {
        this.painService = painService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Operation(
            summary = "통증 기록 작성",
            description = "사용자가 자신의 통증 기록을 저장합니다. 요청 본문에 아래 데이터를 JSON 형식으로 전달해야 합니다:\n" +
                    "- painDate (문자열): 통증이 발생한 날짜 (형식: yyyy-MM-dd, 예: 2024-11-17)\n" +
                    "- painTime (문자열): 통증이 발생한 시간 (형식: HH:mm, 예: 14:30)\n" +
                    "- intensity (정수): 통증의 강도 (1~10 범위, 예: 7)\n" +
                    "- location (문자열): 통증이 발생한 신체 부위 (예: 어깨)\n" +
                    "- pattern (문자열, 선택적): 통증의 양상 (예: 찌르는 듯한)\n" +
                    "- duration (정수, 선택적): 통증이 지속된 시간 (단위: 분, 예: 30)\n" +
                    "- aggravatingFactors (문자열, 선택적): 통증을 악화시키는 요인 (예: 운동)\n" +
                    "- relievingFactors (문자열, 선택적): 통증을 완화시키는 요인 (예: 휴식)\n" +
                    "- treatmentResponse (문자열, 선택적): 통증 치료에 대한 반응 (예: 진통제로 호전됨)\n\n" +
                    "또한, 'Authorization' 헤더에 JWT 토큰을 포함해야 하며, 형식은 'Bearer {JWT 토큰}'입니다."
    )
    @PostMapping
    public ResponseEntity<?> createPain(
            @RequestBody
            @Parameter(description = "사용자가 작성한 통증 기록 데이터") Pain pain, // `@RequestBody` 설명
            @RequestHeader("Authorization")
            @Parameter(description = "JWT 토큰. 'Bearer ' 접두사와 함께 전달됩니다.") String token // `@RequestHeader` 설명
    )  {
        try {
            // JWT에서 이메일 추출
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            // 이메일로 User ID 조회
            Long userId = userService.getUserIdByEmail(email);

            pain.setUserId(userId); // 작성자 설정
            Pain savedPain = painService.savePain(pain);
            return ResponseEntity.ok(savedPain);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("토큰 검증 실패: " + e.getMessage());
        }
    }

    @Operation(summary = "통증 기록 조회", description = "사용자가 자신의 통증 기록을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getPains(
            @RequestHeader("Authorization") String token) {
        try {
            // JWT에서 이메일 추출
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            // 이메일로 User ID 조회
            Long userId = userService.getUserIdByEmail(email);

            List<Pain> pains = painService.getPainsByUserId(userId);
            return ResponseEntity.ok(pains);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("토큰 검증 실패: " + e.getMessage());
        }
    }

    @Operation(
            summary = "통증 데이터 시각화 데이터 조회(일단 안쓰임)",
            description = "{\n" +
                    "  \"painByDate\": { \"2024-11-17\": 3, \"2024-11-16\": 2 },\n" +
                    "  \"intensityDistribution\": { \"6\": 2, \"8\": 3 },\n" +
                    "  \"painByLocation\": { \"어깨\": 3, \"허리\": 2 },\n" +
                    "  \"averageIntensity\": 7.3\n" +
                    "}"
    )
    @GetMapping("/visualization")
    public ResponseEntity<?> getPainDataForVisualization(
            @RequestHeader("Authorization") String token) {
        try {
            // 사용자 인증
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            Long userId = userService.getUserIdByEmail(email);

            // 통증 기록 조회
            List<Pain> pains = painService.getPainsByUserId(userId);

            // 시각화를 위한 데이터 생성
            Map<String, Object> visualizationData = new HashMap<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // 통증 발생 날짜별 데이터 (LocalDate -> String 변환)
            Map<String, Long> painByDate = pains.stream()
                    .collect(Collectors.groupingBy(
                            pain -> pain.getPainDate().format(formatter), // LocalDate를 String으로 변환
                            Collectors.counting()
                    ));
            visualizationData.put("painByDate", painByDate);

            // 통증 강도 분포
            Map<Integer, Long> intensityDistribution = pains.stream()
                    .collect(Collectors.groupingBy(Pain::getIntensity, Collectors.counting()));
            visualizationData.put("intensityDistribution", intensityDistribution);

            // 통증 발생 부위별 데이터
            Map<String, Long> painByLocation = pains.stream()
                    .collect(Collectors.groupingBy(Pain::getLocation, Collectors.counting()));
            visualizationData.put("painByLocation", painByLocation);

            // 평균 통증 강도 계산
            double averageIntensity = pains.stream()
                    .mapToInt(Pain::getIntensity)
                    .average()
                    .orElse(0.0);
            visualizationData.put("averageIntensity", averageIntensity);

            // 반환
            return ResponseEntity.ok(visualizationData);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("데이터 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Operation(
            summary = "최근 통증 기록 조회",
            description = "최근 통증 기록 5개의 날짜와 강도를 반환합니다."
    )
    @GetMapping("/recent")
    public ResponseEntity<?> getRecentPainRecords(
            @RequestHeader("Authorization") String token) {
        try {
            // 사용자 인증
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            Long userId = userService.getUserIdByEmail(email);

            // 통증 기록 조회
            List<Pain> pains = painService.getPainsByUserId(userId);

            // 통증 기록 정렬 (최근 날짜 기준) 후 상위 5개 선택
            List<Map<String, Object>> recentPains = pains.stream()
                    .sorted((p1, p2) -> p2.getPainDate().compareTo(p1.getPainDate())) // 날짜 내림차순
                    .limit(5) // 상위 5개만 선택
                    .map(pain -> {
                        Map<String, Object> painMap = new HashMap<>();
                        painMap.put("date", pain.getPainDate().toString()); // 날짜
                        painMap.put("intensity", pain.getIntensity());      // 강도
                        return painMap;
                    })
                    .collect(Collectors.toList());

            // 반환
            return ResponseEntity.ok(recentPains);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("데이터 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

}
