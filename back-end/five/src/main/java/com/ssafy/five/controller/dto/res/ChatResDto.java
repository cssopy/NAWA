package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Chat;
import lombok.Getter;

import java.util.Date;

@Getter
public class ChatResDto {

    private Long roomId;
    private Long chatId;
    private String chatUserId;
    private String chatContent;
    private Date chatDate;
    private int isRead;

    public ChatResDto(Chat chat) {
        this.roomId = chat.getRoomId().getRoomId();
        this.chatId = chat.getChatId();
        this.chatUserId = chat.getChatUserId();
        this.chatContent = chat.getChatContent();
        this.chatDate = chat.getChatDate();
        this.isRead = chat.getIsRead();
    }

}
