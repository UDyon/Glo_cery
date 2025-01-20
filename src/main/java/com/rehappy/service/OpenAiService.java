package com.rehappy.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OpenAiService {

    private static final Logger logger = LoggerFactory.getLogger(OpenAiService.class);

    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String apiKey; // OpenAI API Key
    private final String apiUrl = "https://api.openai.com/v1/chat/completions"; // 강제 URL 설정

    public OpenAiService(WebClient.Builder webClientBuilder, @Value("${openai.api.key}") String apiKey) {
        if (apiKey == null || apiKey.isBlank()) {
            System.err.println("API Key is null or not configured"); // 디버깅용 로그
            throw new IllegalStateException("OpenAI API 키가 설정되지 않았습니다.");
        }
        apiKey = apiKey.trim();
        this.webClient = webClientBuilder
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String generateChatGptResponse(String prompt) {
        logger.debug("Prompt: {}", prompt); // Prompt 확인 로그 추가

        var requestBody = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(
                        Map.of("role", "system", "content", "You are a helpful assistant specializing in pain management."),
                        Map.of("role", "user", "content", prompt)
                )
        );

        return webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                })
                .block();
    }
}
