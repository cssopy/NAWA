package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Room;

public class RoomResDto {

    private Long roomId;
    private String roomUserNickName1;
    private String roomUserNickName2;

    public RoomResDto(Room room) {
        this.roomId = room.getRoomId();
        this.roomUserNickName1 = room.getRoomUserId1().getNickname();
        this.roomUserNickName2 = room.getRoomUserId2().getNickname();
    }
}
