package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.ChatReqDto;
import com.ssafy.five.controller.dto.res.ChatResDto;
import com.ssafy.five.domain.entity.Chat;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.ChatRepository;
import com.ssafy.five.domain.repository.RoomRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {

    private final ChatRepository chatRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messaging;

    @Transactional
    public void sendMessage(ChatReqDto chatReqDto) {
        Room room = roomRepository.findById(chatReqDto.getRoomId()).orElseThrow(()-> new RuntimeException());
        Users user = userRepository.findByNickname(chatReqDto.getUserName());
        Chat chat = chatReqDto.saveChat(room, user);
        messaging.convertAndSend("sub/chat/room/"+ chat.getRoomId(), new ChatResDto(chat));
    }

    public List<ChatResDto> findAllMessageByRoom(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException());
        List<Chat> allChatByRoomId = chatRepository.findAllByRoomId(room);
        return allChatByRoomId.stream().map(ChatResDto::new).collect(Collectors.toList());
    }

}
