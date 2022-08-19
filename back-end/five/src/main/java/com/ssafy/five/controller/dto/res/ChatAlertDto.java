package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Chat;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class ChatAlertDto {


    private Long roomId;
    private Long chatId;
    private String chatUserId;
    private String chatContent;
    private Date chatDate;
    private int isRead;

    private String chatNickName;
    private ProfileImg profileImg;

    public ChatAlertDto(Chat chat, Users user) {
        this.roomId = chat.getRoomId().getRoomId();
        this.chatId = chat.getChatId();
        this.chatUserId = chat.getChatUserId();
        this.chatContent = chat.getChatContent();
        this.chatDate = chat.getChatDate();
        this.isRead = chat.getIsRead();
        this.chatNickName = user.getNickname();
        this.profileImg = user.getProfileImg();
    }
}
