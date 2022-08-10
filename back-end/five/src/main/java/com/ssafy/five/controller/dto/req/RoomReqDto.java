package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Room;
import lombok.Getter;

@Getter
public class RoomReqDto {

    public Room updateCount(Room room, int count) {
        return Room.builder()
                .roomId(room.getRoomId())
                .roomUserId1(room.getRoomUserId1())
                .roomUserId2(room.getRoomUserId2())
                .roomCount(room.getRoomCount() + count)
                .build();
    }

    public Room userDelete(Room room, String user1, String user2) {
        return Room.builder()
                .roomId(room.getRoomId())
                .roomUserId1(user1)
                .roomUserId2(user2)
                .roomCount(room.getRoomCount())
                .build();
    }
}
