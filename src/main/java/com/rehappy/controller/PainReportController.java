package com.rehappy.controller;

import com.rehappy.model.Pain;
import com.rehappy.service.OpenAiService;
import com.rehappy.service.PainService;
import com.rehappy.service.UserService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@SecurityRequirement(name = "BearerAuth")
@RequestMapping("/api/reports")
public class PainReportController {

    private final PainService painService;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final OpenAiService openAiService;

    public PainReportController(PainService painService, JwtUtil jwtUtil, UserService userService, OpenAiService openAiService) {
        this.painService = painService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.openAiService = openAiService;
    }

    @Operation(summary = "부위별 통증 보고서 생성", description = "특정 통증 부위를 기반으로 보고서 생성")
    @PostMapping("/{location}")
    public ResponseEntity<?> generateReportByLocation(
            @RequestHeader("Authorization") String token,
            @PathVariable String location) {
        try {
            // 사용자 인증 및 데이터 조회
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            Long userId = userService.getUserIdByEmail(email);
            List<Pain> pains = painService.getPainsByUserId(userId);

            // 특정 부위의 통증 기록 필터링
            List<Pain> filteredPains = pains.stream()
                    .filter(pain -> pain.getLocation().equalsIgnoreCase(location))
                    .collect(Collectors.toList());

            // 부위별 보고서를 생성할 프롬프트 생성
            String prompt = createPromptByLocation(filteredPains, location, email);

            // OpenAI API 호출을 통한 보고서 생성
            String report = openAiService.generateChatGptResponse(prompt);

            // 보고서 반환
            return ResponseEntity.ok(report);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("보고서 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    private String createPromptByLocation(List<Pain> pains, String location, String userEmail) {
        StringBuilder prompt = new StringBuilder();

        // 보고서 양식 지정
        prompt.append("다음은 특정 부위의 통증 관리 보고서를 작성하는 데 사용할 양식입니다. 반드시 이 양식을 준수하여 작성하세요:\n");
        prompt.append("**제목: [입력된 통증 부위] 보고서**");
        prompt.append("**1. 사용자 정보:**\n");
        prompt.append("   - 사용자 이메일: [사용자 이메일]\n");
        prompt.append("\n");
        prompt.append("**2. 통증 기록 요약:\n**");
        prompt.append("   - 부위: [부위]\n");
        prompt.append("   - 총 통증 기록 수: [총 개수]건\n");
        prompt.append("   - 평균 통증 강도: [평균 강도] (10점 만점)\n");
        prompt.append("\n");
        prompt.append("**3. 상세 통증 기록:**\n");
        prompt.append("   - 날짜: [날짜], 시간: [시간]\n");
        prompt.append("     강도: [강도], 양상: [양상]\n");
        prompt.append("     지속 시간: [지속 시간]\n");
        prompt.append("     악화 요인: [악화 요인]\n");
        prompt.append("     완화 요인: [완화 요인]\n");
        prompt.append("     치료 반응: [치료 반응]\n");
        prompt.append("\n");
        prompt.append("**4.통증에 대한 추이.**\n");
        prompt.append("통증에 대한 추이 설명\n");
        prompt.append("\n");
        prompt.append("**5. 통증 관리 팁 및 치료 방향성:**\n");
        prompt.append("   - 해당 부위에 적합한 스트레칭 및 운동 방법.\n");
        prompt.append("   - 악화 요인을 줄이고 예방할 방법.\n");
        prompt.append("\n");

        // 필터링된 기록이 없을 경우 처리
        if (pains.isEmpty()) {
            prompt.append("입력된 부위(").append(location).append(")에 대한 통증 기록이 없습니다.\n");
            return prompt.toString();
        }

        // 사용자 정보
        prompt.append("사용자 이메일: ").append(userEmail).append("\n");
        prompt.append("부위: ").append(location).append("\n\n");

        // 통증 기록 요약
        prompt.append("통증 기록 요약:\n");
        prompt.append("- 총 통증 기록 수: ").append(pains.size()).append("건\n");

        // 평균 통증 강도 계산
        double averageIntensity = pains.stream()
                .mapToInt(Pain::getIntensity)
                .average()
                .orElse(0.0);
        prompt.append("- 평균 통증 강도: ").append(String.format("%.1f", averageIntensity)).append(" (10점 만점)\n\n");

        // 상세 통증 기록
        prompt.append("상세 통증 기록:\n");
        for (Pain pain : pains) {
            prompt.append("- 날짜: ").append(pain.getPainDate()).append(", 시간: ").append(pain.getPainTime()).append("\n");
            prompt.append("  강도: ").append(pain.getIntensity()).append(", 양상: ").append(pain.getPattern() != null ? pain.getPattern() : "정보 없음").append("\n");
            prompt.append("  지속 시간: ").append(pain.getDuration() != null ? pain.getDuration() : "정보 없음").append("\n");
            prompt.append("  악화 요인: ").append(pain.getAggravatingFactors() != null ? pain.getAggravatingFactors() : "정보 없음").append("\n");
            prompt.append("  완화 요인: ").append(pain.getRelievingFactors() != null ? pain.getRelievingFactors() : "정보 없음").append("\n");
            prompt.append("  치료 반응: ").append(pain.getTreatmentResponse() != null ? pain.getTreatmentResponse() : "정보 없음").append("\n\n");
        }

        // 보고서 요청 마무리
        prompt.append("위 정보를 바탕으로 통증 관리 팁, 치료 방향성, 악화 요인을 줄이는 방법 등을 포함한 종합적인 보고서를 작성해 주세요.");

        return prompt.toString();
    }
}
