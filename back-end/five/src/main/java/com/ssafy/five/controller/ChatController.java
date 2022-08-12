package com.ssafy.five.controller;


import com.ssafy.five.controller.dto.req.ChatReqDto;
import com.ssafy.five.domain.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ChatController {

    public final ChatService chatService;


    @MessageMapping("/chat/message")
    public void message(@RequestBody ChatReqDto message) {
        chatService.saveChat(message);
    }

    @GetMapping("/chat/message/user/{userId}")
    public ResponseEntity<?> findAllUserMessage(@PathVariable String userId) {
        Map<String, ?> response = chatService.findByUserId(userId);
        if (response.get("result").equals(false)) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(401));
        } else {
            return new ResponseEntity<>(response.get("result"), HttpStatus.OK);
        }
    }
}
