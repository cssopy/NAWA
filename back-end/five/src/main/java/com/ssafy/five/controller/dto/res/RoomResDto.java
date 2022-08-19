package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

@Getter
public class RoomResDto {

    private Long roomId;
    private String roomUserId = null;
    private String roomNickName = null;
    private ProfileImg profileImg = null;

    public RoomResDto(Room room, Users user) {
        this.roomId = room.getRoomId();
        if (user != null) {
            this.roomUserId = user.getUserId();
            this.roomNickName = user.getNickname();
            this.profileImg = user.getProfileImg();
        }
    }
}
