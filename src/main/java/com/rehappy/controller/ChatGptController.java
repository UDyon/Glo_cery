package com.rehappy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.rehappy.service.OpenAiService;

import java.util.Map;

@RestController
@RequestMapping("/api/chatgpt")
public class ChatGptController {

    @Autowired
    private OpenAiService openAiService;

    @PostMapping("/ask")
    public String askChatGpt(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        return openAiService.generateChatGptResponse(prompt);
    }
}
