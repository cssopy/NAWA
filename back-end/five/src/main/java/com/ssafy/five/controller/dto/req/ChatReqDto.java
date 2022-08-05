package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Chat;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class ChatReqDto {

    private Long roomId;
    private String userId;
    private String chatContent;

    public Chat saveChat(Room room, Users user) {
        return Chat.builder()
                .roomId(room)
                .userId(user)
                .chatContent(this.chatContent)
                .chatDate(new Date())
                .isRead(0)
                .build();
    }
}
