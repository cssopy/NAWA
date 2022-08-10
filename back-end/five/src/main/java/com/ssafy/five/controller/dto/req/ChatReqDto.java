package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Chat;
import com.ssafy.five.domain.entity.Room;
import lombok.Getter;

import java.util.Date;

@Getter
public class ChatReqDto {

    private Long roomId;

    private String userId;
    private String chatContent;

    public Chat saveChat(Room room) {

        return Chat.builder()
                .roomId(room)
                .chatUserId(this.userId)
                .chatContent(this.chatContent)
                .chatDate(new Date())
                .isRead(room.getRoomCount())
                .build();
    }
}
