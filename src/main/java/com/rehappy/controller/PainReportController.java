package com.rehappy.controller;

import com.rehappy.service.OpenAiService;
import com.rehappy.service.PainService;
import com.rehappy.service.UserService;
import com.rehappy.Util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "재료 리스트 생성", description = "작성한 식단을 기반으로 장보기 리스트 생성")
    @PostMapping
    public ResponseEntity<?> generateReportByLocation(
            @RequestBody String menuList // menuList를 요청 본문에서 받음
    ) {
        try {
            // 사용자 인증 및 데이터 조회

            // 부위별 보고서를 생성할 프롬프트 생성
            String prompt = createPromptByLocation(menuList); // menuList를 프롬프트 생성에 사용

            // OpenAI API 호출을 통한 보고서 생성
            String report = openAiService.generateChatGptResponse(prompt);

            // 보고서 반환
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("보고서 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    private String createPromptByLocation(String menuList) {
        StringBuilder prompt = new StringBuilder();

        // 보고서 양식 지정
        prompt.append("메뉴:").append(menuList).append("\n");
        prompt.append("입력한 모든 메뉴를 조리하기 위해 사야할 재료를 알려줘. 재료의 종류를 구분하여 출력해줘.\n");
        prompt.append("장보러 갈 때 살 재료를 알고 싶은 것이기 때문에, 각각의 메뉴마다 구분하여 필요한 재료를 출력하는 것이 아닌 그냥 필요한 모든 재료를 알려줘.\n");
        prompt.append("다음은 원하는 출력 형태의 양식이야. 반드시 이 양식을 준수하여 띄어쓰기 없이 콤마로 구분하여 필요한 모든 재료를 작성해.:\n");
        prompt.append("**육류**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("**해산물**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("**채소**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("**조미료**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("**과일**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("**기타**");
        prompt.append("필요한 모든 재료\n");
        prompt.append("\n");

        // 보고서 요청 마무리
        prompt.append("위 양식에 맞게 각 종류마다 필요한 재료를 작성해. 꼭 다른 사족 없이 양식에 맞춰서만 해야 해.\n");
        prompt.append("아래는 출력 예시야.\n");
        prompt.append("**육류**없음\n");
        prompt.append("**해산물**고등어\n");
        prompt.append("**채소**감자, 무\n");
        prompt.append(" **조미료**고추장, 고추가루\n");
        prompt.append("**과일**없음\n");
        prompt.append("**기타**된장, 참기름\n");

        return prompt.toString();
    }
}
