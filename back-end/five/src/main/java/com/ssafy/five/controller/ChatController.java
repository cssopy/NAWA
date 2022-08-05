package com.ssafy.five.controller;


import com.ssafy.five.controller.dto.req.ChatReqDto;
import com.ssafy.five.controller.dto.res.ChatResDto;
import com.ssafy.five.domain.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat/message")
public class ChatController {

    private final ChatService chatService;

    @MessageMapping
    public void sendMessage(@RequestBody ChatReqDto chatReqDto) {
        chatService.sendMessage(chatReqDto);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> findAllMessageByRoom(@PathVariable Long roomId) {
        return new ResponseEntity<List<ChatResDto>>(chatService.findAllMessageByRoom(roomId), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllMessageByUser(@PathVariable String userId) {
        return new ResponseEntity<List<ChatResDto>>(chatService.findAllMessageByUser(userId), HttpStatus.OK);
    }

}
