package com.ssafy.five.controller.dto.res;


import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

@Getter
public class MateResDto {

    private Long mateId;
    private String userid;
    private String nickname;
    private ProfileImg profileImg;

    public MateResDto(Long mateId, Users user) {
        this.mateId = mateId;
        this.userid = user.getUserId();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }
}
