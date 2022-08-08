package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Chat;

import java.util.Date;

public class ChatResDto {

    private Long chatId;
    private Long roomId;
    private String chatContent;
    private Date chatDate;
    private String userName;
    private int isRead;

    public ChatResDto(Chat chat) {
        this.chatId = chat.getChatId();
        this.roomId = chat.getRoomId().getRoomId();
        this.chatContent = chat.getChatContent();
        this.chatDate = chat.getChatDate();
        this.userName = chat.getUserId().getNickname();
        this.isRead = chat.getIsRead();
    }

}
