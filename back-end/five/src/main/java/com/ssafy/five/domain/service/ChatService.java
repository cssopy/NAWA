package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.ChatReqDto;
import com.ssafy.five.controller.dto.res.ChatAlertDto;
import com.ssafy.five.controller.dto.res.ChatResDto;
import com.ssafy.five.domain.entity.Chat;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.ChatRepository;
import com.ssafy.five.domain.repository.RoomRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ChatService {

    private final ChatRepository chatRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messaging;


    @Transactional
    public void saveChat(ChatReqDto message) {
        if ("In".equals(message.getChatUserId())) {
            for (Chat chat : chatRepository.findAllByRoomId(roomRepository.findById(message.getRoomId()).get())) {
                if (chat.getIsRead() >= 1 && !chat.getChatUserId().equals(message.getChatContent())) {
                    chat.updateIsRead();
                }
            }
            Map<String, ChatReqDto> data = new HashMap<>();
            data.put("data", message);
            messaging.convertAndSend("/sub/chat/room/" + message.getRoomId(), data);
        } else {
            Room room = roomRepository.findById(message.getRoomId()).get();
            Users user = userRepository.findById(message.getChatUserId()).get();
            ChatAlertDto save = new ChatAlertDto(chatRepository.save(message.saveChat(room)), user);
            Map<String, ChatAlertDto> data = new HashMap<>();
            data.put("data", save);
            messaging.convertAndSend("/sub/chat/room/" + message.getRoomId(), data);
            if (room.getRoomCount() > 0) {
                String userId = room.getRoomUserId1().equals(message.getChatUserId()) ? room.getRoomUserId2() : room.getRoomUserId1();
                if (userId != null) {
                    messaging.convertAndSend("/sub/chat/user/" + userId, data);
                }
            }
        }
    }


    public Map<String, ?> findByUserId(String userId) {
        if (userRepository.findById(userId).isEmpty()) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            return response;
        } else {
            List<ChatResDto> chats = new ArrayList<>();
            for (Room room : roomRepository.findAllByRoomUserId1OrRoomUserId2(userId, userId)) {
                chats.addAll(chatRepository.findAllByRoomId(room).stream().map(ChatResDto::new).collect(Collectors.toList()));
            }
            Map<String, Map> response = new HashMap<>();
            Map<String, List> allChats = new HashMap<>();
            allChats.put("allChats", chats);
            response.put("result", allChats);
            return response;
        }
    }
}