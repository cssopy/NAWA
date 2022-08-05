package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Room;

public class RoomResDto {

    private Long roomId;
    private String roomUserId1;
    private String roomUserId2;

    public RoomResDto(Room room) {
        this.roomId = room.getRoomId();
        this.roomUserId1 = room.getRoomUserId1().getUserId();
        this.roomUserId2 = room.getRoomUserId2().getUserId();
    }
}
