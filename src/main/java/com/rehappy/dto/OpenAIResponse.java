package com.rehappy.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OpenAIResponse {
    private List<Choice> choices;

    @Data
    @NoArgsConstructor
    public static class Choice {
        private Message message;

        @Data
        @NoArgsConstructor
        public static class Message {
            private String role;    // 역할: "assistant", "user", etc.
            private String content; // 응답 내용
        }
    }
}
